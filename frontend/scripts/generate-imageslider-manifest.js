/**
 * Generates a manifest of all image and video files in src/assets/imageslider/
 * Run this script before build/serve to make the slider dynamic.
 * Add or remove files in the imageslider folder - they will be picked up on next run.
 */

const fs = require('fs');
const path = require('path');

const IMAGESLIDER_DIR = path.join(__dirname, '../src/assets/imageslider');
const OUTPUT_FILE = path.join(__dirname, '../src/app/features/pages/home/imageslider-manifest.generated.ts');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];

function getMediaType(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (IMAGE_EXTENSIONS.includes(ext)) return 'image';
  if (VIDEO_EXTENSIONS.includes(ext)) return 'video';
  return null;
}

function generateManifest() {
  let images = [];
  let videos = [];

  if (!fs.existsSync(IMAGESLIDER_DIR)) {
    console.warn(`imageslider folder not found at ${IMAGESLIDER_DIR}. Creating empty folder.`);
    fs.mkdirSync(IMAGESLIDER_DIR, { recursive: true });
  } else {
    const files = fs.readdirSync(IMAGESLIDER_DIR);
    for (const file of files) {
      const fullPath = path.join(IMAGESLIDER_DIR, file);
      if (fs.statSync(fullPath).isFile()) {
        const mediaType = getMediaType(file);
        const assetPath = `/assets/imageslider/${file}`;
        if (mediaType === 'image') {
          images.push(assetPath);
        } else if (mediaType === 'video') {
          videos.push(assetPath);
        }
      }
    }
  }

  const content = `// AUTO-GENERATED - Do not edit manually. Run: node scripts/generate-imageslider-manifest.js
export const IMAGESLIDER_IMAGES: string[] = ${JSON.stringify(images, null, 2)};
export const IMAGESLIDER_VIDEOS: string[] = ${JSON.stringify(videos, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, content);
  console.log(`Imageslider manifest generated: ${images.length} images, ${videos.length} videos`);
}

generateManifest();
