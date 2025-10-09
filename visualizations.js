// UA HPC Timeline Visualizations
// Using D3.js v7 for interactive data visualization

// Color scheme
const colors = {
    elgato: '#FF6B6B',
    ocelote: '#4ECDC4',
    puma: '#45B7D1',
    soteria: '#96CEB4',
    industry: '#FFE66D',
    gpu: '#A8E6CF',
    text: '#E3F2FD',
    grid: 'rgba(255, 255, 255, 0.05)'
};

// Helper functions
function formatNumber(num) {
    if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
}

// Tooltip
const tooltip = d3.select('.tooltip');

function showTooltip(event, content) {
    tooltip
        .html(content)
        .classed('show', true)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 10) + 'px');
}

function hideTooltip() {
    tooltip.classed('show', false);
}

// 1. HPC Systems Timeline
function createTimelineVisualization() {
    const data = [
        {
            name: 'El Gato',
            startYear: 2013,
            endYear: 2022,
            nodes: 118,
            cores: 1888,
            memory: 23.5,
            gpus: 0,
            color: colors.elgato,
            description: 'IBM System X iDataPlex dx360 M4'
        },
        {
            name: 'Ocelote',
            startYear: 2016,
            endYear: 2025,
            nodes: 421,
            cores: 11724,
            memory: 83.3,
            gpus: 95,
            color: colors.ocelote,
            description: 'Lenovo NeXtScale nx360 M5'
        },
        {
            name: 'Puma',
            startYear: 2020,
            endYear: 2028,
            nodes: 320,
            cores: 29512,
            memory: 169.7,
            gpus: 60,
            color: colors.puma,
            description: 'Penguin Altus XE2242'
        },
        {
            name: 'Soteria',
            startYear: 2023,
            endYear: 2030,
            nodes: 6,
            cores: 564,
            memory: 3,
            gpus: 8,
            color: colors.soteria,
            description: 'HIPAA Compliant Secure Cluster'
        }
    ];

    const container = d3.select('#timeline-viz');
    const width = container.node().getBoundingClientRect().width;
    const height = 400;
    const margin = { top: 40, right: 40, bottom: 60, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = container
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleLinear()
        .domain([2012, 2031])
        .range([0, innerWidth]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, innerHeight])
        .padding(0.3);

    // Grid lines
    const xGrid = d3.axisBottom(xScale)
        .tickSize(innerHeight)
        .tickFormat('')
        .ticks(10);

    g.append('g')
        .attr('class', 'grid')
        .call(xGrid);

    // Axes
    g.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format('d')));

    g.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(yScale));

    // Timeline bars
    const bars = g.selectAll('.timeline-bar')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'system-card');

    // Background bars (lifetime)
    bars.append('rect')
        .attr('x', d => xScale(d.startYear))
        .attr('y', d => yScale(d.name))
        .attr('width', d => xScale(d.endYear) - xScale(d.startYear))
        .attr('height', yScale.bandwidth())
        .attr('fill', d => d.color)
        .attr('opacity', 0.3)
        .attr('rx', 8)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 200)
        .attr('opacity', 0.8);

    // Active period (darker)
    const currentYear = 2025;
    bars.append('rect')
        .attr('x', d => xScale(d.startYear))
        .attr('y', d => yScale(d.name))
        .attr('width', 0)
        .attr('height', yScale.bandwidth())
        .attr('fill', d => d.color)
        .attr('opacity', 1)
        .attr('rx', 8)
        .transition()
        .duration(1500)
        .delay((d, i) => i * 200 + 500)
        .attr('width', d => {
            const endYear = Math.min(d.endYear, currentYear);
            return xScale(endYear) - xScale(d.startYear);
        });

    // Labels
    bars.append('text')
        .attr('x', d => xScale(d.startYear) + 10)
        .attr('y', d => yScale(d.name) + yScale.bandwidth() / 2)
        .attr('dy', '0.35em')
        .attr('fill', 'white')
        .attr('font-weight', 600)
        .attr('font-size', '14px')
        .text(d => `${d.name} (${d.nodes} nodes, ${formatNumber(d.cores)} cores)`);

    // Hover effects
    bars
        .on('mouseover', function(event, d) {
            d3.select(this).select('rect').attr('opacity', 1);
            const content = `
                <strong>${d.name}</strong><br/>
                ${d.description}<br/>
                Period: ${d.startYear} - ${d.endYear}<br/>
                Nodes: ${d.nodes}<br/>
                CPU Cores: ${formatNumber(d.cores)}<br/>
                Memory: ${d.memory} TB<br/>
                GPUs: ${d.gpus}
            `;
            showTooltip(event, content);
        })
        .on('mouseout', function(event, d) {
            d3.select(this).select('rect').attr('opacity', 0.8);
            hideTooltip();
        });

    // Current year indicator
    g.append('line')
        .attr('x1', xScale(currentYear))
        .attr('x2', xScale(currentYear))
        .attr('y1', 0)
        .attr('y2', innerHeight)
        .attr('stroke', colors.industry)
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5')
        .attr('opacity', 0.7);

    g.append('text')
        .attr('x', xScale(currentYear))
        .attr('y', -10)
        .attr('text-anchor', 'middle')
        .attr('fill', colors.industry)
        .attr('font-size', '12px')
        .text('Current Year');
}

