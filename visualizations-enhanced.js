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
        const gapPercent = ((currentIndustry.cores - currentUA.effectiveCores) / currentIndustry.cores * 100).toFixed(0);

        g.append('text')
            .attr('x', xScale(currentYear) + 10)
            .attr('y', (yScale(currentIndustry.cores) + yScale(currentUA.effectiveCores)) / 2)
            .attr('fill', colors.gap)
            .attr('font-size', '14px')
            .attr('font-weight', 700)
            .text(`${gapPercent}% Gap`);
    }

    // Legend
    const legend = g.append('g')
        .attr('transform', `translate(${innerWidth - 180}, 20)`);

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
        const gapPercent = ((currentIndustry.tflops - currentUA.effectivePerGPU) / currentIndustry.tflops * 100).toFixed(0);

        g.append('text')
            .attr('x', xScale(currentYear) + 10)
            .attr('y', (yScale(currentIndustry.tflops) + yScale(currentUA.effectivePerGPU)) / 2)
            .attr('fill', colors.gap)
            .attr('font-size', '14px')
            .attr('font-weight', 700)
            .text(`${gapPercent}% Gap`);
    }

    // Legend (matching CPU chart style)
    const legend = g.append('g')
        .attr('transform', `translate(${innerWidth - 180}, 20)`);

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

