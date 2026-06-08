# PLAN.md

Implementation plan for the Foodier full-stack healthy lifestyle and food recommendation application.

## Goal

Build a full-stack application with:

- A frontend app for users to manage health goals, ingredients, recipes, meal plans, progress, and reminders.
- A Go microservices backend with independently deployable services.
- Local development through Docker Compose.
- Clear API contracts between frontend, Kong API gateway, and services.

## Phase 1: Foundation

Set up the repository and development baseline.

- Create root folders: `frontend/`, `services/`, `shared/`, `docs/`, `deployments/`, and `scripts/`.
- Choose frontend stack, defaulting to React + TypeScript + Vite.
- Choose backend HTTP framework, defaulting to Go standard `net/http` plus a router such as Gin.
- Create a base Docker Compose file for PostgreSQL, Redis, RabbitMQ, Kong API gateway, and services.
- Define shared environment variable conventions.
- Add root documentation for local setup.
- Add lint, format, and test commands for frontend and backend.

Deliverables:

- Empty but structured full-stack repo.
- Local infrastructure booting with Docker Compose.
- First health check endpoint from one Go service.

## Phase 2: Architecture And Contracts

Define service boundaries and API contracts before building feature depth.

- Create architecture documentation in `docs/architecture.md`.
- Define API gateway routing in `api-gateway/` or `deployments/`.
- Create OpenAPI specs for core user-facing APIs.
- Decide authentication model: JWT, opaque sessions, or external provider.
- Define event names and message payloads for async workflows.
- Decide database-per-service strategy for local development.

Services to define:

- `auth`: account registration, login, sessions, identity.
- `profile`: health assessment, BMI, TDEE, macro recommendations.
- `ingredient`: image upload, ingredient recognition jobs, manual ingredient parsing.
- `recipe`: recipe and nutrition data, recommendation logic.
- `meal-plan`: daily and weekly meal plans.
- `progress`: measurements, BMI history, trend summaries.
- `notification`: reminder preferences and scheduling.

Deliverables:

- Service map.
- Initial OpenAPI files.
- Event contract documentation.
- Gateway route table.

## Phase 3: Auth And User Profile

Build the first complete vertical slice.

Backend:

- Scaffold `services/auth`.
- Scaffold `services/profile`.
- Implement user registration and login.
- Implement authenticated `GET /profile/me`.
- Implement health assessment save/update.
- Calculate BMI.
- Calculate estimated TDEE.
- Calculate daily protein, carbohydrate, and fat targets.

Frontend:

- Create app shell and routing.
- Build sign up and sign in pages.
- Build health assessment form.
- Build dashboard summary with BMI, calorie target, and macro targets.

Deliverables:

- User can create an account, sign in, complete assessment, and see personalized targets.
- Backend tests for BMI, TDEE, macro calculation, auth handlers, and profile handlers.

## Phase 4: Recipe Recommendations

Build ingredient input and recipe recommendation workflows.

Backend:

- Scaffold `services/ingredient`.
- Scaffold `services/recipe`.
- Support manual ingredient entry.
- Support image upload metadata and recognition job creation.
- Integrate image recognition provider behind an interface.
- Implement recipe recommendation based on ingredients, health goal, calorie target, and dietary restrictions.
- Store recommendation history.

Frontend:

- Build ingredient entry page.
- Build image upload flow with preview and upload progress.
- Build recommended recipe results.
- Show calories, nutrition, ingredients, and cooking steps.
- Add save recipe action.

Deliverables:

- User can enter ingredients and receive healthy recipe recommendations.
- Image recognition can be mocked locally and swapped for a real provider later.

## Phase 5: Meal Planning

Build personalized daily and weekly meal planning.

Backend:

- Scaffold `services/meal-plan`.
- Generate daily meal plans based on goal, meals per day, preferences, restrictions, and macro targets.
- Generate weekly meal plans.
- Allow editing meals in a plan.
- Allow saving, replacing, and deleting plans.
- Emit `MealPlanGenerated` events.

