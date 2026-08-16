"""Render a transparent japamala PNG with exactly 108 beads."""

from __future__ import annotations

import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

OUT = Path(r"C:\Users\jaina\Desktop\bhakti\public\images\jaap-mala-108.png")
W, H = 1100, 1680
CX, CY = 550, 720
RX, RY = 338, 505
BEAD_COUNT = 108
BEAD_R = 11.6
GURU_R = 16.4


def ellipse_point(t: float) -> tuple[float, float]:
    wobble = 1 + 0.018 * math.sin(t * 3) + 0.012 * math.cos(t * 5)
    return CX + RX * wobble * math.cos(t), CY + RY * wobble * math.sin(t)


def stamp_sphere(canvas: np.ndarray, cx: float, cy: float, r: float, color: np.ndarray) -> None:
    pad = 3
    x0 = max(0, int(cx - r - pad))
    y0 = max(0, int(cy - r - pad))
    x1 = min(canvas.shape[1], int(cx + r + pad + 1))
    y1 = min(canvas.shape[0], int(cy + r + pad + 1))
    if x1 <= x0 or y1 <= y0:
        return
    yy, xx = np.mgrid[y0:y1, x0:x1]
    dx = (xx - cx) / r
    dy = (yy - cy) / r
    rr = dx * dx + dy * dy
    nz = np.sqrt(np.clip(1.0 - rr, 0, 1))
    edge = np.clip((1.04 - np.sqrt(np.maximum(rr, 0))) / 0.08, 0, 1)
    ndot = np.clip(-0.38 * dx - 0.52 * dy + 0.78 * nz, 0, 1)
    spec = ndot**18
    shade = 0.32 + 0.68 * ndot
    rgb = color[None, None, :] * shade[..., None]
    rgb = rgb + spec[..., None] * 255.0 * 0.55
    rgb = np.clip(rgb, 0, 255)
    src_a = edge * 255.0
    dst = canvas[y0:y1, x0:x1].astype(np.float32)
    out_a = src_a + dst[:, :, 3] * (1 - src_a / 255.0)
    for c in range(3):
        dst[:, :, c] = (rgb[:, :, c] * src_a + dst[:, :, c] * dst[:, :, 3] * (1 - src_a / 255.0)) / np.maximum(out_a, 1)
    dst[:, :, 3] = out_a
    canvas[y0:y1, x0:x1] = np.clip(dst, 0, 255).astype(np.uint8)


def stamp_line(canvas: np.ndarray, x0: float, y0: float, x1: float, y1: float, r: float, color: np.ndarray) -> None:
    steps = max(2, int(math.hypot(x1 - x0, y1 - y0) / 1.6))
    for i in range(steps + 1):
        t = i / steps
        stamp_sphere(canvas, x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, r, color)


def main() -> None:
    rng = np.random.default_rng(108)
    canvas = np.zeros((H, W, 4), dtype=np.uint8)
    wood = [
        np.array([139, 78, 36], dtype=np.float32),
        np.array([120, 64, 28], dtype=np.float32),
        np.array([158, 92, 44], dtype=np.float32),
        np.array([110, 56, 24], dtype=np.float32),
        np.array([148, 84, 40], dtype=np.float32),
    ]
    saffron = np.array([230, 126, 34], dtype=np.float32)
    gold = np.array([212, 168, 58], dtype=np.float32)
    tassel = np.array([232, 112, 28], dtype=np.float32)

    beads = []
    for i in range(BEAD_COUNT):
        t = -math.pi / 2 + (i / BEAD_COUNT) * math.pi * 2
        x, y = ellipse_point(t)
        guru = i == BEAD_COUNT // 2
        beads.append((x, y, t, guru, i))

    # Thread behind beads
    for i, (x, y, t, guru, idx) in enumerate(beads):
        nx, ny, *_ = beads[(i + 1) % BEAD_COUNT]
        stamp_line(canvas, x, y, nx, ny, 1.35, saffron)

    # Beads back-to-front
    ordered = sorted(beads, key=lambda item: item[1])
    for x, y, t, guru, idx in ordered:
        if guru:
            continue
        color = wood[idx % len(wood)] * (0.92 + 0.16 * float(rng.random()))
        stamp_sphere(canvas, x, y, BEAD_R + float(rng.normal(0, 0.25)), color)

    # Knots peeking between beads
    for i, (x, y, t, guru, idx) in enumerate(beads):
        nx, ny, *_ = beads[(i + 1) % BEAD_COUNT]
        stamp_sphere(canvas, (x + nx) / 2, (y + ny) / 2, 2.35, saffron)

    guru = next(item for item in beads if item[3])
    gx, gy = guru[0], guru[1]
    stamp_sphere(canvas, gx, gy, GURU_R, np.array([92, 46, 18], dtype=np.float32))
    stamp_sphere(canvas, gx, gy - 1.2, 6.8, gold)

    im = Image.fromarray(canvas, "RGBA")
    draw = ImageDraw.Draw(im)
    # Silk tassel
    ty = gy + GURU_R + 8
    for i in range(26):
        t = i / 25
        x0 = gx + (t - 0.5) * 6
        x1 = gx + (t - 0.5) * 46
        y1 = ty + 155 + abs(t - 0.5) * 18
        color = (int(226 - 20 * abs(t - 0.5)), int(108 + 18 * t), 28, 230)
        draw.line([(x0, ty), (x1, y1)], fill=color, width=2)
    draw.rounded_rectangle((gx - 9, ty - 6, gx + 9, ty + 10), radius=4, fill=(212, 168, 58, 255))
    draw.ellipse((gx - 6, ty - 8, gx + 6, ty + 2), fill=(232, 196, 86, 255))
    try:
        font = ImageFont.truetype(r"C:\Windows\Fonts\Nirmala.ttc", 18, index=0)
        draw.text((gx, gy - 1), "ॐ", font=font, fill=(255, 236, 170, 255), anchor="mm")
    except OSError:
        draw.ellipse((gx - 4, gy - 4, gx + 4, gy + 4), fill=(255, 236, 170, 255))

    bbox = im.getbbox()
    assert bbox
    pad = 24
    bbox = (
        max(0, bbox[0] - pad),
        max(0, bbox[1] - pad),
        min(im.width, bbox[2] + pad),
        min(im.height, bbox[3] + pad),
    )
    im = im.crop(bbox)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    im.save(OUT, "PNG", optimize=True)
    print(f"saved {OUT} {im.size} beads={BEAD_COUNT}")


if __name__ == "__main__":
    main()
