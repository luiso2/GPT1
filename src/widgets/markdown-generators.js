/**
 * Generadores de Widgets en Formato Markdown
 * Para mostrar en ChatGPT sin HTML
 */

export const markdownGenerators = {

  // ============================================
  // DASHBOARD MARKDOWN
  // ============================================
  dashboard: (title, metrics = []) => {
    const metricsText = metrics.map(m => {
      const changeEmoji = m.change ? (m.change.startsWith('+') ? '📈' : '📉') : '';
      const colorEmoji = {
        'text-green-600': '🟢',
        'text-blue-600': '🔵',
        'text-purple-600': '🟣',
        'text-orange-600': '🟠',
        'text-red-600': '🔴'
      }[m.color] || '⚪';

      return `${colorEmoji} **${m.label}**: ${m.value} ${m.change ? `(${m.change})` : ''} ${changeEmoji}`;
    }).join('\n');

    return `# 📊 ${title}

${metricsText}

---
*Datos actualizados: ${new Date().toLocaleDateString('es-ES')}*`;
  },

  // ============================================
  // CHART MARKDOWN
  // ============================================
  chart: (title, type, data = [], labels = []) => {
    const maxValue = Math.max(...data);
    const bars = data.map((value, idx) => {
      const percentage = (value / maxValue) * 100;
      const barLength = Math.round(percentage / 5);
      const bar = '█'.repeat(barLength);
      return `${labels[idx]?.padEnd(10)} │ ${bar} ${value}`;
    }).join('\n');

    const typeEmoji = {
      'bar': '📊',
      'line': '📈',
      'pie': '🥧',
      'doughnut': '🍩'
    }[type] || '📊';

    return `# ${typeEmoji} ${title}

\`\`\`
${bars}
\`\`\`

**Total**: ${data.reduce((a, b) => a + b, 0)}
**Promedio**: ${(data.reduce((a, b) => a + b, 0) / data.length).toFixed(2)}
**Máximo**: ${Math.max(...data)} (${labels[data.indexOf(Math.max(...data))]})`;
  },

  // ============================================
  // TABLE MARKDOWN
  // ============================================
  table: (title, headers = [], rows = []) => {
    const headerRow = '| ' + headers.join(' | ') + ' |';
    const separator = '|' + headers.map(() => '---').join('|') + '|';
    const dataRows = rows.map(row => '| ' + row.join(' | ') + ' |').join('\n');

    return `# 📋 ${title}

${headerRow}
${separator}
${dataRows}

**Total de registros**: ${rows.length}`;
  },

  // ============================================
  // TIMELINE MARKDOWN
  // ============================================
  timeline: (title, events = []) => {
    const eventsText = events.map((event, idx) => {
      const emoji = {
        'blue': '🔵',
        'green': '🟢',
        'red': '🔴',
        'purple': '🟣',
        'orange': '🟠'
      }[event.color] || '⚪';

      const connector = idx < events.length - 1 ? '│\n↓' : '';

      return `${emoji} **${event.date}** - ${event.title}
   ${event.description}
${connector}`;
    }).join('\n');

    return `# 🕐 ${title}

${eventsText}`;
  },

  // ============================================
  // COMPARISON MARKDOWN
  // ============================================
  comparison: (title, items = []) => {
    const itemsText = items.map(item => {
      const badge = item.highlight ? '⭐ **RECOMENDADO**' : '';
      const featuresText = item.features.map(f => `  ✓ ${f}`).join('\n');

      return `### ${item.name} ${badge}
${item.price ? `**Precio**: ${item.price}` : ''}

**Características**:
${featuresText}`;
    }).join('\n\n---\n\n');

    return `# ⚖️ ${title}

${itemsText}`;
  }
};
