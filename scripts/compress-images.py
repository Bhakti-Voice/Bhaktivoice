from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

MAX_WIDTH = {
    "lotus-logo.png": 128,
    "logo.png": 192,
    "jaap-mala-108.png": 480,
    "jaap-mala.png": 900,
    "hanging-mala.png": 900,
    "hanuman-thumb.png": 800,
    "krishna-hero.png": 1600,
    "yatra-map.png": 1400,
    "default.png": 1200,
    "default.jpg": 1200,
}


def max_width_for(path: Path) -> int:
    return MAX_WIDTH.get(path.name, 1200)


def save_webp(image: Image.Image, dest: Path) -> None:
    params = {"quality": 72, "method": 6}
    if image.mode in {"RGBA", "LA"}:
        image.save(dest, "WEBP", **params)
    else:
        image.convert("RGB").save(dest, "WEBP", **params)


def compress(path: Path) -> None:
    with Image.open(path) as original:
        image = original.copy()
    max_w = max_width_for(path)
    if image.width > max_w:
        ratio = max_w / image.width
        image = image.resize((max_w, max(1, int(image.height * ratio))), Image.Resampling.LANCZOS)
    webp_path = path.with_suffix(".webp")
    save_webp(image, webp_path)
    if path.suffix.lower() in {".jpg", ".jpeg"}:
        image.convert("RGB").save(path, "JPEG", quality=78, optimize=True, progressive=True)
    elif image.mode in {"RGBA", "LA"}:
        image.save(path, "PNG", optimize=True)
    else:
        image.convert("RGB").save(path, "PNG", optimize=True)
    print(f"{path.name}: {path.stat().st_size // 1024}KB png/jpg, {webp_path.stat().st_size // 1024}KB webp")


def main() -> None:
    files = list(PUBLIC.rglob("*.png")) + list(PUBLIC.rglob("*.jpg")) + list(PUBLIC.rglob("*.jpeg"))
    for path in sorted(files):
        if path.name.endswith(".webp"):
            continue
        compress(path)


if __name__ == "__main__":
    main()
