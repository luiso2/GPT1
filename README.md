# 🎨 ChatGPT Dynamic Widgets API

API completa para crear un GPT que **muestra widgets dinámicos automáticamente** según la conversación.

## ✨ Características

- 🎯 **5 tipos de widgets** profesionales
- 🤖 **Integración automática** con ChatGPT GPT Actions
- 🎨 **Diseño profesional** con Tailwind CSS
- 📊 **Gráficos interactivos** con Chart.js
- ⚡ **Deploy en Railway** listo
- 📱 **Responsive** y mobile-friendly

## 🚀 Quick Start

### 1. Instalación Local (para pruebas)

```bash
cd /Users/josemichaelhernandezvargas/Desktop/chatgpt-widget-api-express
npm install
npm start
```

Servidor corriendo en: http://localhost:3000

### 2. Verificar que Funciona

```bash
# Health check
curl http://localhost:3000/health

# Ver OpenAPI schema
curl http://localhost:3000/openapi.json

# Probar dashboard
curl -X POST http://localhost:3000/api/widget/dashboard \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi Dashboard",
    "metrics": [
      {"value": "$45K", "label": "Ventas", "color": "text-green-600"}
    ]
  }'
```

## 📦 Widgets Disponibles

### 1. 📊 Dashboard Widget
Panel completo con múltiples métricas

**Endpoint:** `POST /api/widget/dashboard`

**Payload:**
```json
{
  "title": "Dashboard de Ventas",
  "metrics": [
    {
      "value": "$125,430",
      "label": "Ingresos Totales",
      "color": "text-green-600",
      "change": "+18%"
    }
  ],
  "theme": "light"
}
```

### 2. 📈 Chart Widget
Gráficos interactivos con Chart.js

**Endpoint:** `POST /api/widget/chart`

**Payload:**
```json
{
  "title": "Ventas Mensuales",
  "type": "bar",
  "data": [12, 19, 15, 25, 22, 30],
  "labels": ["Ene", "Feb", "Mar", "Abr", "May", "Jun"]
}
```

**Tipos:** bar, line, pie, doughnut, radar

### 3. 📋 Table Widget
Tablas de datos estilizadas

**Endpoint:** `POST /api/widget/table`

**Payload:**
```json
{
  "title": "Top Clientes",
  "headers": ["Cliente", "Ventas", "Estado"],
  "rows": [
    ["Acme Corp", "$45,000", "Activo"],
    ["Tech Inc", "$38,000", "Activo"]
  ]
}
```

### 4. 🕐 Timeline Widget
Líneas de tiempo cronológicas

**Endpoint:** `POST /api/widget/timeline`

**Payload:**
```json
{
  "title": "Historia del Proyecto",
  "events": [
    {
      "date": "15 Enero 2025",
      "title": "Lanzamiento",
      "description": "Primera versión",
      "color": "blue"
    }
  ]
}
```

### 5. ⚖️ Comparison Widget
Comparaciones lado a lado

**Endpoint:** `POST /api/widget/comparison`

**Payload:**
```json
{
  "title": "Planes",
  "items": [
    {
      "name": "Básico",
      "price": "$9/mes",
      "features": ["5 usuarios", "10GB"]
    },
    {
      "name": "Pro",
      "price": "$29/mes",
      "features": ["Usuarios ilimitados", "100GB"],
      "highlight": true
    }
  ]
}
```

## 🚂 Deploy a Railway

Tu proyecto **YA ESTÁ en Railway**. Para actualizar:

```bash
# Opción 1: Push automático (si está conectado a Git)
git add .
git commit -m "Update: Dynamic Widgets v2.0"
git push

# Opción 2: Railway CLI
railway up
```

### Obtener tu URL de Railway

```bash
railway status
# o visita: https://railway.app/dashboard
```

Tu API estará en: `https://tu-proyecto.up.railway.app`

## 🤖 Configurar el GPT en ChatGPT

### Paso 1: Crear el GPT

1. Ve a **ChatGPT** → https://chatgpt.com
2. Click en tu nombre → **My GPTs**
3. Click **Create a GPT**

### Paso 2: Configuración Básica