// 2. CPU Core Evolution Chart
function createPerformanceVisualization() {
    const industryData = [
        { year: 2010, cores: 12 },
        { year: 2011, cores: 16 },
        { year: 2012, cores: 16 },
        { year: 2013, cores: 16 },
        { year: 2014, cores: 24 },
        { year: 2015, cores: 26 },
        { year: 2016, cores: 28 },
        { year: 2017, cores: 36 },
        { year: 2018, cores: 40 },
        { year: 2019, cores: 128 },
        { year: 2020, cores: 94 },
        { year: 2021, cores: 128 },
        { year: 2022, cores: 192 },
        { year: 2023, cores: 256 },
        { year: 2024, cores: 384 }
    ];

    const uaData = [
        { year: 2013, system: 'El Gato', cores: 16, color: colors.elgato },
        { year: 2016, system: 'Ocelote', cores: 28, color: colors.ocelote },
        { year: 2020, system: 'Puma', cores: 94, color: colors.puma }
    ];

    const container = d3.select('#performance-viz');
    const width = container.node().getBoundingClientRect().width;
    const height = 400;
    const margin = { top: 40, right: 40, bottom: 60, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = container
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleLinear()
        .domain([2010, 2024])
        .range([0, innerWidth]);

    const yScale = d3.scaleLog()
        .domain([10, 500])
        .range([innerHeight, 0]);

    // Grid lines
    const yGrid = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickFormat('');

    g.append('g')
        .attr('class', 'grid')
        .call(yGrid);

    // Axes
    g.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format('d')));

    g.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(yScale).tickValues([10, 20, 50, 100, 200, 400]));

    // Axis labels
    g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -50)
        .attr('x', -innerHeight / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', colors.text)
        .text('CPU Cores per Node (log scale)');

    g.append('text')
        .attr('x', innerWidth / 2)
        .attr('y', innerHeight + 45)
        .attr('text-anchor', 'middle')
        .attr('fill', colors.text)
        .text('Year');

    // Industry trend line
    const line = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.cores))
        .curve(d3.curveMonotoneX);

    const path = g.append('path')
        .datum(industryData)
        .attr('fill', 'none')
        .attr('stroke', colors.industry)
        .attr('stroke-width', 3)
        .attr('opacity', 0.7)
        .attr('d', line);

    // Animate the line
    const totalLength = path.node().getTotalLength();
    path
        .attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);

    // UA systems points
    const circles = g.selectAll('.ua-point')
        .data(uaData)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.year))
        .attr('cy', d => yScale(d.cores))
        .attr('r', 0)
        .attr('fill', d => d.color)
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .transition()
        .duration(500)
        .delay((d, i) => 2000 + i * 200)
        .attr('r', 8);

    // Labels for UA systems
    g.selectAll('.ua-label')
        .data(uaData)
        .enter()
        .append('text')
        .attr('x', d => xScale(d.year))
        .attr('y', d => yScale(d.cores) - 15)
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .attr('font-weight', 600)
        .attr('font-size', '12px')
        .text(d => d.system)
        .attr('opacity', 0)
        .transition()
        .duration(500)
        .delay((d, i) => 2200 + i * 200)
        .attr('opacity', 1);

    // Legend
    const legend = g.append('g')
        .attr('transform', `translate(${innerWidth - 150}, 20)`);

    legend.append('line')
        .attr('x1', 0)
        .attr('x2', 30)
        .attr('y1', 0)
        .attr('y2', 0)
        .attr('stroke', colors.industry)
        .attr('stroke-width', 3);

    legend.append('text')
        .attr('x', 35)
        .attr('y', 0)
        .attr('dy', '0.35em')
        .attr('fill', colors.text)
        .attr('font-size', '12px')
        .text('Industry Standard');

    legend.append('circle')
        .attr('cx', 15)
        .attr('cy', 20)
        .attr('r', 6)
        .attr('fill', colors.puma);

    legend.append('text')
        .attr('x', 35)
        .attr('y', 20)
        .attr('dy', '0.35em')
        .attr('fill', colors.text)
        .attr('font-size', '12px')
        .text('UA HPC Systems');
}