Frontend:

- Build meal plan setup flow.
- Build daily and weekly calendar views.
- Build meal replacement and edit interactions.
- Show plan totals against calorie and macro targets.

Deliverables:

- User can generate, edit, and save a meal plan.
- Meal plan view clearly shows nutrition balance.

## Phase 6: Progress Tracking

Build measurement logging and progress visualization.

Backend:

- Scaffold `services/progress`.
- Record weight, height, and optional body measurements.
- Calculate BMI snapshots.
- Return trend summaries for dashboard charts.
- Detect whether the user is progressing toward their goal.
- Emit `ProgressMeasurementRecorded` events.

Frontend:

- Build measurement entry form.
- Build BMI and weight trend charts.
- Build progress summary cards.
- Show suggested adjustment prompts when progress is off target.

Deliverables:

- User can record progress and view trends over time.
- Dashboard reflects latest progress data.

## Phase 7: Notifications

Build smart reminders and preferences.

Backend:

- Scaffold `services/notification`.
- Store reminder preferences for water, meals, exercise, and health updates.
- Schedule reminders using a worker or queue.
- Track notification delivery logs.
- Support email or push notification providers behind interfaces.

Frontend:

- Build notification preferences page.
- Add toggles for reminder types.
- Add frequency and time controls.
- Show upcoming reminders.

Deliverables:

- User can configure reminders.
- Backend can schedule reminder jobs and record delivery attempts.

## Phase 8: AI And Personalization

Improve recommendation quality.

- Add provider interfaces for AI recipe generation and ingredient recognition.
- Add prompt and response validation.
- Add fallback recommendations when AI providers fail.
- Add nutrition guardrails for calorie and macro targets.
- Add personalization based on saved recipes, progress, and dietary restrictions.
- Cache repeated recommendation inputs.

Deliverables:

- AI features are isolated behind replaceable interfaces.
- Recommendation results are validated before reaching users.

## Phase 9: Observability And Reliability

Prepare the system for debugging and growth.

- Add structured logging to all services.
- Add request IDs through gateway and services.
- Add metrics endpoints.
- Add readiness and liveness checks.
- Add centralized error response format.
- Add retry and timeout policies for external calls.
- Add dead-letter handling for async jobs.

Deliverables:

- Services are observable in local development.
- Failed async workflows are inspectable and recoverable.

## Phase 10: Production Readiness

Prepare deployment artifacts and harden the system.

- Add production Dockerfiles for frontend and services.
- Add CI for format, lint, tests, and builds.
- Add database migration workflow.
- Add seed data for recipes and nutrition facts.
- Add backup and restore documentation.
- Add deployment manifests for the chosen hosting target.
- Add security review checklist.

Deliverables:

- CI validates every pull request.
- App can be deployed from documented commands.

## Suggested MVP Scope

Build these first:

- Frontend app shell.
- Auth service.
- Profile service.
- Health assessment.
- BMI, TDEE, and macro calculations.
- Manual ingredient entry.
- Basic recipe recommendations.
- Simple meal plan generation.
- Progress measurement logging.

Defer these until after MVP:

- Real image recognition provider.
- Push notifications.
- Advanced AI personalization.
- Weekly meal plan optimization.
- Social sharing.
- Wearable device integrations.

## Initial Milestones

1. Scaffold repo, frontend, first Go service, and Docker Compose.
2. Implement auth and profile vertical slice.
3. Implement health dashboard.
4. Implement manual ingredient recipe recommendations.
5. Implement basic meal planning.
6. Implement progress tracking.
7. Add notification preferences and scheduler.
8. Harden APIs, tests, observability, and deployment.

## Quality Bar

- Every service has a README, health endpoint, tests, and local run command.
- Every user-facing API has an OpenAPI contract.
- Frontend API types match backend contracts.
- Sensitive health data is not logged.
- Services do not share databases directly.
- Business calculations have unit tests.
- Local development can start with one documented Docker Compose command.

