# Foodier

Foodier is a full-stack Healthy Lifestyle & Food Recommendation App built with a React frontend and Go microservices backend.

## Stack

- Frontend: React, TypeScript, Vite
- Backend: Go, Gin
- Gateway: Kong
- Data: PostgreSQL, Redis
- Messaging: RabbitMQ
- Local orchestration: Docker Compose

## Structure

```text
.
+-- frontend/
+-- services/
|   +-- auth/
|   +-- profile/
|   +-- ingredient/
|   +-- recipe/
|   +-- meal-plan/
|   +-- progress/
|   +-- notification/
+-- api-gateway/
+-- shared/
+-- deployments/
+-- docs/
+-- scripts/
```

## Local Development

Copy the environment template:

```powershell
Copy-Item .env.example .env
```

Start the stack:

```powershell
docker compose up --build
```

Frontend:

```text
http://localhost:5173
```

Kong gateway:

```text
http://localhost:8000
```

Example service health check:

```powershell
Invoke-RestMethod http://localhost:8000/api/v1/auth/healthz
```

## Backend Tests

Run all service tests:

```powershell
.\scripts\test-backend.ps1
```

Or run a single service:

```powershell
cd services/auth
go test ./...
```

## Frontend Commands

```powershell
cd frontend
npm install
npm run dev
npm run build
```

