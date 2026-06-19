import fs from 'fs';

const html = fs.readFileSync('C:/Users/nam.tran/.gemini/antigravity-ide/brain/450e1a48-cc87-43c1-94e5-f79c7d77f6ed/.system_generated/steps/556/content.md', 'utf-8');

// The content we care about is usually after the table of contents.
// Let's use regex to find all H2, H3 and following text/lists.

const data = [];
let currentEra = null;
let currentPeriod = null;

// Find sections. In MediaWiki, sections are marked with <span class="mw-headline" id="...">...</span>
// Let's split by <h2
const h2Splits = html.split('<h2');

for (let i = 1; i < h2Splits.length; i++) {
  const h2Block = '<h2' + h2Splits[i];
  const h2Match = h2Block.match(/<span class="mw-headline" id="[^"]+">(.*?)<\/span>/);
  if (!h2Match) continue;
  
  const eraName = h2Match[1].replace(/<[^>]+>/g, '').trim();
  if (eraName === 'See also' || eraName === 'References') continue;
  
  currentEra = {
    era: eraName,
    periods: []
  };
  
  // Split by <h3
  const h3Splits = h2Block.split('<h3');
  
  for (let j = 0; j < h3Splits.length; j++) {
    const h3Block = (j === 0 ? h3Splits[j] : '<h3' + h3Splits[j]);
    
    let periodName = "General";
    if (j > 0) {
      const h3Match = h3Block.match(/<span class="mw-headline" id="[^"]+">(.*?)<\/span>/);
      if (h3Match) {
        periodName = h3Match[1].replace(/<[^>]+>/g, '').trim();
      }
    }
    
    // Extract list items <li>...</li>
    const events = [];
    const liRegex = /<li>(.*?)<\/li>/gs;
    let liMatch;
    while ((liMatch = liRegex.exec(h3Block)) !== null) {
      // Clean up HTML tags and links
      let text = liMatch[1].replace(/<[^>]+>/g, '').trim();
      text = text.replace(/&#91;.*?&#93;/g, ''); // remove [1] citations
      text = text.replace(/\[\d+\]/g, '');
      if (text.length > 10) {
        events.push(text);
      }
    }
    
    if (events.length > 0) {
      currentEra.periods.push({
        name: periodName,
        events: events.slice(0, 5) // keep it concise, just first 5 events per period for the UI
      });
    }
  }
  
  if (currentEra.periods.length > 0) {
    data.push(currentEra);
  }
}

fs.writeFileSync('d:/Learning/PersonalDev/Sherpa/src/data/timeline.json', JSON.stringify(data, null, 2));
console.log('Successfully extracted ' + data.length + ' eras.');
