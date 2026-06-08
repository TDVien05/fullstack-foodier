# Architecture

Foodier uses a frontend application that talks to backend services through Kong.

```text
Frontend -> Kong -> Go services -> service-owned databases
                         |
                         +-> Redis
                         +-> RabbitMQ
```

## Services

- `auth`: user identity, registration, login, sessions.
- `profile`: health assessment, BMI, TDEE, macro targets.
- `ingredient`: manual ingredients, image upload metadata, recognition jobs.
- `recipe`: recipes, nutrition facts, recommendation results.
- `meal-plan`: generated plans, saved plans, plan edits.
- `progress`: measurements, BMI snapshots, trend summaries.
- `notification`: reminder preferences, scheduled reminders, delivery logs.

Each service owns its own database and exposes HTTP APIs through Kong.

