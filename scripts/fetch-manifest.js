const fs = require('fs');
const https = require('https');

const BUNGIE_MANIFEST_URL = 'https://www.bungie.net/Platform/Destiny2/Manifest/';
const MANIFEST_FILE = 'manifest.json';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          console.error("Failed to parse JSON. Raw response:", data.substring(0, 500));
          reject(e);
        }
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

function fetchFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', reject);
  });
}

async function download() {
  console.log("Checking Bungie Manifest version...");
  const manifestData = await fetchJson(BUNGIE_MANIFEST_URL);
  
  if (!manifestData.Response) {
    console.error("Bungie blocked the request. Need API Key.");
    return;
  }

  const itemDefPath = manifestData.Response.jsonWorldComponentContentPaths.en.DestinyInventoryItemDefinition;
  const fullUrl = `https://www.bungie.net${itemDefPath}`;
  
  console.log(`Downloading full manifest from ${fullUrl}...`);
  await fetchFile(fullUrl, MANIFEST_FILE);
  console.log(`Successfully saved full manifest to ${MANIFEST_FILE}`);
}

download().catch(console.error);
