# MultiWorkWala NGO API

Django REST Framework backend for the existing React/Vite frontend.

## Local setup

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python manage.py migrate
python manage.py seed_demo
python manage.py createsuperuser
python manage.py runserver
```

The default development database is SQLite when `DATABASE_URL` is not set. Configure PostgreSQL in `.env` for real environments.

## Endpoints

Public content is under `/api/v1/`: `programs`, `projects`, `news`, `events`, `impact`, `gallery`, `team`, `partners`, `testimonials`, `focus-areas`, `organization`, `reports`, `faq`, and `settings`.

Public submissions accept `POST` at `volunteers`, `donations`, `contact`, and `newsletter`. Listing, updating, and deleting submissions require an authenticated Django staff user.

JWT endpoints:

- `POST /api/v1/auth/token/`
- `POST /api/v1/auth/token/refresh/`

Admin: `/admin/`

## Frontend

Set `VITE_API_URL=http://localhost:8000/api/v1` in `frontend/.env.local`, then run `npm run dev` from `frontend`.

Run both servers during local development:

```powershell
# Terminal 1
cd backend
python manage.py runserver 127.0.0.1:8000

# Terminal 2
cd frontend
npm install
npm run dev
```

## Content safety

The seed command creates only structural focus areas and an unverified organization profile. It does not invent partners, people, donations, impact figures or achievements. Staff must publish verified content from Django Admin.
