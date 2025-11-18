// UA HPC Timeline Visualizations - Enhanced Version
// Shows system aging, warranty periods, and performance gaps

// Color scheme (updated for white background)
const colors = {
    elgato: '#FF6B6B',
    ocelote: '#4ECDC4',
    puma: '#45B7D1',
    soteria: '#96CEB4',
    industry: '#FFB800',
    warranty: '#4ADE80',
    aging: '#EF4444',
    gap: '#DC2626',
    text: '#475569',
    grid: '#F1F5F9'
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

// 1. Enhanced HPC Systems Timeline with Warranty and Aging
function createEnhancedTimelineVisualization() {
    const data = [
        {
            name: 'El Gato',
            startYear: 2013,
            endYear: 2026,  // Still active in 2025, estimated retirement
            warrantyEnd: 2018,
            nodes: 118,
            cores: 1888,
            coresPerNode: 16,
            memory: 23.5,
            gpus: 0,  // Never had GPUs (K40/K80 removed April 2022)
            color: colors.elgato,
            description: 'IBM System X iDataPlex dx360 M4'
        },
        {
            name: 'Ocelote',
            startYear: 2016,
            endYear: 2025,
            warrantyEnd: 2021,
            nodes: 421,
            cores: 11724,
            coresPerNode: 28,
            memory: 83.3,
            gpus: 95,
            gpuTFLOPS: 1007,
            color: colors.ocelote,
            description: 'Lenovo NeXtScale nx360 M5'
        },
        {
            name: 'Puma',
            startYear: 2020,
            endYear: 2028,
            warrantyEnd: 2025,
            nodes: 320,
            cores: 29512,
            coresPerNode: 94,
            memory: 169.7,
            gpus: 60,
            gpuTFLOPS: 942,
            color: colors.puma,
            description: 'Penguin Altus XE2242'
        },
        {
            name: 'Soteria',
            startYear: 2023,
            endYear: 2030,
            warrantyEnd: 2028,
            nodes: 6,
            cores: 564,
            coresPerNode: 94,
            memory: 3,
            gpus: 8,
            gpuTFLOPS: 126,
            color: colors.soteria,
            description: 'HIPAA Compliant Secure Cluster'
        }
    ];

    const container = d3.select('#timeline-viz');
    container.selectAll('*').remove();

    const width = container.node().getBoundingClientRect().width;
    const height = 500;
    const margin = { top: 60, right: 40, bottom: 100, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = container
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Add gradient definitions for aging effect
    const defs = svg.append('defs');

    data.forEach(d => {
        const gradient = defs.append('linearGradient')
            .attr('id', `aging-gradient-${d.name.replace(/\s+/g, '')}`)
            .attr('x1', '0%')
            .attr('x2', '100%');

        gradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', d.color)
            .attr('stop-opacity', 1);

        gradient.append('stop')
            .attr('offset', '50%')
            .attr('stop-color', d.color)
            .attr('stop-opacity', 0.8);

        gradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', colors.aging)
            .attr('stop-opacity', 0.6);
    });

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleLinear()
        .domain([2012, 2031])
        .range([0, innerWidth]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, innerHeight])
        .padding(0.25);

    // Grid lines
    const xGrid = d3.axisBottom(xScale)
        .tickSize(innerHeight)
        .tickFormat('')
        .ticks(19);

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

    const currentYear = 2025;

    // Timeline bars for each system
    const bars = g.selectAll('.timeline-bar')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'system-card');

    // Full lifetime bar (faded)
    bars.append('rect')
        .attr('x', d => xScale(d.startYear))
        .attr('y', d => yScale(d.name))
        .attr('width', d => xScale(d.endYear) - xScale(d.startYear))
        .attr('height', yScale.bandwidth())
        .attr('fill', d => d.color)
        .attr('opacity', 0.15)
        .attr('rx', 6);

    // Warranty period (bright)
    bars.append('rect')
        .attr('x', d => xScale(d.startYear))
        .attr('y', d => yScale(d.name))
        .attr('width', d => xScale(d.warrantyEnd) - xScale(d.startYear))
        .attr('height', yScale.bandwidth())
        .attr('fill', d => d.color)
        .attr('opacity', 0.9)
        .attr('rx', 6)
        .attr('class', 'warranty-period');

    // Post-warranty aging gradient
    bars.append('rect')
        .attr('x', d => xScale(d.warrantyEnd))
        .attr('y', d => yScale(d.name))
        .attr('width', d => {
            const end = Math.min(currentYear, d.endYear);
            return Math.max(0, xScale(end) - xScale(d.warrantyEnd));
        })
        .attr('height', yScale.bandwidth())
        .attr('fill', d => `url(#aging-gradient-${d.name.replace(/\s+/g, '')})`)
        .attr('opacity', 0.7)
        .attr('rx', 6)
        .attr('class', 'aging-period');

    // Warranty end markers
    bars.append('line')
        .attr('x1', d => xScale(d.warrantyEnd))
        .attr('x2', d => xScale(d.warrantyEnd))
        .attr('y1', d => yScale(d.name))
        .attr('y2', d => yScale(d.name) + yScale.bandwidth())
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '3,3')
        .attr('opacity', 0.8);

    // System labels (primary label on the left)
    bars.append('text')
        .attr('x', d => xScale(d.startYear) + 10)
        .attr('y', d => yScale(d.name) + yScale.bandwidth() / 2 - 8)
        .attr('dy', '0.35em')
        .attr('fill', '#1a202c')
        .attr('font-weight', 600)
        .attr('font-size', '13px')
        .text(d => `${d.name} (${d.coresPerNode} cores/node)`);

    // Age labels (secondary label below or on the right)
    bars.append('text')
        .attr('x', d => {
            // For short bars like Soteria, place below the name
            const barWidth = xScale(Math.min(currentYear, d.endYear)) - xScale(d.startYear);
            if (barWidth < 200) {
                return xScale(d.startYear) + 10;
            }
            // For longer bars, place at the end
            return xScale(Math.min(currentYear, d.endYear)) - 5;
        })
        .attr('y', d => {
            const barWidth = xScale(Math.min(currentYear, d.endYear)) - xScale(d.startYear);
            if (barWidth < 200) {
                return yScale(d.name) + yScale.bandwidth() / 2 + 8;
            }
            return yScale(d.name) + yScale.bandwidth() / 2;
        })
        .attr('dy', '0.35em')
        .attr('text-anchor', d => {
            const barWidth = xScale(Math.min(currentYear, d.endYear)) - xScale(d.startYear);
            return barWidth < 200 ? 'start' : 'end';
        })
        .attr('fill', d => {
            const postWarranty = Math.max(0, currentYear - d.warrantyEnd);
            return postWarranty > 0 ? colors.aging : colors.warranty;
        })
        .attr('font-size', '10px')
        .attr('font-weight', 500)
        .text(d => {
            const age = currentYear - d.startYear;
            const postWarranty = Math.max(0, currentYear - d.warrantyEnd);
            if (currentYear > d.endYear) return 'Retired';
            if (d.name === 'El Gato') return `${age}y old (${postWarranty}y post-warranty, no GPUs)`;
            return postWarranty > 0 ? `${age}y old (${postWarranty}y post-warranty)` : `${age}y old (in warranty)`;
        });

    // Current year indicator
    g.append('line')
        .attr('x1', xScale(currentYear))
        .attr('x2', xScale(currentYear))
        .attr('y1', -20)
        .attr('y2', innerHeight)
        .attr('stroke', colors.industry)
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5')
        .attr('opacity', 0.7);

    g.append('text')
        .attr('x', xScale(currentYear))
        .attr('y', -25)
        .attr('text-anchor', 'middle')
        .attr('fill', colors.industry)
        .attr('font-size', '12px')
        .text('Current (2025)');

    // Legend
    const legend = g.append('g')
        .attr('transform', `translate(0, ${innerHeight + 40})`);

    const legendItems = [
        { label: 'Under Warranty', color: colors.warranty, opacity: 0.9 },
        { label: 'Post-Warranty (Aging)', color: colors.aging, opacity: 0.7 },
        { label: 'Planned Lifetime', color: '#999', opacity: 0.15 }
    ];

    legendItems.forEach((item, i) => {
        const legendItem = legend.append('g')
            .attr('transform', `translate(${i * 180}, 0)`);

        legendItem.append('rect')
            .attr('width', 20)
            .attr('height', 12)
            .attr('fill', item.color)
            .attr('opacity', item.opacity)
            .attr('rx', 3);

        legendItem.append('text')
            .attr('x', 25)
            .attr('y', 6)
            .attr('dy', '0.35em')
            .attr('fill', colors.text)
            .attr('font-size', '12px')
            .text(item.label);
    });

    // Hover effects
    bars
        .on('mouseover', function(event, d) {
            const age = currentYear - d.startYear;
            const warrantyYears = d.warrantyEnd - d.startYear;
            const postWarranty = Math.max(0, currentYear - d.warrantyEnd);

            const content = `
                <strong>${d.name}</strong><br/>
                ${d.description}<br/>
                <hr style="margin: 5px 0; border-color: rgba(255,255,255,0.2)">
                Deployed: ${d.startYear}<br/>
                Current Age: ${age} years<br/>
                Warranty Period: ${warrantyYears} years<br/>
                Post-Warranty: ${postWarranty} years<br/>
                <hr style="margin: 5px 0; border-color: rgba(255,255,255,0.2)">
                Nodes: ${d.nodes}<br/>
                CPU Cores: ${formatNumber(d.cores)} (${d.coresPerNode}/node)<br/>
                Memory: ${d.memory} TB<br/>
                ${d.gpus ? `GPUs: ${d.gpus} (${d.gpuTFLOPS} TFLOPS)` : 'No GPUs (K40/K80 removed April 2022)'}
            `;
            showTooltip(event, content);
        })
        .on('mouseout', hideTooltip);
}