// 4. System Capacity Bubble Chart (from original)
function createBubbleVisualization() {
    const systemData = [
        {
            name: 'El Gato',
            cores: 1888,
            memory: 23.5,
            nodes: 118,
            gpus: 0,
            color: colors.elgato,
            age: 12,  // Deployed 2013, now 2025
            postWarranty: 7  // Warranty ended 2018
        },
        {
            name: 'Ocelote',
            cores: 11724,
            memory: 83.3,
            nodes: 421,
            gpus: 95,
            color: colors.ocelote,
            age: 9,
            postWarranty: 4
        },
        {
            name: 'Puma',
            cores: 29512,
            memory: 169.7,
            nodes: 320,
            gpus: 60,
            color: colors.puma,
            age: 5,
            postWarranty: 0
        },
        {
            name: 'Soteria',
            cores: 564,
            memory: 3,
            nodes: 6,
            gpus: 8,
            color: colors.soteria,
            age: 2,
            postWarranty: 0
        }
    ];

    const container = d3.select('#bubble-viz');
    container.selectAll('*').remove();

    const width = container.node().getBoundingClientRect().width;
    const height = 550;
    const margin = { top: 40, right: 40, bottom: 80, left: 80 };
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

    // Color scale for aging
    const ageColorScale = d3.scaleLinear()
        .domain([0, 5, 10])
        .range(['green', 'yellow', 'red']);

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
        .attr('y', innerHeight + 55)
        .attr('text-anchor', 'middle')
        .attr('fill', colors.text)
        .text('CPU Cores');

    // Bubbles
    const bubbles = g.selectAll('.system-bubble')
        .data(systemData)
        .enter()
        .append('g')
        .attr('class', 'system-bubble')
        .attr('transform', d => `translate(${xScale(d.cores)},${yScale(d.memory)})`);

    // Main circles (GPU count) with aging color
    bubbles.append('circle')
        .attr('r', d => radiusScale(d.gpus || 10))
        .attr('fill', d => d.color)
        .attr('opacity', d => d.postWarranty > 0 ? 0.5 : 0.8)
        .attr('stroke', d => d.postWarranty > 0 ? colors.aging : 'white')
        .attr('stroke-width', 3);

    // Age indicator ring
    bubbles.append('circle')
        .attr('r', d => radiusScale(d.gpus || 10) + 5)
        .attr('fill', 'none')
        .attr('stroke', d => ageColorScale(d.age))
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', d => {
            const radius = radiusScale(d.gpus || 10) + 5;
            const circumference = 2 * Math.PI * radius;
            const dashLength = (d.age / 15) * circumference; // Max age 15 years
            return `${dashLength} ${circumference - dashLength}`;
        })
        .attr('transform', 'rotate(-90)');

    // Labels
    bubbles.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '-0.5em')
        .attr('fill', '#1a202c')
        .attr('font-weight', 700)
        .attr('font-size', '16px')
        .text(d => d.name);

    bubbles.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '1em')
        .attr('fill', '#475569')
        .attr('font-size', '12px')
        .text(d => d.gpus ? `${d.gpus} GPUs` : 'No GPUs');

    // Age labels
    bubbles.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '2.5em')
        .attr('fill', d => d.postWarranty > 0 ? colors.aging : colors.warranty)
        .attr('font-size', '10px')
        .attr('font-weight', 600)
        .text(d => d.postWarranty > 0 ? `${d.postWarranty}y post-warranty` : 'In warranty');

    // Hover effects
    bubbles
        .on('mouseover', function(event, d) {
            d3.select(this).selectAll('circle')
                .transition()
                .duration(200)
                .attr('opacity', 1);

            const content = `
                <strong>${d.name}</strong><br/>
                System Age: ${d.age} years<br/>
                ${d.postWarranty > 0 ? `Post-Warranty: ${d.postWarranty} years<br/>` : 'Under Warranty<br/>'}
                <hr style="margin: 5px 0; border-color: rgba(255,255,255,0.2)">
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
                .attr('opacity', d.postWarranty > 0 ? 0.5 : 0.8);
            hideTooltip();
        });
}

// 5. UA vs ASU vs NAU Comparison Visualization
function createUAvsASUComparison() {
    // UA totals (current, 2025)
    // GPU Cores calculation:
    // - 95× P100 (16GB): 95 × 3,584 = 340,480 cores
    // - 68× V100/V100S (32GB): 68 × 5,120 = 348,160 cores (60 Puma + 8 Soteria)
    // - 12× A100 MIG slices: ~51,200 cores equivalent
    // Total: ~739,840 GPU cores
    const uaData = {
        name: 'University of Arizona',
        shortName: 'UA',
        cpuCores: 43688,
        gpus: 163,
        gpuCores: 739840,
        memory: 256,  // TB
        fplopsFP32: 2.08,  // PFLOPS
        fplopsTensor: 10.5,  // PFLOPS
        color: '#0c5aa6',
        systems: [
            { name: 'Puma', cores: 29512, gpus: 60, year: 2020 },
            { name: 'Ocelote', cores: 11724, gpus: 95, year: 2016 },
            { name: 'El Gato', cores: 1888, gpus: 0, year: 2013 },
            { name: 'Soteria', cores: 564, gpus: 8, year: 2023 }
        ]
    };

    // CyVerse UA totals (June 2023)
    // GPU inventory: 12x GTX 1080 Ti, 8x RTX 2080, 5x Tesla T4, 4x A100 80GB, 22x A16, 4x L40s = 55 total GPUs
    // GPU Performance calculations:
    // - GTX 1080 Ti: 12 × 11.3 TFLOPS FP32 = 135.6 TFLOPS
    // - RTX 2080: 8 × 10.1 TFLOPS FP32 = 80.8 TFLOPS
    // - Tesla T4: 5 × 8.1 TFLOPS FP32 = 40.5 TFLOPS
    // - A100 80GB PCIe: 4 × 19.5 TFLOPS FP32 = 78 TFLOPS, 4 × 312 TFLOPS Tensor = 1248 TFLOPS
    // - A16: 22 × 8.0 TFLOPS FP32 = 176 TFLOPS, 22 × 32 TFLOPS Tensor = 704 TFLOPS
    // - L40s: 4 × 91.6 TFLOPS FP32 = 366.4 TFLOPS, 4 × 362 TFLOPS Tensor = 1448 TFLOPS
    // Total FP32: ~877.3 TFLOPS = 0.877 PFLOPS
    // Total Tensor: ~3400 TFLOPS = 3.4 PFLOPS
    // GPU Cores calculation:
    // - 12× GTX 1080 Ti: 12 × 3,584 = 43,008 cores
    // - 8× RTX 2080: 8 × 2,944 = 23,552 cores
    // - 5× Tesla T4: 5 × 2,560 = 12,800 cores
    // - 4× A100 80GB: 4 × 6,912 = 27,648 cores
    // - 22× A16: 22 × 2,560 = 56,320 cores
    // - 4× L40s: 4 × 18,176 = 72,704 cores
    // Total: 236,032 GPU cores
    const cyverseData = {
        name: 'CyVerse (UA)',
        shortName: 'CyVerse',
        cpuCores: 3760,  // 1052 + 612 + 688 + 504 + 224 + 680
        gpus: 55,  // Total GPU count across all servers
        gpuCores: 236032,
        memory: 42.43,  // 7.68 + 5.2 + 10.5 + 6.25 + 2.8 + 10 = 42.43 TB
        storage: 8.99,  // 8.18 PB + storage from other systems (~0.8 PB) = ~9 PB
        fplopsFP32: 0.877,  // PFLOPS
        fplopsTensor: 3.4,  // PFLOPS
        color: '#00B4D8',  // CyVerse blue
        systems: [
            { name: 'Vice/K8s', cores: 1052, gpus: 21 },
            { name: 'Condor', cores: 612, gpus: 0 },
            { name: 'Marana Cloud', cores: 688, gpus: 0 },
            { name: 'Tombstone', cores: 504, gpus: 0 },
            { name: 'Xen Pools', cores: 224, gpus: 0 },
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
    const asuData = {
        name: 'Arizona State University',
        shortName: 'ASU',
        cpuCores: 39900,
        gpus: 632,
        gpuCores: 3646464,
        memory: 203,  // TB
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
    const nauData = {
        name: 'Northern Arizona University',
        shortName: 'NAU',
        cpuCores: 5940,
        gpus: 24,
        gpuCores: 92416,
        memory: 14,  // TB (approximate)
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
    const height = 1100;
    const margin = { top: 40, right: 40, bottom: 140, left: 140 };
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
        { key: 'fplopsFP32', label: 'GPU FP32 (PFLOPS)', format: d => d.toFixed(1) + ' PF', scale: 'linear' },
        { key: 'fplopsTensor', label: 'AI/Tensor (PFLOPS)', format: d => d.toFixed(1) + ' PF', scale: 'linear' }
    ];

    const barHeight = 30;
    const barSpacing = 4;
    const groupSpacing = 25;
    const universities = [uaData, cyverseData, asuData, nauData];

    // Y positions for each metric
    metrics.forEach((metric, i) => {
        const yPos = i * (barHeight * 4 + barSpacing * 3 + groupSpacing);

        // Get max value for this metric to scale bars
        const maxValue = Math.max(
            uaData[metric.key] || 0,
            cyverseData[metric.key] || 0,
            asuData[metric.key] || 0,
            nauData[metric.key] || 0
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
    const legendY = metrics.length * (barHeight * 4 + barSpacing * 3 + groupSpacing) + 15;
    const legend = g.append('g')
        .attr('transform', `translate(0, ${legendY})`);

    const legendItems = [
        { label: 'University of Arizona HPC (UA)', color: uaData.color },
        { label: 'CyVerse (UA)', color: cyverseData.color },
        { label: 'Arizona State University (ASU)', color: asuData.color },
        { label: 'Northern Arizona University (NAU)', color: nauData.color }
    ];

    legendItems.forEach((item, i) => {
        const legendItem = legend.append('g')
            .attr('transform', `translate(${i * 220}, ${Math.floor(i / 2) * 20})`);

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
    const summaryY = legendY + 55;
    const summary = g.append('g')
        .attr('transform', `translate(0, ${summaryY})`);

    const totalCores = uaData.cpuCores + cyverseData.cpuCores + asuData.cpuCores + nauData.cpuCores;
    const totalGPUs = uaData.gpus + cyverseData.gpus + asuData.gpus + nauData.gpus;
    const totalTensor = (uaData.fplopsTensor || 0) + (asuData.fplopsTensor || 0) + (nauData.fplopsTensor || 0);

    summary.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('fill', colors.text)
        .attr('font-size', '10px')
        .attr('opacity', 0.7)
        .text(`Combined Arizona Universities Total: ${formatNumber(totalCores)} CPU cores, ${totalGPUs} GPUs, ${totalTensor.toFixed(1)} PFLOPS AI/Tensor performance`);
}

// Initialize all enhanced visualizations
document.addEventListener('DOMContentLoaded', function() {
    createEnhancedTimelineVisualization();
    createPerformanceGapVisualization();
    createGPUComparisonVisualization();
    createBubbleVisualization();
    createUAvsASUComparison();
});

// Responsive resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        createEnhancedTimelineVisualization();
        createPerformanceGapVisualization();
        createGPUComparisonVisualization();
        createBubbleVisualization();
        createUAvsASUComparison();
    }, 250);
});