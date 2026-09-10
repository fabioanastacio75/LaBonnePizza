import fitz
from pathlib import Path
pdf = Path('attached_assets/La_Bonne_Pizza___Menu___Ago_2026_1787908547742.pdf')
out = Path('.agents/outputs/pizza_menu_pdf')
out.mkdir(parents=True, exist_ok=True)
doc = fitz.open(pdf)
print('pages', doc.page_count)
for i, page in enumerate(doc):
    text = page.get_text().strip()
    print(f'--- PAGE {i+1} ---')
    print(text[:12000])
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    path = out / f'page-{i+1}.png'
    pix.save(path)
    print(f'[rendered] {path}')
