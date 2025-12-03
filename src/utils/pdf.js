import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export async function generateCatalogPdf(items) {
  try {
    const pdfDoc = await PDFDocument.create()
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const cover = pdfDoc.addPage([595, 842])
    cover.drawRectangle({ x: 0, y: 0, width: 595, height: 842, color: rgb(0, 0, 0) })
    cover.drawText('OpenBox', { x: 40, y: 790, size: 24, font, color: rgb(0.92, 0.35, 0.05) })
    cover.drawText('Catálogo de Produtos', { x: 40, y: 760, size: 18, font, color: rgb(1, 1, 1) })
    cover.drawText(`Itens: ${items.length}`, { x: 40, y: 730, size: 12, font, color: rgb(0.7, 0.7, 0.7) })

    for (const item of items) {
      const page = pdfDoc.addPage([595, 842])
      page.drawRectangle({ x: 0, y: 0, width: 595, height: 842, color: rgb(0, 0, 0) })
      const margin = 40

      let img
      if (item.image) {
        try {
          const res = await fetch(item.image)
          const bytes = await res.arrayBuffer()
          try {
            img = await pdfDoc.embedJpg(bytes)
          } catch {
            img = await pdfDoc.embedPng(bytes)
          }
        } catch {}
      }

      if (img) {
        const maxW = 595 - margin * 2
        const maxH = 300
        const scale = Math.min(maxW / img.width, maxH / img.height)
        const w = img.width * scale
        const h = img.height * scale
        page.drawImage(img, { x: margin, y: 842 - margin - h, width: w, height: h })
      } else {
        page.drawRectangle({ x: margin, y: 842 - margin - 200, width: 515 - margin, height: 200, color: rgb(0.1, 0.1, 0.1) })
        page.drawText('Imagem indisponível', { x: margin + 10, y: 842 - margin - 100, size: 12, font, color: rgb(0.7, 0.7, 0.7) })
      }

      page.drawText(item.name, { x: margin, y: 480, size: 16, font, color: rgb(1, 1, 1) })
      page.drawText(item.description || '', { x: margin, y: 455, size: 12, font, color: rgb(0.85, 0.85, 0.85) })
      page.drawText(`Preço: R$ ${item.price.toFixed(2)}`, { x: margin, y: 430, size: 13, font, color: rgb(0.92, 0.35, 0.05) })
      page.drawText(`Categoria: ${item.category}`, { x: margin, y: 410, size: 11, font, color: rgb(0.92, 0.35, 0.05) })
    }

    const bytes = await pdfDoc.save()
    const blob = new Blob([bytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'catalogo-openbox.pdf'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    return true
  } catch {
    return false
  }
}
