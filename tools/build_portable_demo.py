from __future__ import annotations

import base64
import io
import re
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "潮痕航路-Demo.html"


def image_data_uri(relative_path: str) -> str:
    source = ROOT / relative_path
    image = Image.open(source)
    has_alpha = "A" in image.getbands()

    max_width = 1600 if "-bg-" in source.name or "map-chart" in source.name else 1100
    if image.width > max_width:
        height = round(image.height * max_width / image.width)
        image = image.resize((max_width, height), Image.Resampling.LANCZOS)

    image = image.convert("RGBA" if has_alpha else "RGB")
    encoded = io.BytesIO()
    image.save(encoded, "WEBP", quality=82, method=6)
    payload = base64.b64encode(encoded.getvalue()).decode("ascii")
    return f"data:image/webp;base64,{payload}"


def build() -> None:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    css = (ROOT / "styles.css").read_text(encoding="utf-8")
    javascript = (ROOT / "game.js").read_text(encoding="utf-8")

    html = html.replace('<link rel="stylesheet" href="styles.css">', f"<style>{css}</style>")
    html = html.replace('<script src="game.js"></script>', f"<script>{javascript}</script>")

    asset_paths = sorted(set(re.findall(r"assets/[A-Za-z0-9_./-]+\.(?:png|webp|jpg|jpeg)", html)))
    for relative_path in asset_paths:
        html = html.replace(relative_path, image_data_uri(relative_path))

    if "assets/" in html:
        raise RuntimeError("Unresolved project asset path remains in portable HTML")
    if re.search(r"<script[^>]+src=|<link[^>]+href=", html, re.IGNORECASE):
        raise RuntimeError("External script or stylesheet remains in portable HTML")

    OUTPUT.write_text(html, encoding="utf-8", newline="\n")
    print(f"Wrote {OUTPUT}")
    print(f"Embedded assets: {len(asset_paths)}")
    print(f"Bytes: {OUTPUT.stat().st_size}")


if __name__ == "__main__":
    build()
