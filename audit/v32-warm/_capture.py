"""Capture full-page screenshots of 6 routes at 2 viewports for SEN-79 (v3.2-warm)."""
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3000"
OUT = Path(__file__).parent

ROUTES = [
    ("/", "home"),
    ("/hipotecas", "hipotecas"),
    ("/hipotecas/matcher", "hipotecas-matcher"),
    ("/infonavit", "infonavit"),
    ("/infonavit/calculadora", "infonavit-calculadora"),
    ("/infonavit/requisitos", "infonavit-requisitos"),
]

VIEWPORTS = [
    ("mobile", 375, 812),
    ("desktop", 1280, 800),
]

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for vp_name, w, h in VIEWPORTS:
            context = browser.new_context(
                viewport={"width": w, "height": h},
                device_scale_factor=1,
                reduced_motion="reduce",
            )
            page = context.new_page()
            for route, slug in ROUTES:
                url = BASE + route
                print(f"[{vp_name}] {url}")
                page.goto(url, wait_until="networkidle", timeout=60000)
                page.wait_for_timeout(800)
                out = OUT / vp_name / f"{slug}.png"
                page.screenshot(path=str(out), full_page=True)
            context.close()
        browser.close()
    print("done")

if __name__ == "__main__":
    main()
