// PDF Generator for UA HPC Timeline Report
// Includes visualizations and all supplementary markdown documentation

// Markdown files to include in the PDF
const markdownFiles = [
    'uarizona_hpc_resources.md',
    'asu_hpc_resources.md',
    'nau_hpc_resources.md',
    'cyverse_ua_resources.md',
    'tacc_jetstream2_hpc_resources.md',
    'peer_universities_hpc.md'
];

async function fetchMarkdownContent(filename) {
    // Use embedded content if available (solves CORS/file:// protocol issues)
    if (typeof embeddedMarkdown !== 'undefined' && embeddedMarkdown[filename]) {
        console.log(`Using embedded content for ${filename}, length: ${embeddedMarkdown[filename].length}`);
        return embeddedMarkdown[filename];
    }

    // Fallback to fetch if embedded content not available
    try {
        const response = await fetch(`./${filename}`);
        if (!response.ok) {
            console.warn(`Could not fetch ${filename}: ${response.status}`);
            throw new Error(`HTTP ${response.status}`);
        }
        const text = await response.text();
        console.log(`Successfully fetched ${filename}, length: ${text.length}`);
        return text;
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return `# ${filename}\n\n[Content could not be loaded - ${error.message}]\n\nNote: If viewing this HTML file directly (file:// protocol), the markdown files cannot be fetched due to browser security restrictions. Content should be embedded in markdown-content.js instead.`;
    }
}

