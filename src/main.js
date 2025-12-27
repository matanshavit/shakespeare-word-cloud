import { loadShakespeare } from './data.js';
import { processText } from './processor.js';
import { renderWordCloud } from './cloud.js';

async function init() {
  const loadingEl = document.getElementById('loading');

  try {
    const text = await loadShakespeare();
    console.log(`Loaded ${text.length} characters`);

    const words = processText(text, 150);
    console.log(`Processed ${words.length} unique words`);

    loadingEl.classList.add('hidden');

    renderWordCloud(words);

  } catch (error) {
    loadingEl.textContent = `Error: ${error.message}`;
    console.error(error);
  }
}

init();
