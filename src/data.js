const SHAKESPEARE_URL = 'https://raw.githubusercontent.com/karpathy/char-rnn/master/data/tinyshakespeare/input.txt';

export async function loadShakespeare() {
  const response = await fetch(SHAKESPEARE_URL);

  if (!response.ok) {
    throw new Error(`Failed to load Shakespeare: ${response.status}`);
  }

  return await response.text();
}
