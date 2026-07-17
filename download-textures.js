const https = require('https');
const fs = require('fs');
const path = require('path');

const textures = [
  '2k_mercury.jpg',
  '2k_venus_surface.jpg',
  '2k_earth_daymap.jpg',
  '2k_moon.jpg',
  '2k_mars.jpg',
  '2k_jupiter.jpg',
  '2k_saturn.jpg',
  '2k_saturn_ring_alpha.png',
  '2k_uranus.jpg',
  '2k_neptune.jpg',
  '2k_sun.jpg'
];

const dir = path.join(__dirname, 'public', 'textures');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

async function download() {
  console.log('Downloading textures...');
  for (const file of textures) {
    const url = `https://www.solarsystemscope.com/textures/download/${file}`;
    const dest = path.join(dir, file);
    
    if (fs.existsSync(dest)) {
      console.log(`Already exists: ${file}`);
      continue;
    }
    
    await new Promise((resolve, reject) => {
      https.get(url, (response) => {
        if (response.statusCode === 200) {
          const fileStream = fs.createWriteStream(dest);
          response.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Downloaded: ${file}`);
            resolve();
          });
        } else {
          console.error(`Failed to download ${file}: ${response.statusCode}`);
          resolve(); // Resolve anyway to continue
        }
      }).on('error', (err) => {
        console.error(`Error downloading ${file}:`, err.message);
        resolve();
      });
    });
  }
  console.log('Finished downloading textures!');
}

download();
