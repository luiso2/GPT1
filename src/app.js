import express from "express";
import cors from "cors";
import { widgetGenerators } from "./widgets/generators.js";
import { markdownGenerators } from "./widgets/markdown-generators.js";
import { getOpenAPISchema } from "./config/openapi.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Frontend URL for widget links
const FRONTEND_URL = process.env.FRONTEND_URL ||
                     "https://frontend-production-d329.up.railway.app";

// In-memory widget storage (in production, use Redis or DB)
const widgetStore = new Map();

// Helper to generate widget URL
const generateWidgetURL = (widgetType, widgetId, data) => {
  // Include type in the data object for frontend compatibility
  const widgetData = { ...data, type: widgetType };
  widgetStore.set(widgetId, { type: widgetType, data: widgetData, createdAt: new Date() });
  return `${FRONTEND_URL}/widgets/${widgetType}?id=${widgetId}`;
};

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
      tree: "/api/widget/tree",
      openapi: "/openapi.json"
    },
    widgets: [
      "Dashboard - Panel con métricas",
      "Chart - Gráficos interactivos",
      "Table - Tablas de datos",
      "Timeline - Líneas de tiempo",
      "Comparison - Comparaciones",
      "Tree - Estructuras jerárquicas",
      "Stats - Tarjetas de estadísticas",
      "Progress - Barras de progreso",
      "Kanban - Tableros tipo Trello",
      "Calendar - Calendario de eventos",
      "Pricing - Cartas de precios",
      "Gallery - Galería de imágenes",
      "Notifications - Notificaciones",
      "Activity - Feed de actividades"
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
// WIDGET RETRIEVAL ENDPOINTS
// ============================================

// Get widget data by ID (primary endpoint)
app.get("/api/widget/data/:id", (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📥 Fetching widget data for ID: ${id}`);

    const widget = widgetStore.get(id);

    if (!widget) {
      console.log(`⚠️ Widget not found: ${id}`);
      return res.status(404).json({
        success: false,
        error: "Widget not found",
        message: `No widget found with ID: ${id}`
      });
    }

    console.log(`✅ Widget found: ${id} (type: ${widget.type})`);

    // Merge type into data for consistent structure
    const widgetData = {
      ...widget.data,
      type: widget.type
    };

    res.json({
      success: true,
      widget: widgetData,
      widgetId: id,
      type: widget.type,
      createdAt: widget.createdAt
    });
  } catch (error) {
    console.error(`❌ Error fetching widget ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: error.message
    });
  }
});

