## Projekt: Enkel blogg (React + Vite)

Det här är frontenden för ett litet blogprojekt byggt med React, TypeScript och Vite. Applikationen visar inlägg på startsidan och har ett administrationsgränssnitt där du kan skapa, redigera och ta bort inlägg. Administrationssidorna kräver inloggning.

  Kort översikt
  - Frontend: React + TypeScript + Vite
  - Global State: enklare Zustand (`useAuth`) för autentisering
  - HTTP: Axios-instans (`src/api/axios.ts`) med `withCredentials: true` (httpCookie från backend)

Viktig funktionalitet
  - Inloggning sker mot `POST /auth/login`. Servern sätter en HttpOnly-cookie JWT.
  - `GET /me` används för att hämta aktuell användare (anropet skickas med cookie). Frontenden kör `fetchMe()` på app-start för att gå tillbaka till sessionen efter refresh.
  - `POST /auth/logout` rensar cookie på servern — frontend anropar denna vid utloggning.
  - Inläggsrutter:
    - `GET /posts` — lista alla inlägg
    - `GET /posts/:id` — hämta ett inlägg
    - `POST /posts` — skapa inlägg (admin)
    - `PUT /posts/:id` — redigera inlägg (admin)
    - `DELETE /posts/:id` — ta bort inlägg (admin)

  Viktiga routes i appen
  - `/` — startsida med lista över inlägg
  - `/posts/:id` — visa enskilt inlägg
  - `/login` — inloggningssida
  - `/admin` — admin-översikt (kräver inloggning)
  - `/admin/create` — skapa nytt inlägg (kräver inloggning)
  - `/admin/posts/:id/edit` — redigera inlägg (kräver inloggning)

  Setup och körning
  1. Installera beroenden:

  ```bash
  npm install
  ```

  1. Sätta upp miljövariabler: skapa en `.env` i projektroten med:

  ```
  VITE_API_URL=http://localhost:3000
  ```

  3. Starta dev-server:

  ```bash
  npm run dev
  ```

  Hur autentisering fungerar (kort)
  - Backend sätter en HttpOnly-cookie vid lyckad inloggning. Eftersom HttpOnly-cookie inte kan läsas från JavaScript, anropar frontend `GET /me` för att få användarens data.
  - Frontenden kallar `fetchMe()` vid app-start (innan routingen renderas) så att användaren förblir inloggad efter uppdatering av sidan.
  - Vid utloggning anropar frontend `POST /auth/logout` och rensar cookien med  `reply.clearCookie('token', ...)`.

  Tips för backend (snabbt)
  - Se till att CORS tillåter `credentials: true` och att `VITE_API_URL` används som `origin` i servers CORS-inställningar.
  - När du clear:ar cookien — använd samma `path`, `sameSite` och `secure` alternativ som när cookien sattes.