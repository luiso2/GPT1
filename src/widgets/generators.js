/**
 * Generadores de Widgets Dinámicos
 * Cada función genera HTML completamente estilizado con Tailwind CSS
 */

export const widgetGenerators = {

  // ============================================
  // DASHBOARD WIDGET
  // ============================================
  dashboard: (title, metrics = [], theme = "light") => {
    const bgColor = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
    const textColor = theme === "dark" ? "text-white" : "text-gray-900";

    const metricsHTML = metrics.map(m => `
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all">
        <div class="text-3xl font-bold ${m.color || 'text-blue-600'} mb-2">
          ${m.value}
        </div>
        <div class="text-gray-600 dark:text-gray-300 font-medium">${m.label}</div>
        ${m.change ? `
          <div class="mt-2 text-sm ${m.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}">
            ${m.change}
          </div>
        ` : ''}
      </div>
    `).join('');

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="${bgColor} ${textColor} p-8 min-h-screen">
    <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-bold mb-8 ${textColor}">${title}</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(metrics.length, 4)} gap-6">
            ${metricsHTML}
        </div>
    </div>
</body>
</html>`;
  },

  // ============================================
  // METRICS WIDGET
  // ============================================
  metrics: (metrics = [], layout = "grid") => {
    const metricsHTML = metrics.map(m => `
      <div class="bg-gradient-to-br from-${m.color || 'blue'}-500 to-${m.color || 'blue'}-700 p-6 rounded-xl shadow-xl text-white">
        <div class="flex items-center justify-between mb-4">
          <div class="text-sm font-semibold uppercase opacity-90">${m.label}</div>
          ${m.icon ? `<span class="text-2xl">${m.icon}</span>` : ''}
        </div>
        <div class="text-4xl font-bold mb-2">${m.value}</div>
        ${m.subtitle ? `<div class="text-sm opacity-80">${m.subtitle}</div>` : ''}
      </div>
    `).join('');

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Métricas</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${layout === 'grid' ? '3' : '2'} gap-6">
            ${metricsHTML}
        </div>
    </div>
</body>
</html>`;
  },

  // ============================================
  // CHART WIDGET (con Chart.js)
  // ============================================
  chart: (title, type = "bar", data = [], labels = []) => {
    const chartId = `chart_${Date.now()}`;

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="bg-white p-8">
    <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">${title}</h2>
        <div class="bg-white p-6 rounded-lg shadow-lg">
            <canvas id="${chartId}"></canvas>
        </div>
    </div>
    <script>
        const ctx = document.getElementById('${chartId}').getContext('2d');
        new Chart(ctx, {
            type: '${type}',
            data: {
                labels: ${JSON.stringify(labels)},
                datasets: [{
                    label: '${title}',
                    data: ${JSON.stringify(data)},
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(249, 115, 22, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(168, 85, 247, 0.8)',
                        'rgba(236, 72, 153, 0.8)'
                    ],
                    borderColor: [
                        'rgba(59, 130, 246, 1)',
                        'rgba(16, 185, 129, 1)',
                        'rgba(249, 115, 22, 1)',
                        'rgba(239, 68, 68, 1)',
                        'rgba(168, 85, 247, 1)',
                        'rgba(236, 72, 153, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: ${type !== 'pie' && type !== 'doughnut'} }
                }
            }
        });
    </script>
</body>
</html>`;
  },

  // ============================================
  // TABLE WIDGET
  // ============================================
  table: (title, headers = [], rows = [], sortable = true) => {
    const headersHTML = headers.map(h => `
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        ${h}
      </th>
    `).join('');

    const rowsHTML = rows.map((row, idx) => `
      <tr class="${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors">
        ${row.map(cell => `
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${cell}</td>
        `).join('')}
      </tr>
    `).join('');

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">${title}</h2>
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-800 text-white">
                        <tr>${headersHTML}</tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${rowsHTML}
                    </tbody>
                </table>
            </div>
        </div>
        <div class="mt-4 text-sm text-gray-600 text-right">
            Total: ${rows.length} registros
        </div>
    </div>
</body>
</html>`;
  },

  // ============================================
  // CARD WIDGET
  // ============================================
  card: (title, content, image = null, actions = []) => {
    const actionsHTML = actions.map(a => `
      <button class="px-6 py-2 bg-${a.color || 'blue'}-600 text-white rounded-lg hover:bg-${a.color || 'blue'}-700 transition-colors font-medium">
        ${a.label}
      </button>
    `).join('');

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-xl shadow-2xl overflow-hidden">
            ${image ? `
                <img src="${image}" alt="${title}" class="w-full h-64 object-cover">
            ` : ''}
            <div class="p-8">
                <h2 class="text-3xl font-bold mb-4 text-gray-800">${title}</h2>
                <div class="text-gray-600 mb-6 leading-relaxed">${content}</div>
                ${actionsHTML ? `
                    <div class="flex gap-4 flex-wrap">
                        ${actionsHTML}
                    </div>
                ` : ''}
            </div>
        </div>
    </div>
</body>
</html>`;
  },

  // ============================================
  // TIMELINE WIDGET
  // ============================================
  timeline: (title, events = []) => {
    const eventsHTML = events.map((event, idx) => `
      <div class="flex gap-6 ${idx !== events.length - 1 ? 'pb-8' : ''}">
        <div class="flex flex-col items-center">
          <div class="w-4 h-4 bg-${event.color || 'blue'}-600 rounded-full"></div>
          ${idx !== events.length - 1 ? '<div class="flex-1 w-0.5 bg-gray-300 my-2"></div>' : ''}
        </div>
        <div class="flex-1 pb-8">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="text-sm text-gray-500 mb-2">${event.date}</div>
            <h3 class="text-xl font-bold mb-2 text-gray-800">${event.title}</h3>
            <p class="text-gray-600">${event.description}</p>
          </div>
        </div>
      </div>
    `).join('');

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold mb-8 text-gray-800">${title}</h2>
        <div class="relative">
            ${eventsHTML}
        </div>
    </div>
</body>
</html>`;
  },

  // ============================================
  // COMPARISON WIDGET
  // ============================================
  comparison: (title, items = []) => {
    const itemsHTML = items.map(item => `
      <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
        <h3 class="text-2xl font-bold mb-4 text-center ${item.highlight ? 'text-blue-600' : 'text-gray-800'}">
          ${item.name}
        </h3>
        ${item.price ? `
          <div class="text-4xl font-bold text-center mb-6 ${item.highlight ? 'text-blue-600' : 'text-gray-900'}">
            ${item.price}
          </div>
        ` : ''}
        <ul class="space-y-3">
          ${item.features.map(f => `
            <li class="flex items-start gap-3">
              <span class="text-green-600 mt-1">✓</span>
              <span class="text-gray-600">${f}</span>
            </li>
          `).join('')}
        </ul>
        ${item.highlight ? `
          <div class="mt-6 text-center">
            <div class="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Recomendado
            </div>
          </div>
        ` : ''}
      </div>
    `).join('');

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold mb-8 text-center text-gray-800">${title}</h2>
        <div class="grid grid-cols-1 md:grid-cols-${Math.min(items.length, 3)} gap-8">
            ${itemsHTML}
        </div>
    </div>
</body>
</html>`;
  }
};
