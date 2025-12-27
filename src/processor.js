import { STOP_WORDS } from './stopwords.js';

/**
 * Tokenize text into words
 * @param {string} text - Raw text input
 * @returns {string[]} Array of lowercase words
 */
export function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, ' ')  // Remove non-letters
    .split(/\s+/)               // Split on whitespace
    .filter(word => word.length > 2);  // Remove very short words
}

/**
 * Remove stop words from token array
 * @param {string[]} tokens - Array of words
 * @returns {string[]} Filtered array
 */
export function removeStopWords(tokens) {
  return tokens.filter(word => !STOP_WORDS.has(word));
}

/**
 * Count word frequencies
 * @param {string[]} tokens - Array of words
 * @returns {Map<string, number>} Word frequency map
 */
export function countFrequencies(tokens) {
  const frequencies = new Map();

  for (const word of tokens) {
    frequencies.set(word, (frequencies.get(word) || 0) + 1);
  }

  return frequencies;
}

/**
 * Get top N words by frequency
 * @param {Map<string, number>} frequencies - Word frequency map
 * @param {number} n - Number of words to return
 * @returns {Array<{text: string, size: number}>} Top words with counts
 */
export function getTopWords(frequencies, n = 150) {
  return Array.from(frequencies.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([text, size]) => ({ text, size }));
}

/**
 * Full processing pipeline
 * @param {string} text - Raw text input
 * @param {number} maxWords - Maximum words to return
 * @returns {Array<{text: string, size: number}>} Processed word data
 */
export function processText(text, maxWords = 150) {
  const tokens = tokenize(text);
  const filtered = removeStopWords(tokens);
  const frequencies = countFrequencies(filtered);
  return getTopWords(frequencies, maxWords);
}
