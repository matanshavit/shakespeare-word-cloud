import { loadShakespeare } from './data.js';
import { processText } from './processor.js';

async function init() {
  const loadingEl = document.getElementById('loading');

  try {
    const text = await loadShakespeare();
    console.log(`Loaded ${text.length} characters`);

    const words = processText(text, 150);
    console.log(`Processed ${words.length} unique words`);
    console.log('Top 10:', words.slice(0, 10));

    loadingEl.classList.add('hidden');

    // TODO: Generate word cloud

  } catch (error) {
    loadingEl.textContent = `Error: ${error.message}`;
    console.error(error);
  }
}

init();