// 3. GPU Evolution Visualization
function createGPUEvolutionVisualization() {
    const gpuData = [
        { year: 2016, system: 'Ocelote', model: 'P100', count: 95, fp32: 10.6, totalTFLOPS: 1007, color: colors.ocelote },
        { year: 2020, system: 'Puma', model: 'V100S/A100', count: 60, fp32: 17.6, totalTFLOPS: 942, color: colors.puma },
        { year: 2023, system: 'Soteria', model: 'V100', count: 8, fp32: 15.7, totalTFLOPS: 126, color: colors.soteria }
    ];

    const container = d3.select('#gpu-evolution-viz');
    const width = container.node().getBoundingClientRect().width;
    const height = 400;
    const margin = { top: 40, right: 120, bottom: 60, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = container
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleLinear()
        .domain([2015, 2025])
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, 1200])
        .range([innerHeight, 0]);

    const radiusScale = d3.scaleSqrt()
        .domain([0, 100])
        .range([0, 40]);

    // Grid
    const yGrid = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickFormat('');

    g.append('g')
        .attr('class', 'grid')
        .call(yGrid);

    // Axes
    g.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format('d')));

    g.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(yScale).tickFormat(d => d + ' TFLOPS'));

    // Axis labels
    g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -50)
        .attr('x', -innerHeight / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', colors.text)
        .text('Total GPU Performance (FP32 TFLOPS)');

    g.append('text')
        .attr('x', innerWidth / 2)
        .attr('y', innerHeight + 45)
        .attr('text-anchor', 'middle')
        .attr('fill', colors.text)
        .text('Year Deployed');

    // Bubbles
    const bubbles = g.selectAll('.gpu-bubble')
        .data(gpuData)
        .enter()
        .append('g')
        .attr('class', 'gpu-bubble');

    bubbles.append('circle')
        .attr('cx', d => xScale(d.year))
        .attr('cy', d => yScale(d.totalTFLOPS))
        .attr('r', 0)
        .attr('fill', d => d.color)
        .attr('opacity', 0.7)
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 300)
        .attr('r', d => radiusScale(d.count));

    // Labels
    bubbles.append('text')
        .attr('x', d => xScale(d.year))
        .attr('y', d => yScale(d.totalTFLOPS))
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('fill', 'white')
        .attr('font-weight', 600)
        .attr('font-size', '14px')
        .text(d => d.count)
        .attr('opacity', 0)
        .transition()
        .duration(500)
        .delay((d, i) => 1000 + i * 300)
        .attr('opacity', 1);

    // System names
    bubbles.append('text')
        .attr('x', d => xScale(d.year))
        .attr('y', d => yScale(d.totalTFLOPS) - radiusScale(d.count) - 10)
        .attr('text-anchor', 'middle')
        .attr('fill', d => d.color)
        .attr('font-weight', 600)
        .attr('font-size', '12px')
        .text(d => `${d.system} (${d.model})`)
        .attr('opacity', 0)
        .transition()
        .duration(500)
        .delay((d, i) => 1200 + i * 300)
        .attr('opacity', 1);

    // Hover effects
    bubbles
        .on('mouseover', function(event, d) {
            d3.select(this).select('circle')
                .transition()
                .duration(200)
                .attr('opacity', 1)
                .attr('r', d => radiusScale(d.count) * 1.1);

            const content = `
                <strong>${d.system}</strong><br/>
                GPU Model: ${d.model}<br/>
                GPU Count: ${d.count}<br/>
                Per GPU: ${d.fp32} TFLOPS<br/>
                Total: ${d.totalTFLOPS} TFLOPS
            `;
            showTooltip(event, content);
        })
        .on('mouseout', function(event, d) {
            d3.select(this).select('circle')
                .transition()
                .duration(200)
                .attr('opacity', 0.7)
                .attr('r', d => radiusScale(d.count));
            hideTooltip();
        });

    // Size legend
    const sizeLegend = g.append('g')
        .attr('transform', `translate(${innerWidth - 80}, ${innerHeight - 100})`);

    [10, 50, 100].forEach((size, i) => {
        sizeLegend.append('circle')
            .attr('cx', 40)
            .attr('cy', i * 40)
            .attr('r', radiusScale(size))
            .attr('fill', 'none')
            .attr('stroke', colors.text)
            .attr('opacity', 0.5);

        sizeLegend.append('text')
            .attr('x', 40 + radiusScale(100) + 10)
            .attr('y', i * 40)
            .attr('dy', '0.35em')
            .attr('fill', colors.text)
            .attr('font-size', '11px')
            .text(`${size} GPUs`);
    });
}