// Alternative endpoint for backwards compatibility
app.get("/api/widgets/:id", (req, res) => {
  try {
    const { id } = req.params;
    const widget = widgetStore.get(id);

    if (!widget) {
      return res.status(404).json({
        success: false,
        error: "Widget not found",
        message: `No widget found with ID: ${id}`
      });
    }

    // Merge type into data for consistent structure
    const widgetData = {
      ...widget.data,
      type: widget.type
    };

    res.json({
      success: true,
      widget: widgetData,
      data: widgetData, // Alternative property name
      type: widget.type,
      createdAt: widget.createdAt
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: error.message
    });
  }
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

    // Generate unique ID and widget URL
    const widgetId = crypto.randomBytes(8).toString("hex");
    const widgetUrl = generateWidgetURL("dashboard", widgetId, { title, metrics, theme });

    // Generar markdown para ChatGPT
    const markdown = markdownGenerators.dashboard(title, metrics);

    res.json({
      success: true,
      content: markdown,
      widgetUrl: widgetUrl,
      widgetId: widgetId,
      type: "markdown"
    });
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

    // Generate unique ID and widget URL
    const widgetId = crypto.randomBytes(8).toString("hex");
    // Rename 'type' to 'chartType' to avoid conflict with widget type
    const widgetUrl = generateWidgetURL("chart", widgetId, { title, chartType: type, data, labels });

    // Generar markdown para ChatGPT
    const markdown = markdownGenerators.chart(title, type, data, labels);

    res.json({
      success: true,
      content: markdown,
      widgetUrl: widgetUrl,
      widgetId: widgetId,
      type: "markdown"
    });
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

    // Generate unique ID and widget URL
    const widgetId = crypto.randomBytes(8).toString("hex");
    const widgetUrl = generateWidgetURL("table", widgetId, { title, headers, rows, sortable });

    // Generar markdown para ChatGPT
    const markdown = markdownGenerators.table(title, headers, rows);

    res.json({
      success: true,
      content: markdown,
      widgetUrl: widgetUrl,
      widgetId: widgetId,
      type: "markdown"
    });
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

    // Generate unique ID and widget URL
    const widgetId = crypto.randomBytes(8).toString("hex");
    const widgetUrl = generateWidgetURL("timeline", widgetId, { title, events });

    // Generar markdown para ChatGPT
    const markdown = markdownGenerators.timeline(title, events);

    res.json({
      success: true,
      content: markdown,
      widgetUrl: widgetUrl,
      widgetId: widgetId,
      type: "markdown"
    });
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

    // Generate unique ID and widget URL
    const widgetId = crypto.randomBytes(8).toString("hex");
    const widgetUrl = generateWidgetURL("comparison", widgetId, { title, items });

    // Generar markdown para ChatGPT
    const markdown = markdownGenerators.comparison(title, items);

    res.json({
      success: true,
      content: markdown,
      widgetUrl: widgetUrl,
      widgetId: widgetId,
      type: "markdown"
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
});

// Tree Widget
app.post("/api/widget/tree", (req, res) => {
  try {
    const { title, data, variant = "premium" } = req.body;

    if (!title || !data || !Array.isArray(data)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Se requiere 'title' (string) y 'data' (array de nodos)"
      });
    }

    const markdown = markdownGenerators.tree(title, data, variant);
    res.json({ success: true, content: markdown, type: "markdown" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

// Stats Cards Widget
app.post("/api/widget/stats", (req, res) => {
  try {
    const { title, stats } = req.body;
    if (!title || !stats || !Array.isArray(stats)) {
      return res.status(400).json({ error: "Bad Request", message: "Se requiere 'title' y 'stats' (array)" });
    }
    const markdown = markdownGenerators.stats(title, stats);
    res.json({ success: true, content: markdown, type: "markdown" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

// Progress Widget
app.post("/api/widget/progress", (req, res) => {
  try {
    const { title, items } = req.body;
    if (!title || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: "Bad Request", message: "Se requiere 'title' e 'items' (array)" });
    }
    const markdown = markdownGenerators.progress(title, items);
    res.json({ success: true, content: markdown, type: "markdown" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

// Kanban Widget
app.post("/api/widget/kanban", (req, res) => {
  try {
    const { title, columns } = req.body;
    if (!title || !columns || !Array.isArray(columns)) {
      return res.status(400).json({ error: "Bad Request", message: "Se requiere 'title' y 'columns' (array)" });
    }
    const markdown = markdownGenerators.kanban(title, columns);
    res.json({ success: true, content: markdown, type: "markdown" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

// Calendar Events Widget
app.post("/api/widget/calendar", (req, res) => {
  try {
    const { title, events } = req.body;
    if (!title || !events || !Array.isArray(events)) {
      return res.status(400).json({ error: "Bad Request", message: "Se requiere 'title' y 'events' (array)" });
    }
    const markdown = markdownGenerators.calendar(title, events);
    res.json({ success: true, content: markdown, type: "markdown" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

// Pricing Cards Widget
app.post("/api/widget/pricing", (req, res) => {
  try {
    const { title, plans } = req.body;
    if (!title || !plans || !Array.isArray(plans)) {
      return res.status(400).json({ error: "Bad Request", message: "Se requiere 'title' y 'plans' (array)" });
    }
    const markdown = markdownGenerators.pricing(title, plans);
    res.json({ success: true, content: markdown, type: "markdown" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

// Gallery Widget
app.post("/api/widget/gallery", (req, res) => {
  try {
    const { title, items } = req.body;
    if (!title || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: "Bad Request", message: "Se requiere 'title' e 'items' (array)" });
    }
    const markdown = markdownGenerators.gallery(title, items);
    res.json({ success: true, content: markdown, type: "markdown" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

// Notifications Widget
app.post("/api/widget/notifications", (req, res) => {
  try {
    const { title, notifications } = req.body;
    if (!title || !notifications || !Array.isArray(notifications)) {
      return res.status(400).json({ error: "Bad Request", message: "Se requiere 'title' y 'notifications' (array)" });
    }
    const markdown = markdownGenerators.notifications(title, notifications);
    res.json({ success: true, content: markdown, type: "markdown" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

// Activity Feed Widget
app.post("/api/widget/activity", (req, res) => {
  try {
    const { title, activities } = req.body;
    if (!title || !activities || !Array.isArray(activities)) {
      return res.status(400).json({ error: "Bad Request", message: "Se requiere 'title' y 'activities' (array)" });
    }
    const markdown = markdownGenerators.activity(title, activities);
    res.json({ success: true, content: markdown, type: "markdown" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

// ============================================
// OPENAPI SCHEMA
// ============================================

app.get("/openapi.json", (req, res) => {
  // Use simplified schema with only 5 widgets
  const schemaPath = join(__dirname, "config", "openapi-simple.json");
  const schema = JSON.parse(readFileSync(schemaPath, "utf8"));
  res.json(schema);
});

// Full schema endpoint (14 widgets) - for reference
app.get("/openapi-full.json", (req, res) => {
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

📊 Widgets Disponibles (14 tipos):
  • Dashboard, Chart, Table, Timeline, Comparison, Tree
  • Stats, Progress, Kanban, Calendar, Pricing
  • Gallery, Notifications, Activity Feed

🤖 Configurar GPT:
  1. Importa: ${process.env.BASE_URL || `http://localhost:${PORT}`}/openapi.json
  2. Copia instrucciones de GPT_INSTRUCTIONS.md
  3. ¡Prueba: "Muéstrame un dashboard"!

📚 Docs: Ver README.md
  `);
});

export default app;