// 2. Enhanced CPU Performance with Gap Analysis
function createPerformanceGapVisualization() {
    // Extended industry data through 2030
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
        { year: 2020, cores: 96 },
        { year: 2021, cores: 128 },
        { year: 2022, cores: 192 },
        { year: 2023, cores: 256 },
        { year: 2024, cores: 384 },
        { year: 2025, cores: 512 },
        { year: 2026, cores: 640 },
        { year: 2027, cores: 768 },
        { year: 2028, cores: 896 },
        { year: 2029, cores: 1024 },
        { year: 2030, cores: 1280 }
    ];

    // UA systems with their effective performance over time
    const uaSystems = [
        {
            name: 'El Gato',
            deployYear: 2013,
            retireYear: 2026,  // Still active in 2025
            cores: 16,
            color: colors.elgato
        },
        {
            name: 'Ocelote',
            deployYear: 2016,
            retireYear: 2025,
            cores: 28,
            color: colors.ocelote
        },
        {
            name: 'Puma',
            deployYear: 2020,
            retireYear: 2028,
            cores: 94,
            color: colors.puma
        },
        {
            name: 'Soteria',
            deployYear: 2023,
            retireYear: 2030,
            cores: 94,
            color: colors.soteria
        }
    ];

    // Calculate UA average cores per year
    const uaAverageData = [];
    for (let year = 2013; year <= 2030; year++) {
        const activeSystems = uaSystems.filter(s => year >= s.deployYear && year <= s.retireYear);
        if (activeSystems.length > 0) {
            const avgCores = activeSystems.reduce((sum, s) => sum + s.cores, 0) / activeSystems.length;
            const weightedAvg = activeSystems.reduce((sum, s) => {
                const age = year - s.deployYear;
                const weight = age < 5 ? 1 : Math.max(0.5, 1 - (age - 5) * 0.1);
                return sum + s.cores * weight;
            }, 0) / activeSystems.length;

            uaAverageData.push({
                year,
                cores: avgCores,
                effectiveCores: weightedAvg,
                systems: activeSystems.map(s => s.name).join(', ')
            });
        }
    }

    const container = d3.select('#performance-viz');
    container.selectAll('*').remove();

    const width = container.node().getBoundingClientRect().width;
    const height = 550;
    const margin = { top: 40, right: 150, bottom: 100, left: 80 };
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
        .domain([2013, 2030])
        .range([0, innerWidth]);

    const yScale = d3.scaleLog()
        .domain([10, 2000])
        .range([innerHeight, 0]);

    // Grid
    const yGrid = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickFormat('')
        .tickValues([10, 20, 50, 100, 200, 500, 1000]);

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
        .call(d3.axisLeft(yScale).tickValues([10, 20, 50, 100, 200, 500, 1000]));

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
        .attr('y', innerHeight + 55)
        .attr('text-anchor', 'middle')
        .attr('fill', colors.text)
        .text('Year');

    // Gap area between industry and UA average
    const areaGenerator = d3.area()
        .x(d => xScale(d.year))
        .y0(d => {
            const uaPoint = uaAverageData.find(u => u.year === d.year);
            return uaPoint ? yScale(uaPoint.effectiveCores) : innerHeight;
        })
        .y1(d => yScale(d.cores))
        .curve(d3.curveMonotoneX);

    const gapData = industryData.filter(d => d.year >= 2013);

    g.append('path')
        .datum(gapData)
        .attr('fill', colors.gap)
        .attr('opacity', 0.2)
        .attr('d', areaGenerator);

    // Industry trend line
    const industryLine = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.cores))
        .curve(d3.curveMonotoneX);

    g.append('path')
        .datum(industryData.filter(d => d.year >= 2013))
        .attr('fill', 'none')
        .attr('stroke', colors.industry)
        .attr('stroke-width', 3)
        .attr('opacity', 0.9)
        .attr('d', industryLine);

    // UA average line
    const uaAvgLine = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.cores))
        .curve(d3.curveMonotoneX);

    g.append('path')
        .datum(uaAverageData)
        .attr('fill', 'none')
        .attr('stroke', '#FF69B4')
        .attr('stroke-width', 3)
        .attr('stroke-dasharray', '5,3')
        .attr('d', uaAvgLine);

    // UA effective performance line (accounting for aging)
    const uaEffectiveLine = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.effectiveCores))
        .curve(d3.curveMonotoneX);

    g.append('path')
        .datum(uaAverageData)
        .attr('fill', 'none')
        .attr('stroke', '#FF1493')
        .attr('stroke-width', 2)
        .attr('d', uaEffectiveLine);

    // Individual UA system bars showing their active periods
    uaSystems.forEach(system => {
        const systemG = g.append('g');

        // Active period bar
        systemG.append('rect')
            .attr('x', xScale(system.deployYear))
            .attr('y', yScale(system.cores) - 2)
            .attr('width', xScale(system.retireYear) - xScale(system.deployYear))
            .attr('height', 4)
            .attr('fill', system.color)
            .attr('opacity', 0.6);

        // Deployment point
        systemG.append('circle')
            .attr('cx', xScale(system.deployYear))
            .attr('cy', yScale(system.cores))
            .attr('r', 6)
            .attr('fill', system.color)
            .attr('stroke', '#ffffff')
            .attr('stroke-width', 2);

        // System label
        systemG.append('text')
            .attr('x', xScale(system.deployYear))
            .attr('y', yScale(system.cores) - 10)
            .attr('text-anchor', 'middle')
            .attr('fill', system.color)
            .attr('font-size', '11px')
            .attr('font-weight', 600)
            .text(system.name);
    });

    // Current year line
    const currentYear = 2025;
    g.append('line')
        .attr('x1', xScale(currentYear))
        .attr('x2', xScale(currentYear))
        .attr('y1', 0)
        .attr('y2', innerHeight)
        .attr('stroke', colors.text)
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '3,3')
        .attr('opacity', 0.5);

    // Performance gap annotation
    const currentIndustry = industryData.find(d => d.year === currentYear);
    const currentUA = uaAverageData.find(d => d.year === currentYear);

    if (currentIndustry && currentUA) {
        const gapMultiplier = (currentIndustry.cores / currentUA.effectiveCores).toFixed(1);

        g.append('text')
            .attr('x', xScale(currentYear) + 10)
            .attr('y', (yScale(currentIndustry.cores) + yScale(currentUA.effectiveCores)) / 2)
            .attr('fill', colors.gap)
            .attr('font-size', '14px')
            .attr('font-weight', 700)
            .text(`${gapMultiplier}× Gap`);
    }

    // Legend (moved to top left)
    const legend = g.append('g')
        .attr('transform', `translate(10, 10)`);

    // Add semi-transparent background for legend
    const legendBg = legend.append('rect')
        .attr('x', -5)
        .attr('y', -5)
        .attr('width', 220)
        .attr('height', 110)
        .attr('fill', 'white')
        .attr('opacity', 0.9)
        .attr('rx', 5)
        .attr('stroke', '#e2e8f0')
        .attr('stroke-width', 1);

    const legendItems = [
        { label: 'Typical Dual-Socket Server', color: colors.industry, dash: null, width: 3 },
        { label: 'UA Average', color: '#FF69B4', dash: '5,3', width: 3 },
        { label: 'UA Effective (aged)', color: '#FF1493', dash: null, width: 2 },
        { label: 'Performance Gap', color: colors.gap, dash: null, width: 0 }
    ];

    legendItems.forEach((item, i) => {
        const y = i * 25;

        if (item.width > 0) {
            legend.append('line')
                .attr('x1', 0)
                .attr('x2', 25)
                .attr('y1', y)
                .attr('y2', y)
                .attr('stroke', item.color)
                .attr('stroke-width', item.width)
                .attr('stroke-dasharray', item.dash);
        } else {
            legend.append('rect')
                .attr('x', 0)
                .attr('y', y - 8)
                .attr('width', 25)
                .attr('height', 16)
                .attr('fill', item.color)
                .attr('opacity', 0.3);
        }

        legend.append('text')
            .attr('x', 30)
            .attr('y', y)
            .attr('dy', '0.35em')
            .attr('fill', colors.text)
            .attr('font-size', '11px')
            .text(item.label);
    });

    // Add footnote explaining industry standard
    g.append('text')
        .attr('x', 0)
        .attr('y', innerHeight + 70)
        .attr('fill', colors.text)
        .attr('font-size', '10px')
        .attr('opacity', 0.7)
        .text('* "Typical Dual-Socket Server" = Mainstream server CPUs (Intel Xeon/AMD EPYC) available for purchase each year');
}

