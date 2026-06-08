# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project

Foodier is a full-stack Healthy Lifestyle & Food Recommendation App. The backend should be built as Go microservices, and the repository should also contain the frontend application.

The app helps users:

- Complete personal health assessments.
- Get healthy food and recipe recommendations from ingredients or images.
- Generate and manage personalized meal plans.
- Track weight, BMI, and health progress.
- Receive smart habit notifications.

## Repository Layout

Use this root structure unless there is a strong reason to change it:

```text
.
+-- frontend/                 # Web or mobile frontend application
+-- services/                 # Independent Go microservices
|   +-- auth/                 # Authentication and user identity
|   +-- profile/              # Health profile, BMI, TDEE, macro targets
|   +-- ingredient/           # Ingredient input and image recognition orchestration
|   +-- recipe/               # Recipe search, nutrition, and recommendations
|   +-- meal-plan/            # Daily and weekly meal plan generation
|   +-- progress/             # Measurements, BMI history, trends
|   +-- notification/         # Reminders and notification preferences
+-- api-gateway/              # Kong, Nginx, or Go gateway configuration
+-- shared/                   # Shared contracts, OpenAPI specs, protobufs, docs
+-- deployments/              # Docker, compose, Kubernetes, and infra files
+-- scripts/                  # Developer automation
+-- docs/                     # Architecture and product documentation
+-- PROJECT_IDEA.md
+-- PLAN.md
+-- AGENTS.md
```

Each Go service should be independently buildable and testable. Prefer one `go.mod` per service under `services/<name>`.

## Backend Conventions

Build backend services in Go using a clear layered structure:

```text
services/<service>/
+-- go.mod
+-- internal/
|   +-- cmd/                  # main package and startup wiring
|   +-- config/               # env and config loading
|   +-- handler/              # HTTP/gRPC handlers
|   +-- service/              # business logic
|   +-- repository/           # database access
|   +-- dto/                  # request/response payloads
|   +-- domain/               # domain models and rules
+-- migrations/               # database migrations when needed
+-- README.md
```

Use idiomatic Go:

- Keep packages small and named by responsibility.
- Pass `context.Context` through request, service, repository, and external client calls.
- Return structured errors from service layers and map them to transport responses at the handler boundary.
- Keep generated code out of hand-written business logic.
- Run `gofmt` on all changed Go files.
- Add focused tests for business logic and handlers.

Recommended backend stack:

- Go 1.22+.
- HTTP APIs first, with gRPC optional for internal service calls.
- PostgreSQL for persistent data.
- Redis for caching, sessions, rate limits, and short-lived jobs.
- RabbitMQ for async events such as notifications, image processing, and meal-plan generation.
- Docker Compose for local development.

## Frontend Conventions

Place frontend code under `frontend/`. Default framework is a React + TypeScript app using Vite.

Frontend should provide actual app workflows, not a marketing landing page:

- Health assessment form.
- Dashboard with current goals, calorie target, macros, and progress summary.
- Ingredient image upload and manual ingredient entry.
- Recipe recommendation results.
- Meal plan calendar/editor.
- Progress charts.
- Notification settings.

Keep frontend code organized by feature:

```text
frontend/src/
+-- app/
+-- components/
+-- features/
+-- lib/
+-- routes/
+-- styles/
```

Use API clients generated from OpenAPI specs when possible. Keep request and response types aligned with backend contracts.

## API And Contracts

Document public service APIs in `shared/openapi/` or `docs/api/`.

Prefer stable, explicit REST paths:

- `POST /auth/register`
- `POST /auth/login`
- `GET /profile/me`
- `PUT /profile/me/health-assessment`
- `POST /ingredients/recognize`
- `POST /recipes/recommend`
- `POST /meal-plans`
- `GET /meal-plans/current`
- `POST /progress/measurements`
- `GET /progress/summary`
- `GET /notifications/preferences`
- `PUT /notifications/preferences`

Version APIs when contracts become externally consumed:

```text
/api/v1/...
```

## Data Ownership

Each service owns its data. Do not let services directly read each other's databases.

Suggested ownership:

- `auth`: users, credentials, sessions, OAuth identities.
- `profile`: health profile, goals, macro targets, dietary restrictions.
- `ingredient`: uploaded image metadata, recognition jobs, detected ingredients.
- `recipe`: recipes, nutrition facts, recommendation results.
- `meal-plan`: meal plans, meals, plan edits, saved plans.
- `progress`: body measurements, BMI snapshots, trend aggregates.
- `notification`: reminder preferences, scheduled reminders, delivery logs.

Use events for cross-service updates where practical, for example:

- `UserCreated`
- `HealthProfileUpdated`
- `IngredientsRecognized`
- `MealPlanGenerated`
- `ProgressMeasurementRecorded`
- `NotificationScheduled`

## Security And Privacy

Health and nutrition data is sensitive. Treat it accordingly:

- Do not log passwords, tokens, uploaded images, or health measurements.
- Hash passwords with a modern password hashing algorithm if credentials are managed locally.
- Use JWT or opaque sessions consistently across services.
- Validate all request payloads.
- Apply file size and content type limits to image uploads.
- Store secrets in environment variables for local development and secret managers for deployed environments.
- Keep authentication and authorization checks close to service boundaries.

## Development Commands

Expected commands once the repository is scaffolded:

```powershell
docker compose up --build
docker compose down
cd services/profile; go test ./...
cd services/profile; go run ./internal/cmd
cd frontend; npm install
cd frontend; npm run dev
cd frontend; npm test
```

If a command fails because dependencies are not installed, inspect the local setup before changing project files.

## Editing Rules

- Read relevant files before editing.
- Keep changes scoped to the requested task.
- Do not rewrite unrelated files.
- Do not remove user changes unless explicitly asked.
- Prefer existing patterns over new abstractions.
- Add tests when changing behavior.
- Update documentation when changing architecture, APIs, commands, ports, or service boundaries.
- After editing, show what changed, why need to changed, does the changes approved by test.
