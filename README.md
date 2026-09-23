# MultiWorkWala Pvt. Ltd.

Separate frontend and backend applications for the NGO website.

## Structure

```text
frontend/   React + Vite + TypeScript website
backend/    Django + Django REST Framework API and Admin
```

## Run locally

Terminal 1:

```powershell
cd backend
python manage.py migrate
python manage.py runserver 127.0.0.1:8000
```

Terminal 2:

```powershell
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

Backend API: `http://localhost:8000/api/v1/`

Admin: `http://localhost:8000/admin/`

See [frontend/README.md](frontend/README.md) and [backend/README.md](backend/README.md) for details.
