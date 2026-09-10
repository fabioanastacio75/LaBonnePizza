import fitz
from pathlib import Path
pdf = Path('attached_assets/La_Bonne_Pizza_PDF_small_1787871566133.pdf')
out = Path('.agents/outputs/pizza_pdf_pages')
out.mkdir(parents=True, exist_ok=True)
doc = fitz.open(pdf)
print('pages', doc.page_count)
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    path = out / f'page-{i+1}.png'
    pix.save(path)
    text = page.get_text().strip()
    print(f'page {i+1}: {page.rect.width:.0f}x{page.rect.height:.0f} text_chars={len(text)} output={path}')
    print(text[:2000])
