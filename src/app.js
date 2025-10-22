import express from "express";
import cors from "cors";
import { widgetGenerators } from "./widgets/generators.js";
import { getOpenAPISchema } from "./config/openapi.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

// ============================================
// ROUTES BÁSICAS
// ============================================

app.get("/", (req, res) => {
  res.json({
    name: "ChatGPT Dynamic Widgets API",
    version: "2.0.0",
    description: "API que genera widgets dinámicos para tu GPT de ChatGPT",
    endpoints: {
      health: "/health",
      dashboard: "/api/widget/dashboard",
      chart: "/api/widget/chart",
      table: "/api/widget/table",
      timeline: "/api/widget/timeline",
      comparison: "/api/widget/comparison",
      openapi: "/openapi.json"
    },
    widgets: [
      "Dashboard - Panel con métricas",
      "Chart - Gráficos interactivos",
      "Table - Tablas de datos",
      "Timeline - Líneas de tiempo",
      "Comparison - Comparaciones"
    ],
    docs: "Ver README.md para instrucciones completas"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: "2.0.0"
  });
});

// ============================================
// WIDGET ENDPOINTS (SIN AUTENTICACIÓN PARA GPT)
// ============================================

// Dashboard Widget
app.post("/api/widget/dashboard", (req, res) => {
  try {
    const { title, metrics, theme = "light" } = req.body;

    if (!title || !metrics || !Array.isArray(metrics)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Se requiere 'title' (string) y 'metrics' (array)"
      });
    }

    const html = widgetGenerators.dashboard(title, metrics, theme);
    res.json({ success: true, html });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
});

// Chart Widget
app.post("/api/widget/chart", (req, res) => {
  try {
    const { title, type, data, labels } = req.body;

    if (!title || !type || !data || !labels) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Se requiere 'title', 'type', 'data' y 'labels'"
      });
    }

    const html = widgetGenerators.chart(title, type, data, labels);
    res.json({ success: true, html });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
});

// Table Widget
app.post("/api/widget/table", (req, res) => {
  try {
    const { title, headers, rows, sortable = true } = req.body;

    if (!title || !headers || !rows) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Se requiere 'title', 'headers' y 'rows'"
      });
    }

    const html = widgetGenerators.table(title, headers, rows, sortable);
    res.json({ success: true, html });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
});

// Timeline Widget
app.post("/api/widget/timeline", (req, res) => {
  try {
    const { title, events } = req.body;

    if (!title || !events || !Array.isArray(events)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Se requiere 'title' (string) y 'events' (array)"
      });
    }

    const html = widgetGenerators.timeline(title, events);
    res.json({ success: true, html });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
});

// Comparison Widget
app.post("/api/widget/comparison", (req, res) => {
  try {
    const { title, items } = req.body;

    if (!title || !items || !Array.isArray(items)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Se requiere 'title' (string) y 'items' (array)"
      });
    }

    const html = widgetGenerators.comparison(title, items);
    res.json({ success: true, html });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
});

// ============================================
// OPENAPI SCHEMA
// ============================================

app.get("/openapi.json", (req, res) => {
  const baseUrl = process.env.BASE_URL ||
                  process.env.RAILWAY_PUBLIC_DOMAIN ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` :
                  `http://localhost:${PORT}`;

  const schema = getOpenAPISchema(baseUrl);
  res.json(schema);
});

// ============================================
// ERROR HANDLING
// ============================================

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════╗
║  🚀 ChatGPT Dynamic Widgets API v2.0         ║
╠═══════════════════════════════════════════════╣
║  Server: http://localhost:${PORT}             ║
║  Health: /health                             ║
║  OpenAPI: /openapi.json                      ║
╚═══════════════════════════════════════════════╝

📊 Widgets Disponibles:
  • Dashboard - Panel de métricas
  • Chart - Gráficos interactivos
  • Table - Tablas de datos
  • Timeline - Líneas de tiempo
  • Comparison - Comparaciones

🤖 Configurar GPT:
  1. Importa: ${process.env.BASE_URL || `http://localhost:${PORT}`}/openapi.json
  2. Copia instrucciones de GPT_INSTRUCTIONS.md
  3. ¡Prueba: "Muéstrame un dashboard"!

📚 Docs: Ver README.md
  `);
});

export default app;