function markdownToPlainText(markdown) {
    // Enhanced markdown to plain text conversion
    let text = markdown;

    // Remove HTML tags
    text = text.replace(/<[^>]*>/g, '');

    // Convert headers with formatting
    text = text.replace(/^######\s+(.+)$/gm, '      $1');
    text = text.replace(/^#####\s+(.+)$/gm, '     $1');
    text = text.replace(/^####\s+(.+)$/gm, '    $1');
    text = text.replace(/^###\s+(.+)$/gm, '\n   $1');
    text = text.replace(/^##\s+(.+)$/gm, '\n  $1');
    text = text.replace(/^#\s+(.+)$/gm, '\n$1\n');

    // Convert tables - just simplify them
    text = text.replace(/\|/g, ' | ');

    // Convert bold (keep the text emphasized with CAPS where appropriate)
    text = text.replace(/\*\*(.+?)\*\*/g, '$1');
    text = text.replace(/__(.+?)__/g, '$1');

    // Convert italic
    text = text.replace(/\*(.+?)\*/g, '$1');
    text = text.replace(/_(.+?)_/g, '$1');

    // Convert links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');

    // Remove code blocks but keep inline code
    text = text.replace(/```[\s\S]*?```/g, '');
    text = text.replace(/`([^`]+)`/g, '$1');

    // Convert horizontal rules to blank lines
    text = text.replace(/^---+$/gm, '');
    text = text.replace(/^===+$/gm, '');

    // Convert bullet points
    text = text.replace(/^\s*[\*\-]\s+/gm, '  • ');

    // Clean up multiple blank lines
    text = text.replace(/\n{3,}/g, '\n\n');

    return text.trim();
}

async function generatePDF() {
    const button = document.getElementById('download-pdf');
    const statusDiv = document.getElementById('download-status');

    // Disable button and show status
    button.disabled = true;
    statusDiv.textContent = 'Generating PDF... This may take a minute.';

    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'letter'
        });

        let currentY = 20;
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 20;
        const contentWidth = pageWidth - (margin * 2);

        // Helper function to add new page if needed
        function checkPageBreak(neededSpace = 10) {
            if (currentY + neededSpace > pageHeight - margin) {
                pdf.addPage();
                currentY = margin;
                return true;
            }
            return false;
        }

        // Title Page
        pdf.setFontSize(24);
        pdf.setFont(undefined, 'bold');
        pdf.text('UA HPC Resources Timeline', pageWidth / 2, currentY, { align: 'center' });

        currentY += 10;
        pdf.setFontSize(14);
        pdf.setFont(undefined, 'normal');
        pdf.text('Evolution of High Performance Computing', pageWidth / 2, currentY, { align: 'center' });

        currentY += 6;
        pdf.text('at University of Arizona', pageWidth / 2, currentY, { align: 'center' });

        currentY += 15;
        pdf.setFontSize(10);
        pdf.text(`Generated: ${new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}`, pageWidth / 2, currentY, { align: 'center' });

        // Add summary statistics
        currentY += 20;
        pdf.setFontSize(16);
        pdf.setFont(undefined, 'bold');
        pdf.text('Summary Statistics', margin, currentY);

        currentY += 10;
        pdf.setFontSize(10);
        pdf.setFont(undefined, 'normal');
        const stats = [
            'Total CPU Cores: 43,688',
            'Total GPUs: 163',
            'System Memory: 256 TB',
            'AI Performance: 10.5 PFLOPS (Tensor)',
            'Active Clusters: Puma, Ocelote, El Gato, Soteria'
        ];

        stats.forEach(stat => {
            pdf.text(`• ${stat}`, margin + 5, currentY);
            currentY += 6;
        });

        // Capture and add visualizations
        statusDiv.textContent = 'Capturing visualizations...';

        const vizContainers = [
            { id: 'timeline-viz', title: 'HPC Systems Timeline' },
            { id: 'performance-viz', title: 'CPU Performance Evolution' },
            { id: 'gpu-evolution-viz', title: 'GPU Performance Evolution' },
            { id: 'ua-asu-comparison-viz', title: 'Arizona Universities Comparison' },
            { id: 'peer-comparison-viz', title: 'Peer Universities Comparison' },
            { id: 'access-ci-comparison-viz', title: 'UA + ACCESS-CI Resources' }
        ];

        for (const viz of vizContainers) {
            pdf.addPage();
            currentY = margin;

            pdf.setFontSize(14);
            pdf.setFont(undefined, 'bold');
            pdf.text(viz.title, margin, currentY);
            currentY += 10;

            const element = document.getElementById(viz.id);
            if (element) {
                try {
                    const canvas = await html2canvas(element, {
                        scale: 1.5,  // Reduced from 2 to 1.5
                        backgroundColor: '#ffffff',
                        logging: false,
                        useCORS: true
                    });

                    // Convert to JPEG with compression for smaller file size
                    const imgData = canvas.toDataURL('image/jpeg', 0.7);  // 70% quality
                    const imgWidth = contentWidth;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;

                    // Check if image fits on page, otherwise scale it down
                    const maxHeight = pageHeight - currentY - margin;
                    const finalHeight = Math.min(imgHeight, maxHeight);
                    const finalWidth = finalHeight === imgHeight ? imgWidth : (canvas.width * finalHeight) / canvas.height;

                    pdf.addImage(imgData, 'JPEG', margin, currentY, finalWidth, finalHeight);
                } catch (error) {
                    console.error(`Error capturing ${viz.id}:`, error);
                    pdf.setFontSize(10);
                    pdf.text('[Visualization could not be captured]', margin, currentY);
                }
            }
        }

        // Add supplementary documentation
        statusDiv.textContent = 'Loading supplementary documentation...';

        pdf.addPage();
        currentY = margin;

        pdf.setFontSize(18);
        pdf.setFont(undefined, 'bold');
        pdf.text('Supplementary Documentation', margin, currentY);
        currentY += 10;

        pdf.setFontSize(10);
        pdf.setFont(undefined, 'normal');
        pdf.text('Detailed technical specifications and resource descriptions', margin, currentY);
        currentY += 10;

        // Fetch and add markdown content
        for (const filename of markdownFiles) {
            statusDiv.textContent = `Loading ${filename}...`;
            console.log(`Attempting to fetch ${filename}...`);

            const markdown = await fetchMarkdownContent(filename);
            console.log(`Markdown fetched, length: ${markdown.length}`);

            const plainText = markdownToPlainText(markdown);
            console.log(`Converted to plain text, length: ${plainText.length}`);

            // Add filename as section header
            checkPageBreak(20);
            pdf.setFontSize(12);
            pdf.setFont(undefined, 'bold');

            const headerText = filename.replace(/_/g, ' ').replace('.md', '').toUpperCase();
            pdf.text(headerText, margin, currentY);
            currentY += 8;

            // Add a separator line
            pdf.setLineWidth(0.5);
            pdf.line(margin, currentY, pageWidth - margin, currentY);
            currentY += 5;

            // Split text into lines that fit
            pdf.setFontSize(8);  // Smaller font for more content
            pdf.setFont(undefined, 'normal');

            const lines = plainText.split('\n');
            let lineCount = 0;

            for (const line of lines) {
                if (line.trim() === '') {
                    currentY += 2;
                    checkPageBreak();
                    continue;
                }

                const wrappedLines = pdf.splitTextToSize(line.trim(), contentWidth);
                for (const wrappedLine of wrappedLines) {
                    checkPageBreak(4);
                    pdf.text(wrappedLine, margin, currentY);
                    currentY += 3.5;
                    lineCount++;
                }
            }

            console.log(`Added ${lineCount} lines for ${filename}`);
            currentY += 8; // Space between sections
        }

        console.log('All markdown files processed');

        // Add footer to all pages
        const pageCount = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            pdf.setPage(i);
            pdf.setFontSize(8);
            pdf.setFont(undefined, 'normal');
            pdf.text(
                `UA HPC Resources Timeline - Page ${i} of ${pageCount}`,
                pageWidth / 2,
                pageHeight - 10,
                { align: 'center' }
            );
        }

        // Save the PDF
        statusDiv.textContent = 'Saving PDF...';
        pdf.save('UA_HPC_Resources_Timeline_Report.pdf');

        statusDiv.textContent = '✓ PDF downloaded successfully!';
        setTimeout(() => {
            statusDiv.textContent = '';
        }, 3000);

    } catch (error) {
        console.error('Error generating PDF:', error);
        statusDiv.textContent = '✗ Error generating PDF. Please try again.';
        statusDiv.style.color = '#DC2626';
        setTimeout(() => {
            statusDiv.textContent = '';
            statusDiv.style.color = '#059669';
        }, 5000);
    } finally {
        button.disabled = false;
    }
}

// Initialize download button
document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.getElementById('download-pdf');
    if (downloadButton) {
        downloadButton.addEventListener('click', generatePDF);
    }
});
