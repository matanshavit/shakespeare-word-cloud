const SHAKESPEARE_URL = `${import.meta.env.BASE_URL}shakespeare.txt`;

// Gutenberg standard delimiters
const START_MARKER = '*** START OF THE PROJECT GUTENBERG EBOOK THE COMPLETE WORKS OF WILLIAM SHAKESPEARE ***';
const END_MARKER = '*** END OF THE PROJECT GUTENBERG EBOOK THE COMPLETE WORKS OF WILLIAM SHAKESPEARE ***';

/**
 * Extract content between Gutenberg delimiters
 * @param {string} text - Full Gutenberg text including boilerplate
 * @returns {string} Text content only, without header/footer
 */
function trimGutenbergBoilerplate(text) {
  const startIndex = text.indexOf(START_MARKER);
  const endIndex = text.indexOf(END_MARKER);

  if (startIndex === -1 || endIndex === -1) {
    console.warn('Gutenberg markers not found, returning full text');
    return text;
  }

  // Start after the marker line
  const contentStart = startIndex + START_MARKER.length;

  return text.slice(contentStart, endIndex).trim();
}

export async function loadShakespeare() {
  const response = await fetch(SHAKESPEARE_URL);

  if (!response.ok) {
    throw new Error(`Failed to load Shakespeare: ${response.status}`);
  }

  const fullText = await response.text();
  return trimGutenbergBoilerplate(fullText);
}
