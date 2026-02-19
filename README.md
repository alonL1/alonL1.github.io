# alonL1.github.io
My Personal Portfolio Website

## Local Preview (Docker, No Local Ruby)

Use Docker Desktop to preview locally without installing Ruby/Jekyll on Windows.

1. Start Docker Desktop.
2. From this repo folder run:

```bash
docker compose down -v
docker compose up --build
```

3. Open `http://127.0.0.1:4000`.

Notes:
- `bundle install` runs inside the container automatically.
- The image includes native build tools for gems that need compilation.
- Live reload is enabled.
- Stop with `Ctrl+C`.
