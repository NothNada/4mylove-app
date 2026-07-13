/**
 * Scans assets/images/galery/ and generates src/utils/galleryAssets.ts
 * Run: node scripts/generate-gallery.js
 */

const fs = require("fs")
const path = require("path")

const galleryDir = path.join(__dirname, "..", "assets", "images", "galery")
const outputFile = path.join(__dirname, "..", "src", "utils", "galleryAssets.ts")

const IMG_EXTS = /\.(jpe?g|png|gif|webp)$/i

function getImageSize(filepath) {
  const fd = fs.openSync(filepath, "r")
  const buf = Buffer.alloc(32768)
  const bytes = fs.readSync(fd, buf, 0, buf.length, 0)
  fs.closeSync(fd)

  // JPEG
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2
    while (offset + 9 < bytes) {
      if (buf[offset] !== 0xff) break
      const marker = buf[offset + 1]
      if (marker === 0xc0 || marker === 0xc2) {
        return {
          w: buf.readUInt16BE(offset + 7),
          h: buf.readUInt16BE(offset + 5),
        }
      }
      const segLen = buf.readUInt16BE(offset + 2)
      offset += 2 + segLen
    }
  }

  // PNG
  if (
    buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e &&
    buf[3] === 0x47 && buf[4] === 0x0d && buf[5] === 0x0a &&
    buf[6] === 0x1a && buf[7] === 0x0a
  ) {
    return {
      w: buf.readUInt32BE(16),
      h: buf.readUInt32BE(20),
    }
  }

  return null
}

if (!fs.existsSync(galleryDir)) {
  const empty = `// This file is auto-generated. Run \`npm run generate-gallery\` to update.
export const galleryAssets: { id: number; w: number; h: number }[] = []
`
  fs.writeFileSync(outputFile, empty)
  console.log("Created empty galleryAssets.ts (no gallery directory)")
  process.exit(0)
}

const files = fs
  .readdirSync(galleryDir)
  .filter((f) => IMG_EXTS.test(f))
  .sort()

if (files.length === 0) {
  const empty = `// This file is auto-generated. Run \`npm run generate-gallery\` to update.
export const galleryAssets: { id: number; w: number; h: number }[] = []
`
  fs.writeFileSync(outputFile, empty)
  console.log("Created empty galleryAssets.ts (no image files)")
  process.exit(0)
}

const entries = files.map((f) => {
  const fullPath = path.join(galleryDir, f)
  const size = getImageSize(fullPath)
  const w = size ? size.w : 1000
  const h = size ? size.h : 1000
  const requirePath = `./../../assets/images/galery/${f}`
  return { requirePath, w, h, filename: f }
})

const lines = entries.map(
  (e) => `  { id: require('${e.requirePath}'), w: ${e.w}, h: ${e.h} },`,
)

const content = `// This file is auto-generated. Run \`npm run generate-gallery\` to update.
export const galleryAssets: { id: number; w: number; h: number }[] = [
${lines.join("\n")}
]
`

fs.writeFileSync(outputFile, content)
console.log(`Generated galleryAssets.ts with ${entries.length} images`)
entries.forEach((e) =>
  console.log(`  ${e.filename} → ${e.w}x${e.h}`),
)
