from pathlib import Path

import fitz


SOURCE = Path("attached_assets/LOGO_La_bonne_pizza.2026_1789062865958.pdf")
OUTPUT_DIR = Path(".agents/outputs/la_bonne_logo")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    document = fitz.open(SOURCE)
    print(f"pages={document.page_count}")

    for index, page in enumerate(document):
        print(f"page={index + 1} size={page.rect}")
        pixmap = page.get_pixmap(matrix=fitz.Matrix(3, 3), alpha=False)
        pixmap.save(OUTPUT_DIR / f"page-{index + 1}.png")

        for image_index, image in enumerate(page.get_images(full=True), start=1):
            extracted = document.extract_image(image[0])
            extension = extracted["ext"]
            (OUTPUT_DIR / f"page-{index + 1}-image-{image_index}.{extension}").write_bytes(
                extracted["image"]
            )


if __name__ == "__main__":
    main()