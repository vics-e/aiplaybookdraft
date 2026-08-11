function escapeForXml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeForHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function wrapText(text: string, maxCharacters: number) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;
    if (nextLine.length <= maxCharacters) {
      currentLine = nextLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function createTspans(lines: string[], x: number, firstY: number, lineHeight: number) {
  return lines
    .map((line, index) => {
      const y = firstY + (index * lineHeight);
      return `<tspan x="${x}" y="${y}">${escapeForXml(line)}</tspan>`;
    })
    .join('');
}

export function buildCertificatePrintMarkup({
  title,
  subtitle,
  displayName,
  statement,
  poweredByTitle,
  poweredByText,
  completionDate,
}: {
  title: string;
  subtitle: string;
  displayName: string;
  statement: string;
  poweredByTitle: string;
  poweredByText: string;
  completionDate: string;
}) {
  const nameLines = wrapText(displayName, 28).slice(0, 2);
  const statementLines = wrapText(statement, 74).slice(0, 3);
  const poweredLines = wrapText(poweredByText, 60).slice(0, 3);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1123 794" role="img" aria-label="${escapeForXml(subtitle)}">
      <defs>
        <linearGradient id="borderGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00DC51" stop-opacity="1"/>
          <stop offset="100%" stop-color="#6BFF9D" stop-opacity="0.9"/>
        </linearGradient>
        <radialGradient id="heroGlow" cx="50%" cy="0%" r="95%">
          <stop offset="0%" stop-color="#0E5F2E" stop-opacity="0.55"/>
          <stop offset="55%" stop-color="#050505" stop-opacity="1"/>
          <stop offset="100%" stop-color="#020202" stop-opacity="1"/>
        </radialGradient>
      </defs>

      <rect width="1123" height="794" fill="#050505"/>
      <rect x="22" y="22" width="1079" height="750" rx="28" fill="url(#heroGlow)" stroke="url(#borderGlow)" stroke-width="4"/>
      <rect x="42" y="42" width="1039" height="710" rx="22" fill="none" stroke="#00DC51" stroke-opacity="0.22" stroke-width="1.5"/>

      <line x1="110" y1="118" x2="1013" y2="118" stroke="#00DC51" stroke-opacity="0.58" stroke-width="1.2"/>
      <line x1="110" y1="676" x2="1013" y2="676" stroke="#00DC51" stroke-opacity="0.44" stroke-width="1.2"/>

      <text x="561.5" y="105" text-anchor="middle" fill="#8DFFB3" font-size="15" font-weight="700" letter-spacing="5.4" font-family="Georgia, 'Times New Roman', serif">
        ${escapeForXml(title.toUpperCase())}
      </text>

      <text x="561.5" y="182" text-anchor="middle" fill="#FFFFFF" font-size="40" font-weight="700" font-family="Georgia, 'Times New Roman', serif">
        ${escapeForXml(subtitle)}
      </text>

      <text x="561.5" y="238" text-anchor="middle" fill="#A7B1AB" font-size="13" font-weight="700" letter-spacing="4" font-family="Arial, Helvetica, sans-serif">
        PRESENTED TO
      </text>

      <text x="561.5" y="302" text-anchor="middle" fill="#FFFFFF" font-size="${nameLines.length > 1 ? 34 : 40}" font-weight="700" font-family="Georgia, 'Times New Roman', serif">
        ${createTspans(nameLines, 561.5, 302, 42)}
      </text>

      <line x1="230" y1="350" x2="893" y2="350" stroke="#00DC51" stroke-opacity="0.72" stroke-width="2"/>

      <text x="561.5" y="404" text-anchor="middle" fill="#F5F7F6" font-size="18" font-weight="500" font-family="Arial, Helvetica, sans-serif">
        ${createTspans(statementLines, 561.5, 404, 24)}
      </text>

      <rect x="212" y="500" width="699" height="104" rx="18" fill="#0E1210" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1.5"/>
      <text x="561.5" y="534" text-anchor="middle" fill="#00DC51" font-size="18" font-weight="700" letter-spacing="3.2" font-family="Arial, Helvetica, sans-serif">
        ${escapeForXml(poweredByTitle.toUpperCase())}
      </text>
      <text x="561.5" y="564" text-anchor="middle" fill="#EAF3EE" font-size="13.5" font-weight="500" font-family="Arial, Helvetica, sans-serif">
        ${createTspans(poweredLines, 561.5, 564, 18)}
      </text>

      <text x="330" y="648" text-anchor="middle" fill="#9AA39E" font-size="12" font-weight="700" letter-spacing="2.4" font-family="Arial, Helvetica, sans-serif">
        COMPLETION DATE
      </text>
      <text x="330" y="671" text-anchor="middle" fill="#FFFFFF" font-size="17" font-weight="600" font-family="Arial, Helvetica, sans-serif">
        ${escapeForXml(completionDate)}
      </text>

      <text x="792" y="648" text-anchor="middle" fill="#9AA39E" font-size="12" font-weight="700" letter-spacing="2.4" font-family="Arial, Helvetica, sans-serif">
        POWERED BY
      </text>
      <text x="792" y="671" text-anchor="middle" fill="#00DC51" font-size="20" font-weight="700" font-family="Arial, Helvetica, sans-serif">
        Sage
      </text>
    </svg>
  `;

  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>${escapeForHtml(subtitle)}</title>
      <style>
        @page { size: A4 landscape; margin: 10mm; }
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
          background: #050505;
          color: #ffffff;
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
          font-family: Arial, Helvetica, sans-serif;
        }
        body {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .certificate-sheet {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .certificate-sheet svg {
          display: block;
          width: 100%;
          max-width: 277mm;
          height: auto;
          max-height: 185mm;
          page-break-inside: avoid;
          break-inside: avoid;
        }
      </style>
    </head>
    <body>
      <div class="certificate-sheet">${svg}</div>
      <script>
        window.addEventListener('load', () => {
          window.setTimeout(() => {
            window.focus();
            window.print();
          }, 150);
        });
        window.addEventListener('afterprint', () => {
          window.close();
        });
      </script>
    </body>
  </html>`;
}