// 3. GPU FLOPS Comparison with Industry Trends (Matching CPU Chart Style)
function createGPUComparisonVisualization() {
    // Extended industry GPU evolution (TFLOPS per GPU)
    const industryGPUData = [
        { year: 2013, model: 'K40', tflops: 4.3 },
        { year: 2014, model: 'K80', tflops: 8.7 },
        { year: 2015, model: 'M40', tflops: 6.8 },
        { year: 2016, model: 'P100', tflops: 10.6 },
        { year: 2017, model: 'V100', tflops: 15.7 },
        { year: 2018, model: 'V100S', tflops: 16.4 },
        { year: 2019, model: 'V100S', tflops: 16.4 },
        { year: 2020, model: 'A100', tflops: 19.5 },
        { year: 2021, model: 'A100', tflops: 19.5 },
        { year: 2022, model: 'H100', tflops: 67 },
        { year: 2023, model: 'H200', tflops: 67 },
        { year: 2024, model: 'H200', tflops: 67 },
        { year: 2025, model: 'B200', tflops: 90 },
        { year: 2026, model: 'B200', tflops: 110 },
        { year: 2027, model: 'Next-Gen', tflops: 150 },
        { year: 2028, model: 'Next-Gen', tflops: 200 },
        { year: 2029, model: 'Future', tflops: 250 },
        { year: 2030, model: 'Future', tflops: 300 }
    ];

    // UA GPU deployments (corrected data from documentation)
    const uaGPUData = [
        {
            year: 2016,
            system: 'Ocelote',
            model: 'P100',
            count: 95,
            tflopsPerGPU: 10.6,
            totalTFLOPS: 1007,  // 95 * 10.6 = 1007
            retireYear: 2025,
            color: colors.ocelote
        },
        {
            year: 2020,
            system: 'Puma',
            model: 'V100S/A100',
            count: 60,  // 48 V100S + 12 A100 MIG slices
            tflopsPerGPU: 15.7,  // Average
            totalTFLOPS: 942,  // From documentation
            retireYear: 2028,
            color: colors.puma
        },
        {
            year: 2023,
            system: 'Soteria',
            model: 'V100',
            count: 8,
            tflopsPerGPU: 15.7,
            totalTFLOPS: 126,  // 8 * 15.7 = 125.6
            retireYear: 2030,
            color: colors.soteria
        }
    ];

    // Calculate UA average GPU performance over time (similar to CPU chart)
    const uaGPUAverage = [];
    for (let year = 2013; year <= 2030; year++) {
        const activeSystems = uaGPUData.filter(s => year >= s.year && year <= s.retireYear);
        if (activeSystems.length > 0) {
            // Average TFLOPS per GPU across active systems
            const avgTflopsPerGPU = activeSystems.reduce((sum, s) => sum + s.tflopsPerGPU, 0) / activeSystems.length;

            // Effective performance accounting for aging
            const effectiveTflopsPerGPU = activeSystems.reduce((sum, s) => {
                const age = year - s.year;
                const effectiveness = age < 5 ? 1 : Math.max(0.5, 1 - (age - 5) * 0.1);
                return sum + s.tflopsPerGPU * effectiveness;
            }, 0) / activeSystems.length;

            uaGPUAverage.push({
                year,
                avgPerGPU: avgTflopsPerGPU,
                effectivePerGPU: effectiveTflopsPerGPU,
                systems: activeSystems.map(s => s.system).join(', ')
            });
        }
    }

    const container = d3.select('#gpu-evolution-viz');
    container.selectAll('*').remove();

    const width = container.node().getBoundingClientRect().width;
    const height = 550;
    const margin = { top: 40, right: 150, bottom: 100, left: 80 };
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
        .domain([2013, 2030])
        .range([0, innerWidth]);

    const yScale = d3.scaleLog()
        .domain([3, 500])
        .range([innerHeight, 0]);

    // Grid
    const yGrid = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickFormat('')
        .tickValues([3, 5, 10, 20, 50, 100, 200, 500]);

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
        .call(d3.axisLeft(yScale)
            .tickValues([3, 5, 10, 20, 50, 100, 200, 500])
            .tickFormat(d => d));

    // Axis labels
    g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -50)
        .attr('x', -innerHeight / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', colors.text)
        .text('TFLOPS per GPU (log scale)');

    g.append('text')
        .attr('x', innerWidth / 2)
        .attr('y', innerHeight + 55)
        .attr('text-anchor', 'middle')
        .attr('fill', colors.text)
        .text('Year');

    // Gap area between industry and UA average (RED like CPU chart)
    const areaGenerator = d3.area()
        .x(d => xScale(d.year))
        .y0(d => {
            const uaPoint = uaGPUAverage.find(u => u.year === d.year);
            return uaPoint ? yScale(uaPoint.effectivePerGPU) : innerHeight;
        })
        .y1(d => yScale(d.tflops))
        .curve(d3.curveMonotoneX);

    const gapData = industryGPUData.filter(d => d.year >= 2016);

    g.append('path')
        .datum(gapData)
        .attr('fill', colors.gap)
        .attr('opacity', 0.2)
        .attr('d', areaGenerator);

    // Industry trend line
    const industryLine = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.tflops))
        .curve(d3.curveMonotoneX);

    g.append('path')
        .datum(industryGPUData.filter(d => d.year >= 2013))
        .attr('fill', 'none')
        .attr('stroke', colors.industry)
        .attr('stroke-width', 3)
        .attr('opacity', 0.9)
        .attr('d', industryLine);

    // UA average line
    const uaAvgLine = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.avgPerGPU))
        .curve(d3.curveMonotoneX);

    g.append('path')
        .datum(uaGPUAverage)
        .attr('fill', 'none')
        .attr('stroke', '#FF69B4')
        .attr('stroke-width', 3)
        .attr('stroke-dasharray', '5,3')
        .attr('d', uaAvgLine);

    // UA effective performance line (accounting for aging)
    const uaEffectiveLine = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.effectivePerGPU))
        .curve(d3.curveMonotoneX);

    g.append('path')
        .datum(uaGPUAverage)
        .attr('fill', 'none')
        .attr('stroke', '#FF1493')
        .attr('stroke-width', 2)
        .attr('d', uaEffectiveLine);

    // Individual UA system bars showing their active periods
    uaGPUData.forEach(system => {
        const systemG = g.append('g');

        // Active period bar
        systemG.append('rect')
            .attr('x', xScale(system.year))
            .attr('y', yScale(system.tflopsPerGPU) - 2)
            .attr('width', xScale(system.retireYear) - xScale(system.year))
            .attr('height', 4)
            .attr('fill', system.color)
            .attr('opacity', 0.6);

        // Deployment point
        systemG.append('circle')
            .attr('cx', xScale(system.year))
            .attr('cy', yScale(system.tflopsPerGPU))
            .attr('r', 6)
            .attr('fill', system.color)
            .attr('stroke', '#ffffff')
            .attr('stroke-width', 2);

        // System label
        systemG.append('text')
            .attr('x', xScale(system.year))
            .attr('y', yScale(system.tflopsPerGPU) - 10)
            .attr('text-anchor', 'middle')
            .attr('fill', system.color)
            .attr('font-size', '11px')
            .attr('font-weight', 600)
            .text(system.system);
    });

    // Current year line
    const currentYear = 2025;
    g.append('line')
        .attr('x1', xScale(currentYear))
        .attr('x2', xScale(currentYear))
        .attr('y1', 0)
        .attr('y2', innerHeight)
        .attr('stroke', colors.text)
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '3,3')
        .attr('opacity', 0.5);

    // Performance gap annotation
    const currentIndustry = industryGPUData.find(d => d.year === currentYear);
    const currentUA = uaGPUAverage.find(d => d.year === currentYear);

    if (currentIndustry && currentUA) {
        const gapMultiplier = (currentIndustry.tflops / currentUA.effectivePerGPU).toFixed(1);

        g.append('text')
            .attr('x', xScale(currentYear) + 10)
            .attr('y', (yScale(currentIndustry.tflops) + yScale(currentUA.effectivePerGPU)) / 2)
            .attr('fill', colors.gap)
            .attr('font-size', '14px')
            .attr('font-weight', 700)
            .text(`${gapMultiplier}× Gap`);
    }

    // Legend (matching CPU chart style, moved to top left)
    const legend = g.append('g')
        .attr('transform', `translate(10, 10)`);

    // Add semi-transparent background for legend
    const legendBg = legend.append('rect')
        .attr('x', -5)
        .attr('y', -5)
        .attr('width', 200)
        .attr('height', 110)
        .attr('fill', 'white')
        .attr('opacity', 0.9)
        .attr('rx', 5)
        .attr('stroke', '#e2e8f0')
        .attr('stroke-width', 1);

    const legendItems = [
        { label: 'Leading Datacenter GPU', color: colors.industry, dash: null, width: 3 },
        { label: 'UA Average', color: '#FF69B4', dash: '5,3', width: 3 },
        { label: 'UA Effective (aged)', color: '#FF1493', dash: null, width: 2 },
        { label: 'Performance Gap', color: colors.gap, dash: null, width: 0 }
    ];

    legendItems.forEach((item, i) => {
        const y = i * 25;

        if (item.width > 0) {
            legend.append('line')
                .attr('x1', 0)
                .attr('x2', 25)
                .attr('y1', y)
                .attr('y2', y)
                .attr('stroke', item.color)
                .attr('stroke-width', item.width)
                .attr('stroke-dasharray', item.dash);
        } else {
            legend.append('rect')
                .attr('x', 0)
                .attr('y', y - 8)
                .attr('width', 25)
                .attr('height', 16)
                .attr('fill', item.color)
                .attr('opacity', 0.3);
        }

        legend.append('text')
            .attr('x', 30)
            .attr('y', y)
            .attr('dy', '0.35em')
            .attr('fill', colors.text)
            .attr('font-size', '11px')
            .text(item.label);
    });

    // Add footnote explaining industry standard
    g.append('text')
        .attr('x', 0)
        .attr('y', innerHeight + 70)
        .attr('fill', colors.text)
        .attr('font-size', '10px')
        .attr('opacity', 0.7)
        .text('* "Leading Datacenter GPU" = Top NVIDIA datacenter GPU (Tesla/A100/H100/B200) available for purchase each year');
}

