---
sidebar_position: 1
title: Command line
---

# Command line

Every command reads the same configuration file and accepts `--config <path>` to point elsewhere.

## `orbit serve`

Starts the API and any enabled ingest listeners. Runs until interrupted.

```bash
orbit serve --config /etc/orbit/orbit.yaml
```

| Option | Default | Meaning |
| --- | --- | --- |
| `--config` | `./orbit.yaml` | Configuration file. |
| `--listen` | from config | Overrides `listen`. |
| `--log-format` | `text` | `text` or `json`. |

## `orbit doctor`

Checks configuration, store and permissions. Exits non-zero on the first problem.

```bash
orbit doctor --config /etc/orbit/orbit.yaml
```

## `orbit track`

Prints a track for one asset over a time range.

```bash
orbit track --asset a41f --since 2h --format geojson
```

| Option | Default | Meaning |
| --- | --- | --- |
| `--asset` | required | Asset identifier. |
| `--since` | `1h` | Relative start of the range. |
| `--until` | now | Relative or absolute end. |
| `--format` | `table` | `table`, `json` or `geojson`. |

## `orbit store`

Maintenance subcommands. These touch the store directly and require the service to be stopped.

```bash
orbit store unlock      # clear a stale lock left by a killed process
orbit store compact     # reclaim space after a retention change
orbit store verify      # check every segment against its checksum
```

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Success. |
| `1` | Usage error — an unknown flag or a missing required option. |
| `2` | Configuration is invalid. |
| `3` | The store could not be opened. |
| `4` | The API was reachable but returned an error. |
