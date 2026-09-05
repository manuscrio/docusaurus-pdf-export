---
sidebar_position: 2
title: HTTP API
---

# HTTP API

All endpoints are under `/v1`. Responses are JSON. When `auth.mode` is `token`, every request needs
an `Authorization: Bearer <token>` header.

## Post readings

```http
POST /v1/readings
Content-Type: application/json
```

```json
{
  "asset": "a41f",
  "at": "2026-09-05T09:14:22Z",
  "position": { "lat": 52.3676, "lon": 4.9041 },
  "status": { "speed_kn": 11.4, "heading": 208 }
}
```

A batch is an array of the same object. The whole batch is rejected if any member is invalid, and
the response names the index that failed.

| Status | Meaning |
| --- | --- |
| `202` | Accepted and queued. |
| `400` | A reading was malformed; nothing was stored. |
| `413` | Body exceeded `ingest.http.max_body`. |
| `429` | Ingest is backed up; retry with backoff. |

## Read a track

```http
GET /v1/assets/{asset}/track?since=2h&format=geojson
```

```json
{
  "asset": "a41f",
  "from": "2026-09-05T07:14:22Z",
  "to": "2026-09-05T09:14:22Z",
  "readings": 118,
  "resolution": "raw"
}
```

`resolution` is `raw` when the range falls inside the retention window and `rollup` when it does
not. A range spanning the boundary returns both, and the field reads `mixed`.

## List assets

```http
GET /v1/assets?seen_since=24h
```

Returns assets with at least one reading in the range, most recently seen first. Paginated with
`?cursor=` — the response carries `next_cursor` until the last page, where it is absent.

## Health

```http
GET /v1/health
```

Returns `200` with `{"status":"ok"}` when the store is writable and ingest is keeping up, and `503`
otherwise. Suitable as a readiness probe.
