import type { Kind } from "../data/projects";

/**
 * Deterministic little marks for project cards. The slug seeds the shape, and
 * the kind picks the family (orbits for explainers, arches for reading sites,
 * and so on), so each project keeps the same glyph from build to build.
 * Everything is drawn in a 100×100 box around (50, 50).
 */

export interface Shape {
  d: string;
  filled?: boolean;
  /** Small parts can orbit on hover; see Glyph.astro. */
  transform?: string;
}

/** FNV-1a, then mulberry32: tiny, stable, good enough for art. */
export function seeded(text: string): () => number {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return () => {
    h = (h + 0x6d2b79f5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

function circle(cx: number, cy: number, r: number): string {
  return `M${r1(cx - r)} ${r1(cy)}a${r1(r)} ${r1(r)} 0 1 0 ${r1(2 * r)} 0a${r1(r)} ${r1(r)} 0 1 0 ${r1(-2 * r)} 0`;
}

function ellipse(rx: number, ry: number): string {
  return `M${r1(50 - rx)} 50a${r1(rx)} ${r1(ry)} 0 1 0 ${r1(2 * rx)} 0a${r1(rx)} ${r1(ry)} 0 1 0 ${r1(-2 * rx)} 0`;
}

function square(size: number): string {
  const o = 50 - size / 2;
  return `M${r1(o)} ${r1(o)}h${r1(size)}v${r1(size)}h${r1(-size)}z`;
}

const families: Record<Kind, (rand: () => number) => Shape[]> = {
  // Orbits around a nucleus.
  poke(rand) {
    const n = 2 + Math.floor(rand() * 3);
    const offset = rand() * 60;
    const shapes: Shape[] = [];
    for (let i = 0; i < n; i++) {
      shapes.push({ d: ellipse(42, 11 + rand() * 12), transform: `rotate(${r1(offset + (180 / n) * i)} 50 50)` });
    }
    shapes.push({ d: circle(50, 50, 6 + rand() * 3), filled: true });
    shapes.push({ d: circle(92, 50, 4), filled: true, transform: `rotate(${r1(offset)} 50 50)` });
    return shapes;
  },

  // A ring of dots, like pips or players around a table.
  play(rand) {
    const n = 5 + Math.floor(rand() * 5);
    const shapes: Shape[] = [{ d: circle(50, 50, 9 + rand() * 5), filled: true }];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      shapes.push({ d: circle(50 + Math.cos(a) * 34, 50 + Math.sin(a) * 34, i % 2 ? 4 : 6.5), filled: i % 3 !== 1 });
    }
    return shapes;
  },

  // Nested doorways.
  read(rand) {
    const k = 2 + Math.floor(rand() * 3);
    const fillInner = rand() < 0.6;
    const pointed = rand() < 0.5;
    const shapes: Shape[] = [];
    for (let i = 0; i < k; i++) {
      const w = 40 - i * (28 / k);
      const top = 10 + i * (12 + rand() * 8);
      const spring = top + w;
      // Round arches, or Gothic ones (two arcs meeting in a point).
      const arch = pointed
        ? `A${r1(w * 1.6)} ${r1(w * 1.6)} 0 0 1 50 ${r1(top)}A${r1(w * 1.6)} ${r1(w * 1.6)} 0 0 1 ${r1(50 + w)} ${r1(spring)}`
        : `A${r1(w)} ${r1(w)} 0 0 1 ${r1(50 + w)} ${r1(spring)}`;
      const d = `M${r1(50 - w)} 92V${r1(spring)}${arch}V92`;
      const inner = i === k - 1;
      shapes.push({ d: inner ? `${d}Z` : d, filled: inner && fillInner });
    }
    return shapes;
  },

  // A 3×3 grid of cells, some checked off.
  use(rand) {
    const shapes: Shape[] = [];
    let filled = 0;
    for (let i = 0; i < 9; i++) {
      const x = 14 + (i % 3) * 26;
      const y = 14 + Math.floor(i / 3) * 26;
      const on = rand() < 0.45 || (filled < 3 && i > 5);
      if (on) filled++;
      shapes.push({ d: `M${x + 4} ${y}h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-12a4 4 0 0 1-4-4v-12a4 4 0 0 1 4-4z`, filled: on });
    }
    return shapes;
  },

  // Squares nested and turned, like taking something apart.
  rebuild(rand) {
    const step = 8 + rand() * 14;
    return [74, 56, 38, 20].map((size, i) => ({
      d: square(size),
      filled: i === 3,
      transform: `rotate(${r1(i * step)} 50 50)`,
    }));
  },

  // A spiral with a sprout at the end.
  early(rand) {
    const turns = 2.2 + rand() * 1.2;
    const start = rand() * Math.PI * 2;
    const steps = 80;
    let d = "";
    let x = 50;
    let y = 50;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const a = start + t * turns * Math.PI * 2;
      x = 50 + Math.cos(a) * t * 40;
      y = 50 + Math.sin(a) * t * 40;
      d += `${i ? "L" : "M"}${r1(x)} ${r1(y)}`;
    }
    return [{ d }, { d: circle(x, y, 5.5), filled: true }];
  },
};

export function glyph(slug: string, kind: Kind): Shape[] {
  return families[kind](seeded(slug));
}
