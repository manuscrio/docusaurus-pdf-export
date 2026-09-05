---
sidebar_position: 2
title: Deployment
---

# Deployment

Orbit is a single process with a directory on disk. There is no clustering, no leader election and
no external database.

## Sizing

Storage is the constraint that matters. A reading is about 90 bytes on disk.

| Fleet | Readings/day | 30-day store |
| --- | --- | --- |
| 50 assets, 1/min | 72,000 | ~190 MB |
| 500 assets, 1/min | 720,000 | ~1.9 GB |
| 5,000 assets, 4/min | 28,800,000 | ~78 GB |

CPU matters only during rollup. One core is enough below a million readings a day.

## A systemd unit

```ini
[Unit]
Description=Orbit
After=network-online.target

[Service]
ExecStart=/usr/local/bin/orbit serve
Restart=on-failure
User=orbit
StateDirectory=orbit
Environment=ORBIT_STORE_PATH=/var/lib/orbit

[Install]
WantedBy=multi-user.target
```

## Upgrading

1. Stop the service.
2. Replace the binary.
3. Run `orbit doctor`.
4. Start the service.

The store format is forward compatible within a major version, so step three should be quiet. When
it is not, `doctor` names the file it could not read and Orbit refuses to start rather than
migrating something it does not understand.

:::warning

Do not run two Orbit processes against one store directory. The store takes an exclusive lock, and
the second process exits — but a stale lock left by a killed process needs
`orbit store unlock` before the service will start.

:::

## Backups

Stop the process, copy `store.path`, start it again. There is no online backup command, and copying
the directory of a running Orbit produces a file that `doctor` will reject.
