// Documentation Loader - Renders markdown files as collapsible sections
// Uses the embedded markdown from markdown-content.js

// Simple markdown to HTML converter
function markdownToHTML(markdown) {
    let html = markdown;

    // Convert headers
    html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
    html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
    html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

    // Convert bold and italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
    html = html.replace(/_(.+?)_/g, '<em>$1</em>');

    // Convert links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Convert inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Convert horizontal rules
    html = html.replace(/^---+$/gm, '<hr>');
    html = html.replace(/^===+$/gm, '<hr>');

    // Convert unordered lists
    html = html.replace(/^\s*[\*\-\+]\s+(.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

    // Convert ordered lists
    html = html.replace(/^\s*\d+\.\s+(.+)$/gm, '<li>$1</li>');

    // Convert paragraphs
    const lines = html.split('\n');
    const processed = [];
    let inParagraph = false;
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Check if we're in a list or special element
        if (line.startsWith('<h') || line.startsWith('<ul>') || line.startsWith('<ol>') ||
            line.startsWith('<li>') || line.startsWith('<hr') || line === '') {
            if (inParagraph) {
                processed.push('</p>');
                inParagraph = false;
            }
            processed.push(lines[i]);
            if (line.startsWith('<ul>') || line.startsWith('<ol>')) {
                inList = true;
            } else if (line.startsWith('</ul>') || line.startsWith('</ol>')) {
                inList = false;
            }
        } else if (!inList && line.length > 0) {
            if (!inParagraph) {
                processed.push('<p>');
                inParagraph = true;
            }
            processed.push(lines[i]);
        } else {
            processed.push(lines[i]);
        }
    }

    if (inParagraph) {
        processed.push('</p>');
    }

    return processed.join('\n');
}

// Create a collapsible documentation section
function createDocSection(filename, content) {
    // Custom title mappings for proper capitalization
    const titleMap = {
        'uarizona_hpc_resources.md': 'UArizona HPC Resources',
        'cyverse_ua_resources.md': 'CyVerse UA Resources',
        'asu_hpc_resources.md': 'ASU HPC Resources',
        'nau_hpc_resources.md': 'NAU HPC Resources',
        'tacc_jetstream2_hpc_resources.md': 'TACC Jetstream2 HPC Resources',
        'peer_universities_hpc.md': 'Peer Universities HPC Resources'
    };

    const title = titleMap[filename] || filename
        .replace(/_/g, ' ')
        .replace('.md', '')
        .replace(/\b\w/g, l => l.toUpperCase());

    const html = markdownToHTML(content);

    const section = document.createElement('div');
    section.className = 'doc-collapsible';
    section.innerHTML = `
        <div class="doc-header">
            <h3>${title}</h3>
            <span class="doc-toggle">▼</span>
        </div>
        <div class="doc-content">
            <div class="doc-content-inner">
                ${html}
            </div>
        </div>
    `;

    // Add click handler for expand/collapse
    const header = section.querySelector('.doc-header');
    header.addEventListener('click', () => {
        section.classList.toggle('active');
    });

    return section;
}

// Load all documentation
function loadDocumentation() {
    const container = document.getElementById('documentation-container');

    if (!container) {
        console.error('Documentation container not found');
        return;
    }

    if (typeof embeddedMarkdown === 'undefined') {
        console.error('Embedded markdown content not found');
        container.innerHTML = '<p style="color: #DC2626;">Error: Markdown content not loaded. Make sure markdown-content.js is included.</p>';
        return;
    }

    const docOrder = [
        'uarizona_hpc_resources.md',
        'cyverse_ua_resources.md',
        'asu_hpc_resources.md',
        'nau_hpc_resources.md',
        'tacc_jetstream2_hpc_resources.md',
        'peer_universities_hpc.md'
    ];

    // Create sections in order
    docOrder.forEach(filename => {
        if (embeddedMarkdown[filename]) {
            const section = createDocSection(filename, embeddedMarkdown[filename]);
            container.appendChild(section);
        } else {
            console.warn(`Content not found for ${filename}`);
        }
    });

    console.log('Documentation sections loaded successfully');
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadDocumentation);
} else {
    loadDocumentation();
}