// 5. UA vs ASU vs NAU Comparison Visualization
function createUAvsASUComparison() {
    // UA broken down by system (current, 2025)
    const uaElGato = {
        name: 'El Gato',
        shortName: 'El Gato',
        cpuCores: 1888,
        gpus: 0,
        gpuCores: 0,
        memory: 23.5,  // TB
        fplopsFP32: 0,  // PFLOPS (no GPUs)
        fplopsTensor: 0,  // PFLOPS
        color: colors.elgato,
        year: 2013,
        warrantyEnd: 2018,
        postWarranty: 7,
        isUA: true
    };

    const uaOcelote = {
        name: 'Ocelote',
        shortName: 'Ocelote',
        cpuCores: 11724,
        gpus: 95,
        gpuCores: 340480,  // 95 × 3,584 (P100)
        memory: 83.3,  // TB
        fplopsFP32: 1.01,  // PFLOPS
        fplopsTensor: 2.01,  // PFLOPS
        color: colors.ocelote,
        year: 2016,
        warrantyEnd: 2021,
        postWarranty: 4,
        isUA: true
    };

    const uaPuma = {
        name: 'Puma',
        shortName: 'Puma',
        cpuCores: 29512,
        gpus: 60,
        gpuCores: 348160,  // 60 × 5,120 (V100S) + MIG slices
        memory: 169.7,  // TB
        fplopsFP32: 0.942,  // PFLOPS
        fplopsTensor: 7.5,  // PFLOPS
        color: colors.puma,
        year: 2020,
        warrantyEnd: 2025,
        postWarranty: 0,
        isUA: true
    };

    const uaSoteria = {
        name: 'Soteria',
        shortName: 'Soteria',
        cpuCores: 564,
        gpus: 8,
        gpuCores: 40960,  // 8 × 5,120 (V100)
        memory: 3,  // TB
        fplopsFP32: 0.126,  // PFLOPS
        fplopsTensor: 1.0,  // PFLOPS
        color: colors.soteria,
        year: 2023,
        warrantyEnd: 2028,
        postWarranty: 0,
        isUA: true
    };

    // UA totals (for reference/fallback)
    const uaData = {
        name: 'University of Arizona',
        shortName: 'UA',
        cpuCores: 43688,
        gpus: 163,
        gpuCores: 729600,
        memory: 279.5,  // TB (23.5 + 83.3 + 169.7 + 3)
        storage: null,  // PB - not publicly documented
        fplopsFP32: 2.078,  // PFLOPS
        fplopsTensor: 10.51,  // PFLOPS
        color: '#0c5aa6',
        systems: [uaPuma, uaOcelote, uaElGato, uaSoteria],
        isUA: true
    };

    // CyVerse UA totals (June 2023 - Updated)
    // Clusters: Vice/K8s (44 nodes, 3676 cores, 14TB RAM), Tombstone (25 nodes, 504 cores, 6.25TB RAM), iRODS (38 nodes, 680 cores, 10TB RAM)
    // GPU inventory: 12x GTX 1080 Ti, 8x RTX 2080, 5x Tesla T4, 4x A100 80GB, 26x A16, 4x L40s = 59 total GPUs
    // GPU Performance calculations:
    // - GTX 1080 Ti: 12 × 11.3 TFLOPS FP32 = 135.6 TFLOPS
    // - RTX 2080: 8 × 10.1 TFLOPS FP32 = 80.8 TFLOPS
    // - Tesla T4: 5 × 8.1 TFLOPS FP32 = 40.5 TFLOPS
    // - A100 80GB PCIe: 4 × 19.5 TFLOPS FP32 = 78 TFLOPS, 4 × 312 TFLOPS Tensor = 1248 TFLOPS
    // - A16: 26 × 8.0 TFLOPS FP32 = 208 TFLOPS, 26 × 32 TFLOPS Tensor = 832 TFLOPS
    // - L40s: 4 × 91.6 TFLOPS FP32 = 366.4 TFLOPS, 4 × 362 TFLOPS Tensor = 1448 TFLOPS
    // Total FP32: ~909.3 TFLOPS = 0.909 PFLOPS
    // Total Tensor: ~3528 TFLOPS = 3.528 PFLOPS
    // GPU Cores calculation:
    // - 12× GTX 1080 Ti: 12 × 3,584 = 43,008 cores
    // - 8× RTX 2080: 8 × 2,944 = 23,552 cores
    // - 5× Tesla T4: 5 × 2,560 = 12,800 cores
    // - 4× A100 80GB: 4 × 6,912 = 27,648 cores
    // - 26× A16: 26 × 2,560 = 66,560 cores
    // - 4× L40s: 4 × 18,176 = 72,704 cores
    // Total: 246,272 GPU cores
    const cyverseData = {
        name: 'CyVerse (UA)',
        shortName: 'CyVerse',
        cpuCores: 4860,  // 3676 + 504 + 680
        gpus: 59,  // Total GPU count: 12 + 8 + 5 + 4 + 26 + 4
        gpuCores: 246272,
        memory: 30.25,  // 14 + 6.25 + 10 = 30.25 TB
        storage: 10.7,  // PB: 8.18 PB iRODS + 2.1 PB OSN + 0.6 PB other
        fplopsFP32: 0.909,  // PFLOPS
        fplopsTensor: 3.528,  // PFLOPS
        color: '#00B4D8',  // CyVerse blue
        systems: [
            { name: 'Vice/K8s', cores: 3676, gpus: 21 },
            { name: 'Tombstone', cores: 504, gpus: 0 },
            { name: 'iRODS', cores: 680, gpus: 0 }
        ]
    };

    // ASU totals (current, 2025)
    // GPU Cores calculation:
    // - 224× A100 80GB: 224 × 6,912 = 1,548,288 cores
    // - 15× A30: 15 × 3,584 = 53,760 cores
    // - 10× H100: 10 × 16,896 = 168,960 cores
    // - 1× GH200: 1 × 16,896 = 16,896 cores
    // - 2× MI200: 2 × 7,680 = 15,360 cores
    // - 360× V100: 360 × 5,120 = 1,843,200 cores
    // Total: ~3,646,464 GPU cores
    // Storage: 4 PB BeeGFS + 2 PB PowerScale + 10 PB Network + 2 PB Home = 18 PB
    const asuData = {
        name: 'Arizona State University',
        shortName: 'ASU',
        cpuCores: 39900,
        gpus: 632,
        gpuCores: 3646464,
        memory: 203,  // TB
        storage: 18,  // PB: 4 PB BeeGFS + 2 PB PowerScale + 10 PB Network + 2 PB Home
        fplopsFP32: 12,  // PFLOPS
        fplopsTensor: 150,  // PFLOPS
        color: '#8C1D40',  // ASU Maroon
        systems: [
            { name: 'Sol', cores: 21000, gpus: 252, year: 2022 },
            { name: 'Phoenix/Agave', cores: 17200, gpus: 360, year: 2018 },
            { name: 'Secure HPC', cores: 1700, gpus: 20, year: 2022 }
        ]
    };

    // NAU totals (current, 2025)
    // GPU Cores calculation:
    // - 4× V100-SXM2 16GB: 4 × 5,120 = 20,480 cores
    // - 4× A100 40GB: 4 × 6,912 = 27,648 cores
    // - 12× K80: 12 × 2,496 = 29,952 cores
    // - 4× P100-PCIE 16GB: 4 × 3,584 = 14,336 cores
    // Total: 92,416 GPU cores
    // Storage: 2.3 PB (Lustre scratch + ZFS project)
    const nauData = {
        name: 'Northern Arizona University',
        shortName: 'NAU',
        cpuCores: 5940,
        gpus: 24,
        gpuCores: 92416,
        memory: 14,  // TB (approximate)
        storage: 2.3,  // PB: Lustre scratch + ZFS project
        fplopsFP32: 0.288,  // PFLOPS
        fplopsTensor: 1.75,  // PFLOPS
        color: '#1B4F93',  // NAU Blue
        systems: [
            { name: 'Monsoon CPU', cores: 5768, gpus: 0, year: 2020 },
            { name: 'Monsoon GPU', cores: 172, gpus: 24, year: 2020 }
        ]
    };

    const container = d3.select('#ua-asu-comparison-viz');
    container.selectAll('*').remove();

    const width = container.node().getBoundingClientRect().width;
    const height = 1150;  // Adjusted for 3 rows instead of 4
    const margin = { top: 40, right: 40, bottom: 180, left: 140 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = container
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Metrics to compare
    const metrics = [
        { key: 'cpuCores', label: 'CPU Cores', format: d => formatNumber(d), scale: 'linear' },
        { key: 'gpus', label: 'Total GPUs', format: d => formatNumber(d), scale: 'linear' },
        { key: 'gpuCores', label: 'GPU Cores', format: d => formatNumber(d), scale: 'linear' },
        { key: 'memory', label: 'System Memory (TB)', format: d => d + ' TB', scale: 'linear' },
        { key: 'storage', label: 'Total Storage (PB)', format: d => d ? d.toFixed(1) + ' PB' : 'N/A', scale: 'linear' },
        { key: 'fplopsFP32', label: 'GPU FP32 (PFLOPS)', format: d => d.toFixed(1) + ' PF', scale: 'linear' },
        { key: 'fplopsTensor', label: 'AI/Tensor (PFLOPS)', format: d => d.toFixed(1) + ' PF', scale: 'linear' }
    ];

    const barHeight = 30;
    const barSpacing = 4;
    const groupSpacing = 25;
    const universities = [asuData, nauData];
    const uaSystems = [uaPuma, uaOcelote, uaElGato, uaSoteria, cyverseData];

    // Calculate combined UA totals (HPC + CyVerse)
    const uaCombinedData = {
        cpuCores: uaData.cpuCores + cyverseData.cpuCores,
        gpus: uaData.gpus + cyverseData.gpus,
        gpuCores: uaData.gpuCores + cyverseData.gpuCores,
        memory: uaData.memory + cyverseData.memory,
        storage: (uaData.storage || 0) + (cyverseData.storage || 0),
        fplopsFP32: uaData.fplopsFP32 + cyverseData.fplopsFP32,
        fplopsTensor: uaData.fplopsTensor + cyverseData.fplopsTensor
    };

    // Y positions for each metric
    metrics.forEach((metric, i) => {
        const yPos = i * (barHeight * 3 + barSpacing * 2 + groupSpacing);

        // Get max value for this metric to scale bars
        const maxValue = Math.max(
            uaCombinedData[metric.key] || 0,
            asuData[metric.key] || 0,
            nauData[metric.key] || 0
        );
        const xScale = d3.scaleLinear()
            .domain([0, maxValue * 1.1])
            .range([0, innerWidth - 200]);

        // Metric label
        g.append('text')
            .attr('x', -10)
            .attr('y', yPos + barHeight * 1)
            .attr('text-anchor', 'end')
            .attr('fill', colors.text)
            .attr('font-size', '13px')
            .attr('font-weight', 600)
            .text(metric.label);

        // Draw UA stacked bar (first bar) - systems stacked horizontally including CyVerse
        const uaBarY = yPos;
        const uaBarGroup = g.append('g');

        let xOffset = 0;
        uaSystems.forEach((system, sysIndex) => {
            const value = system[metric.key] || 0;
            const barWidth = xScale(value);

            if (value > 0) {
                const isPostWarranty = system.postWarranty > 0;
                const isCyVerse = system.shortName === 'CyVerse';

                // Individual system segment
                const segment = uaBarGroup.append('rect')
                    .attr('x', xOffset)
                    .attr('y', uaBarY)
                    .attr('width', barWidth)
                    .attr('height', barHeight)
                    .attr('fill', system.color)
                    .attr('opacity', isPostWarranty ? 0.6 : 0.8)
                    .attr('stroke', isPostWarranty ? colors.aging : '#ffffff')
                    .attr('stroke-width', isPostWarranty ? 2 : 1)
                    .attr('stroke-dasharray', isPostWarranty ? '4,2' : 'none')
                    .on('mouseover', function(event) {
                        d3.select(this).attr('opacity', 1);
                        const displayValue = value > 0 ? metric.format(value) : 'N/A';
                        const percentage = ((value / (uaCombinedData[metric.key] || 1)) * 100).toFixed(1);
                        let tooltipContent = `
                            <strong>${system.shortName} (UA) ${metric.label}</strong><br/>
                            ${displayValue} (${percentage}% of UA total)<br/>
                            <hr style="margin: 5px 0; border-color: rgba(255,255,255,0.2)">
                        `;
                        if (isCyVerse) {
                            tooltipContent += `Type: Cloud/Data Infrastructure`;
                        } else {
                            const warrantyStat = isPostWarranty
                                ? `${system.postWarranty}y post-warranty`
                                : 'In warranty';
                            tooltipContent += `Year: ${system.year}<br/>Status: ${warrantyStat}`;
                        }
                        showTooltip(event, tooltipContent);
                    })
                    .on('mouseout', function() {
                        d3.select(this).attr('opacity', isPostWarranty ? 0.6 : 0.8);
                        hideTooltip();
                    });

                // Add system label if segment is wide enough
                if (barWidth > 40) {
                    uaBarGroup.append('text')
                        .attr('x', xOffset + barWidth / 2)
                        .attr('y', uaBarY + barHeight / 2)
                        .attr('dy', '0.35em')
                        .attr('text-anchor', 'middle')
                        .attr('fill', '#ffffff')
                        .attr('font-size', '9px')
                        .attr('font-weight', 700)
                        .text(system.shortName);
                }

                xOffset += barWidth;
            }
        });

        // UA total label at the end
        const uaTotal = uaCombinedData[metric.key] || 0;
        if (uaTotal > 0) {
            uaBarGroup.append('text')
                .attr('x', xOffset + 8)
                .attr('y', uaBarY + barHeight / 2)
                .attr('dy', '0.35em')
                .attr('fill', colors.text)
                .attr('font-size', '11px')
                .attr('font-weight', 600)
                .text(metric.format(uaTotal));
        }

        // UA label on the left
        uaBarGroup.append('text')
            .attr('x', 5)
            .attr('y', uaBarY + barHeight / 2)
            .attr('dy', '0.35em')
            .attr('fill', '#ffffff')
            .attr('font-size', '10px')
            .attr('font-weight', 700)
            .attr('text-shadow', '0 0 3px rgba(0,0,0,0.5)')
            .text('UA');

        // Draw bars for other universities
        universities.forEach((university, uniIndex) => {
            const barY = yPos + (barHeight + barSpacing) * (uniIndex + 1);
            const barGroup = g.append('g');

            const value = university[metric.key] || 0;

            // Bar
            barGroup.append('rect')
                .attr('x', 0)
                .attr('y', barY)
                .attr('width', xScale(value))
                .attr('height', barHeight)
                .attr('fill', university.color)
                .attr('opacity', 0.8)
                .attr('rx', 4)
                .on('mouseover', function(event) {
                    d3.select(this).attr('opacity', 1);
                    const displayValue = value > 0 ? metric.format(value) : 'N/A';
                    showTooltip(event, `
                        <strong>${university.shortName} ${metric.label}</strong><br/>
                        ${displayValue}
                    `);
                })
                .on('mouseout', function() {
                    d3.select(this).attr('opacity', 0.8);
                    hideTooltip();
                });

            // Value label
            if (value > 0) {
                barGroup.append('text')
                    .attr('x', xScale(value) + 8)
                    .attr('y', barY + barHeight / 2)
                    .attr('dy', '0.35em')
                    .attr('fill', colors.text)
                    .attr('font-size', '11px')
                    .attr('font-weight', 600)
                    .text(metric.format(value));
            }

            // University label on the left side of bar
            barGroup.append('text')
                .attr('x', 5)
                .attr('y', barY + barHeight / 2)
                .attr('dy', '0.35em')
                .attr('fill', '#ffffff')
                .attr('font-size', '10px')
                .attr('font-weight', 700)
                .text(university.shortName);
        });
    });

    // Legend
    const legendY = metrics.length * (barHeight * 3 + barSpacing * 2 + groupSpacing) + 15;
    const legend = g.append('g')
        .attr('transform', `translate(0, ${legendY})`);

    // Add title for legend
    legend.append('text')
        .attr('x', 0)
        .attr('y', -10)
        .attr('fill', colors.text)
        .attr('font-size', '12px')
        .attr('font-weight', 700)
        .text('UA Resources (stacked in first bar):');

    const legendItems = [
        { label: 'Puma (2020, in warranty)', color: colors.puma, postWarranty: false },
        { label: 'Ocelote (2016, 4y post-warranty)', color: colors.ocelote, postWarranty: true },
        { label: 'El Gato (2013, 7y post-warranty)', color: colors.elgato, postWarranty: true },
        { label: 'Soteria (2023, in warranty)', color: colors.soteria, postWarranty: false },
        { label: 'CyVerse (Cloud/Data)', color: cyverseData.color, postWarranty: false }
    ];

    legendItems.forEach((item, i) => {
        const legendItem = legend.append('g')
            .attr('transform', `translate(${(i % 3) * 260}, ${Math.floor(i / 3) * 20 + 10})`);

        legendItem.append('rect')
            .attr('width', 25)
            .attr('height', 12)
            .attr('fill', item.color)
            .attr('opacity', item.postWarranty ? 0.6 : 0.8)
            .attr('stroke', item.postWarranty ? colors.aging : '#ffffff')
            .attr('stroke-width', item.postWarranty ? 2 : 1)
            .attr('stroke-dasharray', item.postWarranty ? '4,2' : 'none')
            .attr('rx', 3);

        legendItem.append('text')
            .attr('x', 30)
            .attr('y', 6)
            .attr('dy', '0.35em')
            .attr('fill', colors.text)
            .attr('font-size', '10px')
            .attr('font-weight', 600)
            .text(item.label);
    });

    // Other universities legend
    const otherLegendY = 65;
    legend.append('text')
        .attr('x', 0)
        .attr('y', otherLegendY - 10)
        .attr('fill', colors.text)
        .attr('font-size', '12px')
        .attr('font-weight', 700)
        .text('Other Arizona Universities:');

    const otherItems = [
        { label: 'Arizona State University (ASU)', color: asuData.color },
        { label: 'Northern Arizona University (NAU)', color: nauData.color }
    ];

    otherItems.forEach((item, i) => {
        const legendItem = legend.append('g')
            .attr('transform', `translate(${i * 300}, ${otherLegendY})`);

        legendItem.append('rect')
            .attr('width', 25)
            .attr('height', 12)
            .attr('fill', item.color)
            .attr('opacity', 0.8)
            .attr('rx', 3);

        legendItem.append('text')
            .attr('x', 30)
            .attr('y', 6)
            .attr('dy', '0.35em')
            .attr('fill', colors.text)
            .attr('font-size', '10px')
            .attr('font-weight', 600)
            .text(item.label);
    });

    // Add summary statistics below the legend
    const summaryY = legendY + 110;
    const summary = g.append('g')
        .attr('transform', `translate(0, ${summaryY})`);

    const totalCores = uaCombinedData.cpuCores + asuData.cpuCores + nauData.cpuCores;
    const totalGPUs = uaCombinedData.gpus + asuData.gpus + nauData.gpus;
    const totalTensor = (uaCombinedData.fplopsTensor || 0) + (asuData.fplopsTensor || 0) + (nauData.fplopsTensor || 0);

    // UA breakdown statistics
    const uaPostWarrantyCores = uaElGato.cpuCores + uaOcelote.cpuCores;
    const uaPostWarrantyGPUs = uaElGato.gpus + uaOcelote.gpus;
    const uaPostWarrantyPct = ((uaPostWarrantyCores / uaCombinedData.cpuCores) * 100).toFixed(1);
    const uaPostWarrantyGPUPct = ((uaPostWarrantyGPUs / uaCombinedData.gpus) * 100).toFixed(1);

    summary.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('fill', colors.text)
        .attr('font-size', '11px')
        .attr('font-weight', 700)
        .text(`UA Total Resources (HPC + CyVerse): ${formatNumber(uaCombinedData.cpuCores)} CPU cores, ${uaCombinedData.gpus} GPUs, ${(uaCombinedData.storage || 0).toFixed(1)} PB storage`);

    summary.append('text')
        .attr('x', 0)
        .attr('y', 20)
        .attr('fill', colors.aging)
        .attr('font-size', '10px')
        .attr('font-weight', 600)
        .text(`⚠ Post-Warranty HPC Systems: ${formatNumber(uaPostWarrantyCores)} CPU cores (${uaPostWarrantyPct}% of UA total) and ${uaPostWarrantyGPUs} GPUs (${uaPostWarrantyGPUPct}% of UA total) on El Gato & Ocelote`);

    summary.append('text')
        .attr('x', 0)
        .attr('y', 42)
        .attr('fill', colors.text)
        .attr('font-size', '10px')
        .attr('opacity', 0.7)
        .text(`Combined Arizona Universities Total: ${formatNumber(totalCores)} CPU cores, ${totalGPUs} GPUs, ${totalTensor.toFixed(1)} PFLOPS AI/Tensor performance`);
}

// 6. Peer Universities Comparison (UA vs CU Boulder vs Utah vs Texas A&M)
function createPeerUniversitiesComparison() {
    // UA HPC data
    const uaHPCData = {
        cpuCores: 43688,
        gpus: 163,
        memory: 279.5,
        fplopsFP32: 2.078,
        fplopsTensor: 10.51
    };

    // CyVerse data
    const cyverseData = {
        cpuCores: 4860,
        gpus: 59,
        memory: 30.25,
        storage: 10.7,
        fplopsFP32: 0.909,
        fplopsTensor: 3.528
    };

    // Combined UA (HPC + CyVerse)
    const uaData = {
        name: 'University of Arizona',
        shortName: 'UA',
        cpuCores: uaHPCData.cpuCores + cyverseData.cpuCores,  // 48,548
        gpus: uaHPCData.gpus + cyverseData.gpus,  // 222
        memory: uaHPCData.memory + cyverseData.memory,  // 309.75
        storage: cyverseData.storage || 10.7,  // 10.7 PB
        fplopsFP32: uaHPCData.fplopsFP32 + cyverseData.fplopsFP32,  // 2.987
        fplopsTensor: uaHPCData.fplopsTensor + cyverseData.fplopsTensor,  // 14.038
        primarySystem: 'Puma (2020) + CyVerse',
        color: '#0c5aa6'
    };

    const cuBoulderData = {
        name: 'University of Colorado Boulder',
        shortName: 'CU Boulder',
        cpuCores: 28080,
        gpus: 222,
        memory: 168,  // Recalculated: ~455 nodes with 256-2048 GB RAM
        storage: null,  // PB - PetaLibrary mentioned but capacity not documented
        fplopsFP32: 5.2,
        fplopsTensor: 58.7,
        primarySystem: 'Alpine (2021)',
        color: '#CFB87C'
    };

    const utahData = {
        name: 'University of Utah',
        shortName: 'Utah',
        cpuCores: 45000,
        gpus: 280,
        memory: 166,  // Recalculated: ~450 nodes with 128-2048 GB RAM
        storage: 28,  // PB: 28+ PB RAID
        fplopsFP32: 4.7,
        fplopsTensor: 32.5,
        primarySystem: 'Notchpeak (Multiple)',
        color: '#CC0000'
    };

    const texasAMData = {
        name: 'Texas A&M University',
        shortName: 'Texas A&M',
        cpuCores: 55000,
        gpus: 396,
        memory: 420,  // Recalculated: Grace alone ~382 TB + other clusters
        storage: 24.7,  // PB: Grace 8.3 PB + other systems
        fplopsFP32: 6.7,
        fplopsTensor: 73.8,
        primarySystem: 'Grace (2021)',
        color: '#500000'
    };

    const container = d3.select('#peer-comparison-viz');
    container.selectAll('*').remove();

    const width = container.node().getBoundingClientRect().width;
    const height = 1100;  // Increased for storage metric
    const margin = { top: 40, right: 40, bottom: 120, left: 140 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = container
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Metrics to compare
    const metrics = [
        { key: 'cpuCores', label: 'CPU Cores', format: d => formatNumber(d) },
        { key: 'gpus', label: 'Total GPUs', format: d => formatNumber(d) },
        { key: 'memory', label: 'System Memory (TB)', format: d => d + ' TB' },
        { key: 'storage', label: 'Total Storage (PB)', format: d => d ? d.toFixed(1) + ' PB' : 'N/A' },
        { key: 'fplopsFP32', label: 'GPU FP32 (PFLOPS)', format: d => d.toFixed(1) + ' PF' },
        { key: 'fplopsTensor', label: 'AI/Tensor (PFLOPS)', format: d => d.toFixed(1) + ' PF' }
    ];

    const barHeight = 30;
    const barSpacing = 4;
    const groupSpacing = 25;
    const universities = [uaData, cuBoulderData, utahData, texasAMData];

    // Y positions for each metric
    metrics.forEach((metric, i) => {
        const yPos = i * (barHeight * 4 + barSpacing * 3 + groupSpacing);

        // Get max value for this metric to scale bars
        const maxValue = Math.max(
            uaData[metric.key] || 0,
            cuBoulderData[metric.key] || 0,
            utahData[metric.key] || 0,
            texasAMData[metric.key] || 0
        );
        const xScale = d3.scaleLinear()
            .domain([0, maxValue * 1.1])
            .range([0, innerWidth - 200]);

        // Metric label
        g.append('text')
            .attr('x', -10)
            .attr('y', yPos + barHeight * 1.5)
            .attr('text-anchor', 'end')
            .attr('fill', colors.text)
            .attr('font-size', '13px')
            .attr('font-weight', 600)
            .text(metric.label);

        // Draw bars for each university
        universities.forEach((university, uniIndex) => {
            const barY = yPos + (barHeight + barSpacing) * uniIndex;
            const barGroup = g.append('g');

            const value = university[metric.key] || 0;
            const isUA = university.shortName === 'UA';

            // Bar
            barGroup.append('rect')
                .attr('x', 0)
                .attr('y', barY)
                .attr('width', xScale(value))
                .attr('height', barHeight)
                .attr('fill', university.color)
                .attr('opacity', 0.8)
                .attr('rx', 4)
                .attr('stroke', isUA ? colors.gap : 'none')
                .attr('stroke-width', isUA ? 2 : 0)
                .on('mouseover', function(event) {
                    d3.select(this).attr('opacity', 1);
                    const displayValue = value > 0 ? metric.format(value) : 'N/A';
                    showTooltip(event, `
                        <strong>${university.shortName} ${metric.label}</strong><br/>
                        ${displayValue}<br/>
                        Primary System: ${university.primarySystem}
                    `);
                })
                .on('mouseout', function() {
                    d3.select(this).attr('opacity', 0.8);
                    hideTooltip();
                });

            // Value label
            if (value > 0) {
                barGroup.append('text')
                    .attr('x', xScale(value) + 8)
                    .attr('y', barY + barHeight / 2)
                    .attr('dy', '0.35em')
                    .attr('fill', colors.text)
                    .attr('font-size', '11px')
                    .attr('font-weight', 600)
                    .text(metric.format(value));
            }

            // University label on the left side of bar
            barGroup.append('text')
                .attr('x', 5)
                .attr('y', barY + barHeight / 2)
                .attr('dy', '0.35em')
                .attr('fill', '#ffffff')
                .attr('font-size', '10px')
                .attr('font-weight', 700)
                .text(university.shortName);
        });
    });

    // Legend
    const legendY = metrics.length * (barHeight * 4 + barSpacing * 3 + groupSpacing) + 15;
    const legend = g.append('g')
        .attr('transform', `translate(0, ${legendY})`);

    const legendItems = [
        { label: 'University of Arizona', color: uaData.color, isUA: true },
        { label: 'CU Boulder', color: cuBoulderData.color, isUA: false },
        { label: 'University of Utah', color: utahData.color, isUA: false },
        { label: 'Texas A&M University', color: texasAMData.color, isUA: false }
    ];

    legendItems.forEach((item, i) => {
        const legendItem = legend.append('g')
            .attr('transform', `translate(${i * 200}, ${Math.floor(i / 2) * 20})`);

        legendItem.append('rect')
            .attr('width', 25)
            .attr('height', 12)
            .attr('fill', item.color)
            .attr('opacity', 0.8)
            .attr('stroke', item.isUA ? colors.gap : 'none')
            .attr('stroke-width', item.isUA ? 2 : 0)
            .attr('rx', 3);

        legendItem.append('text')
            .attr('x', 30)
            .attr('y', 6)
            .attr('dy', '0.35em')
            .attr('fill', colors.text)
            .attr('font-size', '10px')
            .attr('font-weight', item.isUA ? 700 : 600)
            .text(item.label);
    });

    // Add comparative analysis
    const analysisY = legendY + 50;
    const analysis = g.append('g')
        .attr('transform', `translate(0, ${analysisY})`);

    const peerAvgCores = (cuBoulderData.cpuCores + utahData.cpuCores + texasAMData.cpuCores) / 3;
    const peerAvgGPUs = (cuBoulderData.gpus + utahData.gpus + texasAMData.gpus) / 3;
    const peerAvgTensor = (cuBoulderData.fplopsTensor + utahData.fplopsTensor + texasAMData.fplopsTensor) / 3;

    const coreDiff = ((uaData.cpuCores / peerAvgCores - 1) * 100).toFixed(0);
    const gpuDiff = ((uaData.gpus / peerAvgGPUs - 1) * 100).toFixed(0);
    const tensorDiff = ((uaData.fplopsTensor / peerAvgTensor - 1) * 100).toFixed(0);

    analysis.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('fill', colors.text)
        .attr('font-size', '11px')
        .attr('font-weight', 600)
        .text(`UA vs. Peer Average: CPU Cores ${coreDiff > 0 ? '+' : ''}${coreDiff}%, GPUs ${gpuDiff}%, AI Performance ${tensorDiff}%`);

    analysis.append('text')
        .attr('x', 0)
        .attr('y', 20)
        .attr('fill', colors.text)
        .attr('font-size', '10px')
        .attr('opacity', 0.7)
        .text(`Peer institutions: CU Boulder (Alpine 2021), University of Utah (Notchpeak+), Texas A&M (Grace 2021)`);
}

// 7. UA vs ACCESS-CI (Jetstream2 & TACC) GPU/AI Resources Comparison
function createACCESSCIComparison() {
    // UA Total GPU resources (HPC + CyVerse)
    const uaData = {
        name: 'University of Arizona',
        shortName: 'UA Total',
        gpus: 222,  // 163 HPC + 59 CyVerse
        gpuTypes: 'P100, V100, V100S, A100 MIG, GTX 1080 Ti, RTX 2080, T4, A100, A16, L40s',
        fplopsFP32: 2.987,  // 2.078 HPC + 0.909 CyVerse
        fplopsTensor: 14.038,  // 10.51 HPC + 3.528 CyVerse
        h100Count: 0,
        h200Count: 0,
        a100Count: 16,  // 12 MIG slices + 4 CyVerse A100 80GB
        color: '#0c5aa6',
        type: 'Local HPC',
        accessType: 'UA NetID',
        allocation: 'Monthly CPU-hour allocations'
    };

    // Jetstream2 GPU resources
    const jetstream2Data = {
        name: 'Jetstream2 (NSF Cloud)',
        shortName: 'Jetstream2',
        gpus: 488,  // 360 A100 + 96 H100 + 32 L40S
        gpuTypes: 'A100 40GB SXM4, H100 80GB SXM5, L40S 48GB',
        fplopsFP32: 4.509,  // (360×19.5 + 96×67 + 32×91.6)/1000
        fplopsTensor: 302.3,  // (360×312 + 96×1979 + 32×180)/1000 ≈ 302.3 PFLOPS
        h100Count: 96,
        h200Count: 0,
        a100Count: 360,
        color: '#FF8C00',
        type: 'Cloud (OpenStack)',
        accessType: 'ACCESS allocation',
        allocation: 'Explore: 400K SU, Discover: 1.5M SU, Accelerate: 3M SU'
    };

    // TACC combined GPU resources (Frontera + Stampede3 + Lonestar6 + Vista)
    const taccData = {
        name: 'TACC Systems Combined',
        shortName: 'TACC',
        gpus: 1884,  // 360 RTX5000 + 96 H100 + 80 PVC + 260 A100/H100 + 600 H200
        gpuTypes: 'H200 96GB (Vista), H100 96GB, A100 40GB, Intel PVC 124GB, RTX 5000',
        fplopsFP32: 23.3,  // Simplified calculation
        fplopsTensor: 1219.5,  // (600×1979 + 96×1979 + 252×312 + 8×1513)/1000 ≈ 1219.5 PFLOPS
        h100Count: 104,  // 96 Stampede3 + 8 Lonestar6
        h200Count: 600,  // Vista
        a100Count: 252,  // Lonestar6
        color: '#BF5700',  // Texas orange
        type: 'Traditional HPC',
        accessType: 'ACCESS allocation',
        allocation: 'Explore to Maximize (up to millions of SU)'
    };

    const container = d3.select('#access-ci-comparison-viz');
    container.selectAll('*').remove();

    const width = container.node().getBoundingClientRect().width;
    const height = 900;
    const margin = { top: 40, right: 40, bottom: 200, left: 180 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = container
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Metrics to compare (focused on GPU/AI)
    const metrics = [
        { key: 'gpus', label: 'Total GPUs', format: d => formatNumber(d), scale: 'linear' },
        { key: 'h100Count', label: 'H100 GPUs (Latest Gen)', format: d => formatNumber(d), scale: 'linear' },
        { key: 'h200Count', label: 'H200 GPUs (Newest)', format: d => formatNumber(d), scale: 'linear' },
        { key: 'a100Count', label: 'A100 GPUs', format: d => formatNumber(d), scale: 'linear' },
        { key: 'fplopsFP32', label: 'GPU FP32 (PFLOPS)', format: d => d.toFixed(1) + ' PF', scale: 'linear' },
        { key: 'fplopsTensor', label: 'AI/Tensor (PFLOPS)', format: d => d.toFixed(1) + ' PF', scale: 'linear' }
    ];

    const barHeight = 35;
    const barSpacing = 5;
    const groupSpacing = 30;
    const systems = [uaData, jetstream2Data, taccData];

    // Y positions for each metric
    metrics.forEach((metric, i) => {
        const yPos = i * (barHeight * 3 + barSpacing * 2 + groupSpacing);

        // Get max value for this metric to scale bars
        const maxValue = Math.max(
            uaData[metric.key] || 0,
            jetstream2Data[metric.key] || 0,
            taccData[metric.key] || 0
        );
        const xScale = d3.scaleLinear()
            .domain([0, maxValue * 1.1])
            .range([0, innerWidth - 250]);

        // Metric label
        g.append('text')
            .attr('x', -10)
            .attr('y', yPos + barHeight * 1.5)
            .attr('text-anchor', 'end')
            .attr('fill', colors.text)
            .attr('font-size', '14px')
            .attr('font-weight', 700)
            .text(metric.label);

        // Draw bars for each system
        systems.forEach((system, sysIndex) => {
            const barY = yPos + (barHeight + barSpacing) * sysIndex;
            const barGroup = g.append('g');

            const value = system[metric.key] || 0;
            const isUA = system.shortName === 'UA Total';

            // Bar
            barGroup.append('rect')
                .attr('x', 0)
                .attr('y', barY)
                .attr('width', xScale(value))
                .attr('height', barHeight)
                .attr('fill', system.color)
                .attr('opacity', 0.85)
                .attr('rx', 5)
                .attr('stroke', isUA ? colors.gap : '#ffffff')
                .attr('stroke-width', isUA ? 3 : 1)
                .on('mouseover', function(event) {
                    d3.select(this).attr('opacity', 1);
                    const displayValue = value > 0 ? metric.format(value) : 'N/A';
                    showTooltip(event, `
                        <strong>${system.name}</strong><br/>
                        ${metric.label}: ${displayValue}<br/>
                        <hr style="margin: 5px 0; border-color: rgba(255,255,255,0.2)">
                        GPU Types: ${system.gpuTypes}<br/>
                        Type: ${system.type}<br/>
                        Access: ${system.accessType}<br/>
                        Allocation: ${system.allocation}
                    `);
                })
                .on('mouseout', function() {
                    d3.select(this).attr('opacity', 0.85);
                    hideTooltip();
                });

            // Value label
            if (value > 0) {
                barGroup.append('text')
                    .attr('x', xScale(value) + 10)
                    .attr('y', barY + barHeight / 2)
                    .attr('dy', '0.35em')
                    .attr('fill', colors.text)
                    .attr('font-size', '12px')
                    .attr('font-weight', 700)
                    .text(metric.format(value));
            }

            // System label on the left side of bar
            barGroup.append('text')
                .attr('x', 8)
                .attr('y', barY + barHeight / 2)
                .attr('dy', '0.35em')
                .attr('fill', '#ffffff')
                .attr('font-size', '11px')
                .attr('font-weight', 700)
                .attr('text-shadow', '0 0 4px rgba(0,0,0,0.8)')
                .text(system.shortName);
        });
    });

    // Legend
    const legendY = metrics.length * (barHeight * 3 + barSpacing * 2 + groupSpacing) + 20;
    const legend = g.append('g')
        .attr('transform', `translate(0, ${legendY})`);

    legend.append('text')
        .attr('x', 0)
        .attr('y', -5)
        .attr('fill', colors.text)
        .attr('font-size', '13px')
        .attr('font-weight', 700)
        .text('Systems:');

    const legendItems = [
        { label: 'University of Arizona (Local HPC + CyVerse)', color: uaData.color, isUA: true },
        { label: 'Jetstream2 (NSF Cloud @ IU + regional sites)', color: jetstream2Data.color, isUA: false },
        { label: 'TACC (Frontera, Stampede3, Lonestar6, Vista)', color: taccData.color, isUA: false }
    ];

    legendItems.forEach((item, i) => {
        const legendItem = legend.append('g')
            .attr('transform', `translate(0, ${i * 22 + 10})`);

        legendItem.append('rect')
            .attr('width', 28)
            .attr('height', 14)
            .attr('fill', item.color)
            .attr('opacity', 0.85)
            .attr('stroke', item.isUA ? colors.gap : '#ffffff')
            .attr('stroke-width', item.isUA ? 3 : 1)
            .attr('rx', 4);

        legendItem.append('text')
            .attr('x', 35)
            .attr('y', 7)
            .attr('dy', '0.35em')
            .attr('fill', colors.text)
            .attr('font-size', '11px')
            .attr('font-weight', item.isUA ? 700 : 600)
            .text(item.label);
    });

    // Add comparative analysis
    const analysisY = legendY + 90;
    const analysis = g.append('g')
        .attr('transform', `translate(0, ${analysisY})`);

    const totalGPUs = uaData.gpus + jetstream2Data.gpus + taccData.gpus;
    const totalTensor = uaData.fplopsTensor + jetstream2Data.fplopsTensor + taccData.fplopsTensor;
    const totalH100H200 = uaData.h100Count + uaData.h200Count + jetstream2Data.h100Count + jetstream2Data.h200Count + taccData.h100Count + taccData.h200Count;

    analysis.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('fill', colors.text)
        .attr('font-size', '12px')
        .attr('font-weight', 700)
        .text(`Combined ACCESS-CI Resources Available to UA Researchers:`);

    analysis.append('text')
        .attr('x', 0)
        .attr('y', 22)
        .attr('fill', '#059669')
        .attr('font-size', '11px')
        .attr('font-weight', 600)
        .text(`✓ Total GPU Count: ${formatNumber(totalGPUs)} GPUs across all systems (${((jetstream2Data.gpus + taccData.gpus) / totalGPUs * 100).toFixed(0)}% from ACCESS-CI partners)`);

    analysis.append('text')
        .attr('x', 0)
        .attr('y', 42)
        .attr('fill', '#059669')
        .attr('font-size', '11px')
        .attr('font-weight', 600)
        .text(`✓ Latest Generation GPUs: ${totalH100H200} H100/H200 GPUs available via ACCESS-CI (Jetstream2 NAIRR + TACC Vista/Stampede3)`);

    analysis.append('text')
        .attr('x', 0)
        .attr('y', 62)
        .attr('fill', '#059669')
        .attr('font-size', '11px')
        .attr('font-weight', 600)
        .text(`✓ Combined AI Performance: ${totalTensor.toFixed(0)} PFLOPS Tensor/AI performance (${((jetstream2Data.fplopsTensor + taccData.fplopsTensor) / totalTensor * 100).toFixed(0)}% additional via ACCESS-CI)`);

    analysis.append('text')
        .attr('x', 0)
        .attr('y', 87)
        .attr('fill', colors.text)
        .attr('font-size', '10px')
        .attr('font-style', 'italic')
        .attr('opacity', 0.8)
        .text(`Note: ACCESS-CI resources complement UA's local HPC infrastructure. Jetstream2 excels at cloud-native workloads with flexible VM configurations.`);

    analysis.append('text')
        .attr('x', 0)
        .attr('y', 102)
        .attr('fill', colors.text)
        .attr('font-size', '10px')
        .attr('font-style', 'italic')
        .attr('opacity', 0.8)
        .text(`TACC systems provide leadership-scale computing with cutting-edge H200 GPUs (Vista) and diverse architectures. All accessible via ACCESS allocations.`);
}

// Initialize all enhanced visualizations
document.addEventListener('DOMContentLoaded', function() {
    createEnhancedTimelineVisualization();
    createPerformanceGapVisualization();
    createGPUComparisonVisualization();
    createUAvsASUComparison();
    createPeerUniversitiesComparison();
    createACCESSCIComparison();
});

// Responsive resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        createEnhancedTimelineVisualization();
        createPerformanceGapVisualization();
        createGPUComparisonVisualization();
        createUAvsASUComparison();
        createPeerUniversitiesComparison();
        createACCESSCIComparison();
    }, 250);
});