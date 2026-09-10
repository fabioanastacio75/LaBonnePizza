from pathlib import Path

import fitz


SOURCE = Path("attached_assets/LOGO_La_bonne_pizza.2026_1789067737753.pdf")
OUTPUT = Path(".agents/outputs/latest_la_bonne_logo/page-1.png")


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    document = fitz.open(SOURCE)
    page = document[0]
    pixmap = page.get_pixmap(matrix=fitz.Matrix(3, 3), alpha=False)
    pixmap.save(OUTPUT)
    print(f"page_size={page.rect} render={pixmap.width}x{pixmap.height}")


if __name__ == "__main__":
    main()