// 4. System Capacity Bubble Chart
function createBubbleVisualization() {
    const systemData = [
        {
            name: 'El Gato',
            cores: 1888,
            memory: 23.5,
            nodes: 118,
            gpus: 0,
            color: colors.elgato,
            x: 0.2,
            y: 0.3
        },
        {
            name: 'Ocelote',
            cores: 11724,
            memory: 83.3,
            nodes: 421,
            gpus: 95,
            color: colors.ocelote,
            x: 0.5,
            y: 0.5
        },
        {
            name: 'Puma',
            cores: 29512,
            memory: 169.7,
            nodes: 320,
            gpus: 60,
            color: colors.puma,
            x: 0.7,
            y: 0.7
        },
        {
            name: 'Soteria',
            cores: 564,
            memory: 3,
            nodes: 6,
            gpus: 8,
            color: colors.soteria,
            x: 0.3,
            y: 0.2
        }
    ];

    const container = d3.select('#bubble-viz');
    const width = container.node().getBoundingClientRect().width;
    const height = 500;
    const margin = { top: 40, right: 40, bottom: 60, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = container
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleLinear()
        .domain([0, 35000])
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, 200])
        .range([innerHeight, 0]);

    const radiusScale = d3.scaleSqrt()
        .domain([0, 100])
        .range([0, 60]);

    // Grid
    const xGrid = d3.axisBottom(xScale)
        .tickSize(innerHeight)
        .tickFormat('');

    const yGrid = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickFormat('');

    g.append('g')
        .attr('class', 'grid')
        .call(xGrid);

    g.append('g')
        .attr('class', 'grid')
        .call(yGrid);

    // Axes
    g.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).tickFormat(d => formatNumber(d)));

    g.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(yScale).tickFormat(d => d + ' TB'));

    // Axis labels
    g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -50)
        .attr('x', -innerHeight / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', colors.text)
        .text('System Memory (TB)');

    g.append('text')
        .attr('x', innerWidth / 2)
        .attr('y', innerHeight + 45)
        .attr('text-anchor', 'middle')
        .attr('fill', colors.text)
        .text('CPU Cores');

    // Bubbles
    const simulation = d3.forceSimulation(systemData)
        .force('x', d3.forceX(d => xScale(d.cores)).strength(1))
        .force('y', d3.forceY(d => yScale(d.memory)).strength(1))
        .force('collision', d3.forceCollide(d => radiusScale(d.gpus || 10) + 5))
        .stop();

    for (let i = 0; i < 120; i++) simulation.tick();

    const bubbles = g.selectAll('.system-bubble')
        .data(systemData)
        .enter()
        .append('g')
        .attr('class', 'system-bubble')
        .attr('transform', d => `translate(${d.x},${d.y})`);

    // Main circles (GPU count)
    bubbles.append('circle')
        .attr('r', 0)
        .attr('fill', d => d.color)
        .attr('opacity', 0.7)
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .transition()
        .duration(1500)
        .delay((d, i) => i * 200)
        .attr('r', d => radiusScale(d.gpus || 10));

    // Inner circles (nodes)
    bubbles.append('circle')
        .attr('r', 0)
        .attr('fill', 'white')
        .attr('opacity', 0.3)
        .transition()
        .duration(1500)
        .delay((d, i) => i * 200 + 200)
        .attr('r', d => radiusScale(d.gpus || 10) * 0.6);

    // Labels
    bubbles.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '-0.5em')
        .attr('fill', 'white')
        .attr('font-weight', 700)
        .attr('font-size', '16px')
        .text(d => d.name)
        .attr('opacity', 0)
        .transition()
        .duration(500)
        .delay((d, i) => 1500 + i * 200)
        .attr('opacity', 1);

    bubbles.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '1em')
        .attr('fill', 'white')
        .attr('font-size', '12px')
        .text(d => d.gpus ? `${d.gpus} GPUs` : 'No GPUs')
        .attr('opacity', 0)
        .transition()
        .duration(500)
        .delay((d, i) => 1600 + i * 200)
        .attr('opacity', 1);

    // Hover effects
    bubbles
        .on('mouseover', function(event, d) {
            d3.select(this).selectAll('circle')
                .transition()
                .duration(200)
                .attr('opacity', 1);

            const content = `
                <strong>${d.name}</strong><br/>
                Nodes: ${d.nodes}<br/>
                CPU Cores: ${formatNumber(d.cores)}<br/>
                Memory: ${d.memory} TB<br/>
                GPUs: ${d.gpus || 'None'}<br/>
                ${d.gpus ? `GPU PFLOPS: ~${(d.gpus * 10 / 1000).toFixed(2)}` : ''}
            `;
            showTooltip(event, content);
        })
        .on('mouseout', function(event, d) {
            d3.select(this).select('circle:first-child')
                .transition()
                .duration(200)
                .attr('opacity', 0.7);
            d3.select(this).select('circle:last-child')
                .transition()
                .duration(200)
                .attr('opacity', 0.3);
            hideTooltip();
        });
}

// Initialize all visualizations
document.addEventListener('DOMContentLoaded', function() {
    createTimelineVisualization();
    createPerformanceVisualization();
    createGPUEvolutionVisualization();
    createBubbleVisualization();
});

// Responsive resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Clear and redraw
        d3.select('#timeline-viz').selectAll('*').remove();
        d3.select('#performance-viz').selectAll('*').remove();
        d3.select('#gpu-evolution-viz').selectAll('*').remove();
        d3.select('#bubble-viz').selectAll('*').remove();

        createTimelineVisualization();
        createPerformanceVisualization();
        createGPUEvolutionVisualization();
        createBubbleVisualization();
    }, 250);
});