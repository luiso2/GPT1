import express from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({
    name: "ChatGPT Widget API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      widget: "/api/widget/generate",
      openapi: "/openapi.json"
    }
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/widget/generate", (req, res) => {
  const { type = "dashboard", title = "Widget" } = req.query;
  
  const html = `<!DOCTYPE html>
<html>
<head>
    <title>${title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">${title}</h1>
        <div class="grid grid-cols-3 gap-4">
            <div class="bg-white p-6 rounded-lg shadow">
                <div class="text-4xl font-bold text-blue-600">1,234</div>
                <div class="text-gray-600 mt-2">Usuarios</div>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
                <div class="text-4xl font-bold text-green-600">$45.6K</div>
                <div class="text-gray-600 mt-2">Ingresos</div>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
                <div class="text-4xl font-bold text-purple-600">98%</div>
                <div class="text-gray-600 mt-2">Satisfacción</div>
            </div>
        </div>
    </div>
</body>
</html>`;
  
  res.json({ success: true, html });
});

app.get("/openapi.json", (req, res) => {
  res.json({
    openapi: "3.1.0",
    info: {
      title: "ChatGPT Widget API",
      version: "1.0.0",
      description: "API para generar widgets configurables"
    },
    servers: [{url: "http://localhost:3000"}],
    paths: {
      "/api/widget/generate": {
        get: {
          operationId: "generateWidget",
          summary: "Genera un widget HTML",
          parameters: [{
            name: "type",
            in: "query",
            schema: {type: "string", default: "dashboard"}
          }, {
            name: "title",
            in: "query",
            schema: {type: "string", default: "Widget"}
          }],
          responses: {
            "200": {description: "Widget generado"}
          }
        }
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
