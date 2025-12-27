import { loadShakespeare } from './data.js';

async function init() {
  const loadingEl = document.getElementById('loading');

  try {
    const text = await loadShakespeare();
    console.log(`Loaded ${text.length} characters`);
    loadingEl.classList.add('hidden');

    // TODO: Process text and generate word cloud

  } catch (error) {
    loadingEl.textContent = `Error: ${error.message}`;
    console.error(error);
  }
}

init();
