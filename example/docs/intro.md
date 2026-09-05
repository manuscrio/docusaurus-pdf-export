---
sidebar_position: 1
title: Introduction
slug: /
---

# Introduction

Orbit collects telemetry from vehicles, vessels and aircraft, and answers questions about where
they were and what they were doing. It is an example project: nothing here is a real product, and
the documentation exists so that an export to PDF has something realistic to work with.

## What Orbit does

A fleet emits position and status readings. Orbit ingests them, keeps them for a retention window,
and serves them back over an HTTP API and a command line client.

| Concept | Meaning |
| --- | --- |
| **Asset** | One tracked thing — a vehicle, a vessel, a sensor package. |
| **Reading** | A single timestamped observation from an asset. |
| **Track** | An ordered series of readings for one asset over a time range. |
| **Window** | How long readings are retained before they are rolled up. |

## How the pieces fit

```text
assets → ingest → store → API → clients
                    ↓
                 rollup
```

Ingest accepts readings over MQTT or HTTP. The store keeps raw readings for the retention window
and a rolled-up summary indefinitely. Everything a client sees comes through the API, including the
command line tool.

:::note

Orbit has no interactive dashboard. It is a data service, and the expectation is that you point
something else at the API.

:::

## Where to go next

Install Orbit, then read the configuration guide — almost everything worth changing is in one file.
