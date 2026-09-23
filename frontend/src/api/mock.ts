const DEFAULT_LATENCY_MS = 300;
const latency = Number(import.meta.env.VITE_MOCK_LATENCY_MS ?? DEFAULT_LATENCY_MS);

/**
 * Simulates a network round trip so loading states are exercised.
 * FUTURE: replace calls to this helper with a real HTTP client inside the services.
 */
export function mockRequest<T>(data: T, delayMs: number = latency): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(data)), delayMs);
  });
}
