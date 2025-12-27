import * as d3 from 'd3';
import cloud from 'd3-cloud';

const WIDTH = 800;
const HEIGHT = 600;

/**
 * Generate and render word cloud
 * @param {Array<{text: string, size: number}>} words - Word data
 * @param {string} containerId - Container element ID
 */
export function renderWordCloud(words, containerId = 'word-cloud') {
  const container = document.getElementById(containerId);
  container.innerHTML = '';  // Clear any existing content

  // Calculate font size scale
  const maxFreq = Math.max(...words.map(w => w.size));
  const minFreq = Math.min(...words.map(w => w.size));

  const fontScale = d3.scaleLog()
    .domain([minFreq, maxFreq])
    .range([12, 80]);

  // Color scale
  const colorScale = d3.scaleOrdinal(d3.schemeTableau10);

  // Create layout
  const layout = cloud()
    .size([WIDTH, HEIGHT])
    .words(words.map(d => ({
      text: d.text,
      size: d.size,
      fontSize: fontScale(d.size)
    })))
    .padding(3)
    .rotate(() => (Math.random() > 0.5 ? 0 : 90))
    .font('Impact')
    .fontSize(d => d.fontSize)
    .on('end', draw);

  layout.start();

  function draw(words) {
    const svg = d3.select(`#${containerId}`)
      .append('svg')
      .attr('width', WIDTH)
      .attr('height', HEIGHT);

    const g = svg.append('g')
      .attr('transform', `translate(${WIDTH / 2},${HEIGHT / 2})`);

    g.selectAll('text')
      .data(words)
      .enter()
      .append('text')
      .style('font-size', d => `${d.size}px`)
      .style('font-family', 'Impact')
      .style('fill', (d, i) => colorScale(i))
      .style('cursor', 'pointer')
      .attr('text-anchor', 'middle')
      .attr('transform', d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
      .text(d => d.text);

    console.log(`Rendered ${words.length} words`);
  }
}
