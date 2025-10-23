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
  },

  // ============================================
  // TREE MARKDOWN
  // ============================================
  tree: (title, data = [], variant = 'premium') => {
    const renderNode = (node, depth = 0, isLast = false, prefix = '') => {
      const iconEmoji = {
        'folder': '📁',
        'folder-open': '📂',
        'file': '📄',
        'database': '🗄️',
        'code': '💻',
        'package': '📦',
        'settings': '⚙️',
        'users': '👥',
        'document': '📝',
        'image': '🖼️',
        'video': '🎬',
        'music': '🎵'
      }[node.icon] || (node.children ? '📁' : '📄');

      const badge = node.badge ? ` [${node.badge}]` : '';
      const connector = isLast ? '└─' : '├─';
      const line = `${prefix}${connector} ${iconEmoji} ${node.label}${badge}`;

      let result = line + '\n';

      if (node.children && node.children.length > 0) {
        const newPrefix = prefix + (isLast ? '   ' : '│  ');
        node.children.forEach((child, idx) => {
          const childIsLast = idx === node.children.length - 1;
          result += renderNode(child, depth + 1, childIsLast, newPrefix);
        });
      }

      return result;
    };

    const treeText = data.map((node, idx) => {
      const isLast = idx === data.length - 1;
      return renderNode(node, 0, isLast, '');
    }).join('');

    const variantEmoji = {
      'default': '🌲',
      'premium': '✨',
      'minimal': '📋',
      'neon': '🌟'
    }[variant] || '🌲';

    return `# ${variantEmoji} ${title}

\`\`\`
${treeText.trim()}
\`\`\`

**Variante**: ${variant.toUpperCase()}
**Total de items**: ${data.length}`;
  },

  // ============================================
  // STATS CARDS MARKDOWN
  // ============================================
  stats: (title, stats = []) => {
    const statsText = stats.map(stat => {
      const trendEmoji = stat.trend === 'up' ? '📈' : stat.trend === 'down' ? '📉' : '';
      return `### ${stat.title}
**${stat.value}**
${stat.change ? `${trendEmoji} ${stat.change}` : ''}`;
    }).join('\n\n');

    return `# 📊 ${title}

${statsText}`;
  },

  // ============================================
  // PROGRESS MARKDOWN
  // ============================================
  progress: (title, items = []) => {
    const itemsText = items.map(item => {
      const barLength = Math.round(item.value / 5);
      const bar = '█'.repeat(barLength) + '░'.repeat(20 - barLength);
      return `**${item.label}**: ${item.value}%
\`${bar}\`
${item.subtitle || ''}`;
    }).join('\n\n');

    return `# 🎯 ${title}

${itemsText}`;
  },

  // ============================================
  // KANBAN MARKDOWN
  // ============================================
  kanban: (title, columns = []) => {
    const columnsText = columns.map(col => {
      const cardsText = col.cards.map(card => {
        const priority = card.priority ? `[${card.priority.toUpperCase()}]` : '';
        return `  - ${priority} ${card.title}${card.assignee ? ` (@${card.assignee})` : ''}`;
      }).join('\n');

      return `## ${col.title} (${col.cards.length})
${cardsText}`;
    }).join('\n\n');

    return `# 📋 ${title}

${columnsText}`;
  },

  // ============================================
  // CALENDAR EVENTS MARKDOWN
  // ============================================
  calendar: (title, events = []) => {
    const eventsText = events.map(event => {
      const emoji = {
        'blue': '🔵',
        'green': '🟢',
        'purple': '🟣',
        'orange': '🟠',
        'red': '🔴'
      }[event.color] || '📅';

      return `${emoji} **${event.title}**
📅 ${event.date} ⏰ ${event.time}
${event.location ? `📍 ${event.location}` : ''}
${event.attendees ? `👥 ${event.attendees} asistentes` : ''}
${event.description || ''}`;
    }).join('\n\n---\n\n');

    return `# 📅 ${title}

${eventsText}`;
  },

  // ============================================
  // PRICING CARDS MARKDOWN
  // ============================================
  pricing: (title, plans = []) => {
    const plansText = plans.map(plan => {
      const badge = plan.highlighted ? '⭐ **POPULAR**' : '';
      const features = plan.features
        .map(f => `  ${f.included ? '✓' : '✗'} ${f.text}`)
        .join('\n');

      return `### ${plan.name} ${badge}
# ${plan.price}${plan.period ? `/${plan.period}` : ''}

${plan.description || ''}

**Características:**
${features}`;
    }).join('\n\n---\n\n');

    return `# 💎 ${title}

${plansText}`;
  },

  // ============================================
  // GALLERY MARKDOWN
  // ============================================
  gallery: (title, items = []) => {
    const itemsText = items.map(item => {
      const stats = item.stats
        ? `👁️ ${item.stats.views || 0} | ❤️ ${item.stats.likes || 0} | ⬇️ ${item.stats.downloads || 0}`
        : '';

      return `### ${item.title}
${item.category ? `[${item.category}]` : ''}
${item.description || ''}
${stats}
🔗 ${item.image || 'Sin imagen'}`;
    }).join('\n\n');

    return `# 🖼️ ${title}

${itemsText}`;
  },

  // ============================================
  // NOTIFICATIONS MARKDOWN
  // ============================================
  notifications: (title, notifications = []) => {
    const notifText = notifications.map(notif => {
      const typeEmoji = {
        'success': '✅',
        'error': '❌',
        'warning': '⚠️',
        'info': 'ℹ️',
        'message': '💬',
        'like': '❤️',
        'follow': '👤',
        'system': '⚙️'
      }[notif.type] || '📢';

      const readBadge = notif.read ? '' : '🔔 **NUEVA**';

      return `${typeEmoji} **${notif.title}** ${readBadge}
${notif.message}
🕐 ${notif.timestamp}`;
    }).join('\n\n---\n\n');

    return `# 🔔 ${title}

${notifText}`;
  },

  // ============================================
  // ACTIVITY FEED MARKDOWN
  // ============================================
  activity: (title, activities = []) => {
    const activityText = activities.map(activity => {
      const typeEmoji = {
        'user': '👤',
        'like': '❤️',
        'comment': '💬',
        'share': '🔄',
        'star': '⭐',
        'award': '🏆',
        'commit': '💻',
        'post': '📝',
        'image': '🖼️'
      }[activity.type] || '📌';

      return `${typeEmoji} **${activity.user.name}** ${activity.action} ${activity.target || ''}
${activity.details || ''}
🕐 ${activity.timestamp}`;
    }).join('\n\n');

    return `# 📰 ${title}

${activityText}`;
  }
};