**Name:** Widget Master

**Description:**
```
Asistente que visualiza información mediante widgets dinámicos interactivos.
```

**Instructions:**
Abre `GPT_INSTRUCTIONS.md` y **copia TODO el contenido** en el campo Instructions.

### Paso 3: Configurar Actions

1. En tu GPT, ve a **Configure** → **Actions**
2. Click **Create new action**
3. Click **Import from URL**
4. Pega tu URL de Railway: `https://tu-proyecto.railway.app/openapi.json`
5. Click **Import**
6. Verifica que veas todos los endpoints:
   - createDashboard
   - createChart
   - createTable
   - createTimeline
   - createComparison
7. Click **Save**

### Paso 4: Probar el GPT

Inicia una conversación:

```
"Muéstrame un dashboard con métricas de ventas"
"Crea un gráfico de las ventas por mes"
"Lista los 5 mejores productos en una tabla"
"Muéstrame un timeline del proyecto"
"Compara los planes básico vs premium"
```

El GPT **automáticamente generará y mostrará los widgets**! 🎨

## 💬 Ejemplos de Prompts

### Para Dashboard
- "Muéstrame un dashboard general"
- "Dame un resumen de métricas"
- "Panel de control con indicadores clave"

### Para Gráficos
- "Gráfico de ventas mensuales"
- "Muestra las tendencias en un chart"
- "Visualiza estos datos en barras"

### Para Tablas
- "Lista de productos más vendidos"
- "Tabla con información de clientes"
- "Muéstrame los datos en formato tabla"

### Para Timeline
- "Cronología del proyecto"
- "Historia de la empresa"
- "Timeline de eventos"

### Para Comparaciones
- "Compara estos planes"
- "Diferencias entre opciones A y B"
- "Análisis comparativo"

## 🔧 Estructura del Proyecto

```
chatgpt-widget-api-express/
├── src/
│   ├── app.js                    # Servidor Express principal
│   ├── widgets/
│   │   └── generators.js         # Generadores de widgets
│   ├── config/
│   │   └── openapi.js           # OpenAPI schema
│   └── middleware/
│       └── auth.js              # Autenticación (no usada)
├── package.json
├── README.md                     # Este archivo
├── GPT_INSTRUCTIONS.md          # Instrucciones para el GPT
├── OPENAPI_SCHEMA_FOR_GPT.json  # Schema anterior
└── API_DOCUMENTATION.md         # Docs antiguas
```

## 🐛 Troubleshooting

### El GPT no llama a los endpoints

**Solución:** Verifica que el OpenAPI schema esté importado:
- Ve a tu GPT → Actions
- Verifica que veas todos los endpoints
- Re-importa desde `/openapi.json`

### Los widgets no se muestran

**Solución:**
1. Verifica que tu API en Railway esté funcionando:
   ```bash
   curl https://tu-proyecto.railway.app/health
   ```
2. Verifica CORS: `origin: "*"` en app.js
3. Verifica que retorne `{ success: true, html: "..." }`

### Error "Module not found"

**Solución:**
```bash
npm install
```

### Actualizar en Railway

```bash
# Si usas Git
git add .
git commit -m "Update"
git push

# O con Railway CLI
railway up
```

## 📚 Recursos

- [OpenAI GPT Actions](https://platform.openai.com/docs/actions)
- [OpenAPI 3.1.0 Spec](https://spec.openapis.org/oas/v3.1.0)
- [Tailwind CSS](https://tailwindcss.com)
- [Chart.js](https://www.chartjs.org)
- [Railway Docs](https://docs.railway.app)

## 🎯 Próximos Pasos

1. ✅ **Tu API ya está en Railway**
2. ⬜ **Configura tu GPT** (5 minutos)
   - Importa OpenAPI schema
   - Copia GPT_INSTRUCTIONS.md
3. ⬜ **Prueba widgets** (2 minutos)
   - "Muéstrame un dashboard"
   - "Crea un gráfico"
4. ⬜ **Disfruta** 🎉

## 📄 Licencia

MIT

---

**Hecho con ❤️ para ChatGPT GPTs**

¿Preguntas? Abre un issue en GitHub.
