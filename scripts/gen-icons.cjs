// Generates solid-color PNG icons for the PWA manifest (no dependencies)
const zlib = require('node:zlib')
const fs   = require('node:fs')
const path = require('node:path')

// CRC32 table
const CRC = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1
    t[n] = c
  }
  return t
})()

function crc32(buf) {
  let c = 0xFFFFFFFF
  for (const b of buf) c = CRC[(c ^ b) & 0xFF] ^ (c >>> 8)
  return (c ^ 0xFFFFFFFF) >>> 0
}

function u32(n) { const b = Buffer.alloc(4); b.writeUInt32BE(n); return b }

function chunk(type, data) {
  const t = Buffer.from(type)
  const crc = u32(crc32(Buffer.concat([t, data])))
  return Buffer.concat([u32(data.length), t, data, crc])
}

function solidPNG(size, r, g, b) {
  const rows = []
  for (let y = 0; y < size; y++) {
    const row = Buffer.alloc(1 + size * 3)
    row[0] = 0 // filter = None
    for (let x = 0; x < size; x++) {
      row[1 + x * 3] = r
      row[2 + x * 3] = g
      row[3 + x * 3] = b
    }
    rows.push(row)
  }
  const raw  = Buffer.concat(rows)
  const idat = zlib.deflateSync(raw, { level: 9 })
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),          // PNG sig
    chunk('IHDR', Buffer.concat([u32(size), u32(size), Buffer.from([8, 2, 0, 0, 0])])),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

// #C8956C → R=200, G=149, B=108
const publicDir = path.join(__dirname, '..', 'public')
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), solidPNG(192, 200, 149, 108))
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), solidPNG(512, 200, 149, 108))
console.log('✓ icon-192.png and icon-512.png written to public/')
