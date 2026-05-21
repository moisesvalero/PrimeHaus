/**
 * Descarga imágenes Unsplash del portfolio en máxima calidad a static/imagenes/portfolio/
 * Uso: node scripts/download-portfolio-images.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '../static/imagenes/portfolio');

/** photo-{timestamp}-{hash} — IDs únicos usados en el sitio */
const PHOTO_IDS = [
  '1600596542815-ffad4c1539a9',
  '1600607687939-ce8a6c25118c',
  '1539650116574-8efeb43e2750',
  '1613977257363-707ba9348227',
  '1600585154340-be6161a56a0c',
  '1600607687920-4e2a09cf159d',
  '1600566753190-17f0baa2a6c3',
  '1600607687644-c7171b42498b',
  '1600566752355-35792bedcfea',
  '1600047509807-ba8f99d2cdde',
  '1600573472550-8090b5e0745e',
  '1600607688969-a5bfcd646154',
  '1600566753086-00f18fb6b3ea',
  '1600210492486-724fe5c67fb0',
  '1600607688960-e095ff83135c',
  '1600047509358-9dc75507daeb',
  '1507003211169-0a1dd7228f2d',
  '1573496359142-b8d87734a5a2',
  '1500648767791-00dcc994a43e',
  '1580489944761-15a19d654956'
];

async function downloadOne(id) {
  const outPath = join(OUT_DIR, `${id}.webp`);
  const attempts = [
    `https://images.unsplash.com/photo-${id}?w=2560&q=92&auto=format&fit=max`,
    `https://images.unsplash.com/photo-${id}?w=2400&q=90&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${id}?w=2400&q=90`
  ];

  for (const url of attempts) {
    const res = await fetch(url);
    if (!res.ok) continue;
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(outPath, buf);
    const kb = (buf.length / 1024).toFixed(0);
    console.log(`OK ${id}.webp (${kb} KB)`);
    return;
  }

  console.warn(`SKIP ${id} (no disponible en Unsplash)`);
}

await mkdir(OUT_DIR, { recursive: true });
console.log(`Descargando ${PHOTO_IDS.length} imágenes a ${OUT_DIR}…`);

for (const id of PHOTO_IDS) {
  await downloadOne(id);
}

console.log('Listo.');
