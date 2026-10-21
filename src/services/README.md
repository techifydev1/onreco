# services/

Backend integration layer: API clients and request plumbing that talk to the
Spring backend. Keep transport concerns (base URL, headers, token handling,
error mapping) here; keep UI concerns out.
