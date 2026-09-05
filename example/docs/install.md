---
sidebar_position: 2
title: Installation
---

# Installation

Orbit ships as a single static binary and as a container image. Both carry the same version number
and the same defaults.

## Supported platforms

| Platform | Architecture | Notes |
| --- | --- | --- |
| Linux | `x86_64`, `aarch64` | glibc 2.31 or newer |
| macOS | `aarch64` | 13 Ventura or newer |
| Windows | `x86_64` | Server 2019 or newer |
| Container | `linux/amd64`, `linux/arm64` | the same binary, in a distroless base |

## Install the binary

```bash
curl -fsSL https://example.com/orbit/install.sh | sh
orbit version
```

The script writes to `/usr/local/bin` and needs no configuration. To choose the location yourself:

```bash
curl -fsSLo orbit https://example.com/orbit/latest/linux-amd64/orbit
chmod +x orbit
./orbit version
```

## Run the container

```bash
docker run --rm -p 8080:8080 \
  -v "$PWD/orbit.yaml:/etc/orbit/orbit.yaml:ro" \
  example.com/orbit:1.4.0 serve
```

The image reads the same `orbit.yaml` the binary does, from `/etc/orbit/orbit.yaml`.

:::warning

The container runs as an unprivileged user. If you mount a data directory, make sure it is writable
by UID 65532, or Orbit will start and then fail on its first write.

:::

## Verify the installation

```bash
orbit doctor
```

`doctor` checks that the configuration parses, the store is reachable and writable, and the
retention window is consistent with the rollup interval. It exits non-zero on the first problem it
finds, so it is safe to put in a deployment pipeline.
