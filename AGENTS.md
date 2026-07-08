# Privilege Frontend Agent Guide

## Scope

This guide applies to the NexaCore privilege-management Angular application under `privilege-frontend/`.

## Project Shape

- Angular 19 standalone application
- TypeScript 5.7 with strict compiler and template checks
- Angular Material, Bootstrap 5, Font Awesome, RxJS, and Karma/Jasmine
- Application package: `nexacore-privilege-frontend`
- Development server port: `4300`
- Main app routes live in `src/app/app.routes.ts`
- Privilege API service lives in `src/app/core/services/privilege.service.ts`
- Shared libraries are imported from `../frontend-libs` through `@nexacore/*` path aliases

Useful commands:

```bash
npm run build
npm test
npm start
```

## Ownership Rules

- Keep privilege and authorization-management workflows in this application.
- Put reusable behavior used by both frontend apps in `../frontend-libs`, not duplicated app code.
- Prefer app-specific API endpoint definitions in `src/app/core/api/api-endpoints.ts`.
- Keep privilege-specific services under `src/app/core/services`.
- Do not move KYC/person/profile business flows from `frontend/` into this app unless the product boundary changes explicitly.
- Do not modify `../v3` snapshots unless the task explicitly targets `v3`.

## Shared Library Usage

- Use `@nexacore/auth` for login, token handling, route guards, and SSO callback behavior.
- Use `@nexacore/layout` for the authenticated shell, sidebar, topbar, layout state, and menu context.
- Use `@nexacore/api-common` for common API response handling, JWT and language interceptors, and shared response models.
- Use `@nexacore/shared` for common UI services, i18n helpers, validation messages, and reusable components.
- Update `../frontend-libs/*/src/public-api.ts` when adding shared exports consumed by this app.

## Routing And Auth

- Keep authenticated routes under the `LayoutComponent` route protected by `authGuard`.
- Keep public authentication routes sourced from `AUTH_ROUTES`.
- Preserve the default redirect to `privileges` unless changing the privilege-management entry point intentionally.
- Do not rely on frontend route guards alone for authorization; backend APIs must enforce privilege checks.
- Hide unavailable actions in the UI only as a usability layer over backend authorization.

## API And Configuration

- Keep backend URLs, endpoint paths, and auth settings centralized in existing core config/API files.
- Do not hard-code credentials, access tokens, authorization headers, or environment-specific secrets.
- Keep proxy changes in `proxy.conf.json` aligned with backend routes and Docker Compose ports.
- Send `Accept-Language` through the shared language interceptor rather than per-call duplication.

## UI And Styling

- Use standalone Angular components and SCSS, matching the existing component layout.
- Keep privilege-management screens dense, scannable, and explicit about selected roles, privileges, and save state.
- Keep Angular Material, Bootstrap, and Font Awesome usage consistent with existing screens.
- Avoid broad global style changes in `src/styles.scss` unless the change is intentionally app-wide.
- Prefer shared components or services when the same UI behavior is needed in `frontend`.
- Do not commit generated output such as `dist/`, `.angular/`, coverage, or local `node_modules`.

## Internationalization

- Avoid hard-coded user-facing text in new UI, validation, notification, and API error handling.
- Use stable translation keys and existing i18n services/pipes from `@nexacore/shared`.
- Keep app-specific translations under `src/assets/i18n`.
- Keep shared translations in `../frontend-libs/shared/src/lib/i18n/translations` when both apps use the text.

## Testing And Verification

- Add or update focused unit tests for new services, guards, pipes, and non-trivial component behavior.
- Mock backend APIs, auth state, and browser storage in unit tests.
- Run the narrowest meaningful check before completing work:

```bash
npm run build
```

- Run `npm test` when changing services, guards, shared behavior, or component logic with meaningful branches.
- If local browser, dependency, or environment issues prevent a check, report the command and failure clearly.
