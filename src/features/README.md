# features/

Domain-oriented code, grouped by business capability (e.g. `auth`, `wallet`,
`report`, `sync`). Each feature owns its own UI, hooks, API calls, and types so
a change stays local.

Suggested shape per feature:

```
features/<domain>/
  components/   # UI specific to this feature
  hooks/        # feature hooks (client state, queries)
  api/          # calls to the backend for this domain
  types.ts      # feature types
  index.ts      # public surface
```

Rules:
- Import across features only through a feature's `index.ts`.
- Shared, domain-agnostic primitives belong in `components/ui` instead.
