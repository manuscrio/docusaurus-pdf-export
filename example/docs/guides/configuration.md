---
sidebar_position: 1
title: Configuration
---

# Configuration

Orbit reads one file. Everything below has a default, so the shortest valid configuration is an
empty file.

## The file

```yaml
# orbit.yaml
listen: 0.0.0.0:8080

store:
  path: /var/lib/orbit
  retention: 30d
  rollup: 1h

ingest:
  mqtt:
    enabled: true
    topic: orbit/+/readings
  http:
    enabled: true
    max_body: 1MiB

auth:
  mode: token
  tokens_file: /etc/orbit/tokens
```

## Options

| Key | Default | Meaning |
| --- | --- | --- |
| `listen` | `127.0.0.1:8080` | Address the API binds to. |
| `store.path` | `./orbit-data` | Directory holding the store. Must be writable. |
| `store.retention` | `7d` | How long raw readings are kept. |
| `store.rollup` | `1h` | Bucket size for the permanent summary. |
| `ingest.mqtt.enabled` | `false` | Accept readings from an MQTT broker. |
| `ingest.http.enabled` | `true` | Accept readings over `POST /v1/readings`. |
| `auth.mode` | `none` | One of `none`, `token`, `mtls`. |

## Retention and rollup interact

Retention decides how long a raw reading survives. Rollup decides the resolution of what remains
afterwards. A rollup interval larger than the retention window is accepted but pointless — readings
are summarised into buckets that no query can subdivide.

`orbit doctor` warns when `rollup` is more than a tenth of `retention`, which is usually a mistake.

## Environment overrides

Any key can be overridden by an environment variable, uppercased with `ORBIT_` prefixed and dots
replaced by underscores:

```bash
ORBIT_STORE_RETENTION=90d orbit serve
```

:::tip

Overrides are the intended way to differ between environments. Keep one `orbit.yaml` in version
control and let the environment supply what changes.

:::
