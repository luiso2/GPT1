/**
 * OpenAPI 3.1.0 Schema para GPT Actions
 * Define todos los endpoints y sus comportamientos
 */

export const getOpenAPISchema = (baseUrl) => ({
  openapi: "3.1.0",
  info: {
    title: "ChatGPT Dynamic Widgets API",
    version: "2.0.0",
    description: `
API que genera widgets HTML dinámicos e interactivos para mostrar en ChatGPT.

## Tipos de Widgets Disponibles:

1. **Dashboard** - Panel de métricas general
2. **Metrics** - Tarjetas de métricas individuales
3. **Chart** - Gráficos (bar, line, pie, doughnut)
4. **Table** - Tablas de datos
5. **Card** - Tarjetas de contenido
6. **Timeline** - Líneas de tiempo
7. **Comparison** - Comparaciones lado a lado

Todos los widgets retornan HTML completamente estilizado que se puede renderizar directamente.
    `,
    contact: {
      name: "API Support",
      url: "https://github.com/luiso2/GPT1"
    }
  },
  servers: [
    {
      url: baseUrl,
      description: "Servidor principal"
    }
  ],
  paths: {
    "/health": {
      get: {
        operationId: "checkHealth",
        summary: "Verificar estado del servidor",
        description: "Health check endpoint",
        tags: ["System"],
        security: [],
        responses: {
          "200": {
            description: "Servidor funcionando",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    timestamp: { type: "string" }
                  }
                }
              }
            }
          }
        }
      }
    },

    "/api/widget/dashboard": {
      post: {
        operationId: "createDashboard",
        summary: "Crear dashboard de métricas",
        description: `Genera un dashboard completo con múltiples métricas. Úsalo cuando el usuario pida ver "dashboard", "panel", "resumen general" o necesite visualizar múltiples métricas juntas.`,
        tags: ["Widgets"],
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "metrics"],
                properties: {
                  title: {
                    type: "string",
                    description: "Título del dashboard",
                    example: "Dashboard de Ventas Enero 2025"
                  },
                  metrics: {
                    type: "array",
                    description: "Array de métricas a mostrar",
                    items: {
                      type: "object",
                      required: ["value", "label"],
                      properties: {
                        value: { type: "string", example: "$45,678" },
                        label: { type: "string", example: "Ingresos Totales" },
                        color: { type: "string", example: "text-blue-600" },
                        change: { type: "string", example: "+12% vs mes anterior" }
                      }
                    }
                  },
                  theme: {
                    type: "string",
                    enum: ["light", "dark"],
                    default: "light"
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Dashboard generado exitosamente"
          }
        }
      }
    },

    "/api/widget/chart": {
      post: {
        operationId: "createChart",
        summary: "Crear gráfico interactivo",
        description: `Genera gráficos interactivos usando Chart.js. Úsalo cuando el usuario pida ver "gráfico", "gráfica", "chart" o necesite visualizar tendencias o comparaciones.`,
        tags: ["Widgets"],
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "type", "data", "labels"],
                properties: {
                  title: { type: "string", example: "Ventas Mensuales 2025" },
                  type: {
                    type: "string",
                    enum: ["bar", "line", "pie", "doughnut", "radar"],
                    example: "bar"
                  },
                  data: {
                    type: "array",
                    items: { type: "number" },
                    example: [12, 19, 3, 5, 2, 3]
                  },
                  labels: {
                    type: "array",
                    items: { type: "string" },
                    example: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"]
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Gráfico generado exitosamente"
          }
        }
      }
    },

    "/api/widget/table": {
      post: {
        operationId: "createTable",
        summary: "Crear tabla de datos",
        description: `Genera una tabla HTML estilizada con datos tabulares. Úsalo cuando el usuario pida ver "tabla", "listado", "datos tabulares" o necesite ver información estructurada.`,
        tags: ["Widgets"],
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "headers", "rows"],
                properties: {
                  title: { type: "string", example: "Top 10 Clientes" },
                  headers: {
                    type: "array",
                    items: { type: "string" },
                    example: ["Cliente", "Ventas", "Pedidos", "Estado"]
                  },
                  rows: {
                    type: "array",
                    items: {
                      type: "array",
                      items: { type: "string" }
                    },
                    example: [
                      ["Acme Corp", "$45,000", "23", "Activo"],
                      ["Tech Inc", "$38,000", "19", "Activo"]
                    ]
                  },
                  sortable: { type: "boolean", default: true }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Tabla generada exitosamente"
          }
        }
      }
    },

    "/api/widget/timeline": {
      post: {
        operationId: "createTimeline",
        summary: "Crear línea de tiempo",
        description: `Genera una línea de tiempo visual con eventos cronológicos. Úsalo cuando el usuario pida ver "timeline", "cronología", "historial" o necesite visualizar eventos en orden temporal.`,
        tags: ["Widgets"],
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "events"],
                properties: {
                  title: { type: "string", example: "Historia del Proyecto" },
                  events: {
                    type: "array",
                    items: {
                      type: "object",
                      required: ["date", "title", "description"],
                      properties: {
                        date: { type: "string", example: "15 Enero 2025" },
                        title: { type: "string", example: "Lanzamiento Beta" },
                        description: { type: "string", example: "Primera versión beta lanzada" },
                        color: { type: "string", example: "blue" }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Timeline generado exitosamente"
          }
        }
      }
    },

    "/api/widget/comparison": {
      post: {
        operationId: "createComparison",
        summary: "Crear comparación lado a lado",
        description: `Genera una comparación visual de múltiples opciones/productos. Úsalo cuando el usuario pida "comparar", "vs", "diferencias" o necesite ver opciones lado a lado.`,
        tags: ["Widgets"],
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "items"],
                properties: {
                  title: { type: "string", example: "Comparación de Planes" },
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      required: ["name", "features"],
                      properties: {
                        name: { type: "string", example: "Plan Premium" },
                        price: { type: "string", example: "$99/mes" },
                        features: {
                          type: "array",
                          items: { type: "string" },
                          example: ["Usuarios ilimitados", "Soporte 24/7", "API Access"]
                        },
                        highlight: { type: "boolean", example: true }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Comparación generada exitosamente"
          }
        }
      }
    }
  },
  components: {
    schemas: {
      WidgetResponse: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          html: { type: "string" }
        }
      }
    }
  }
});
