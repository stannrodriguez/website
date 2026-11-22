// Regenerates the raster icons and link-preview card in public/.
// Run with: node scripts/share-images.mjs
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const PAPER = "#f8f3ea";
const RUST = "#d4472c";
const INK = "#1f1f1f";
const MUTED = "#6b6b6b";
const FONT = "-apple-system, 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif";

// The six-circle constellation from public/favicon.svg, on a 32-unit grid.
const MARK = `
  <circle cx="16" cy="16" r="4.5"/>
  <circle cx="16" cy="6.5" r="2.4"/>
  <circle cx="25" cy="13" r="1.6"/>
  <circle cx="21.6" cy="23.7" r="2.4"/>
  <circle cx="10.4" cy="23.7" r="1.6"/>
  <circle cx="7" cy="13" r="2.4"/>`;

const icon = ({ rounded }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="${rounded ? 8 : 0}" fill="${PAPER}"/>
  <g fill="${RUST}">${MARK}</g>
</svg>`;

// Apple applies its own corner mask, so the touch icon is full-bleed with extra breathing room.
const touchIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="${PAPER}"/>
  <g fill="${RUST}" transform="translate(16 16) scale(0.8) translate(-16 -15.1)">${MARK}</g>
</svg>`;

const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <g fill="${RUST}" transform="translate(68 71) scale(6)">${MARK}</g>
  <text x="96" y="474" font-family="${FONT}" font-size="92" font-weight="600" letter-spacing="-1.5" fill="${INK}">Stephanie Rodriguez</text>
  <text x="98" y="538" font-family="${FONT}" font-size="36" fill="${MUTED}">Software engineer</text>
</svg>`;

const png = (svg, size) =>
  sharp(Buffer.from(svg), { density: 72 * Math.ceil(size / 32) })
    .resize(size, size)
    .png()
    .toBuffer();

// ICO container holding PNG-encoded images.
function ico(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i;
    header.writeUInt8(size % 256, e);
    header.writeUInt8(size % 256, e + 1);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((im) => im.data)]);
}

const rounded = icon({ rounded: true });
const icoImages = await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(rounded, size) })));

await writeFile("public/favicon.ico", ico(icoImages));
await writeFile("public/favicon-32.png", await png(rounded, 32));
await writeFile("public/apple-touch-icon.png", await png(touchIcon, 180));
await writeFile(
  "public/og-card.png",
  await sharp(Buffer.from(card)).flatten({ background: PAPER }).png().toBuffer(),
);
