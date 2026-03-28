#!/usr/bin/env bash
cd "$(dirname "$0")" || exit 1

bun run build
PORT=6200 bun start
