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

## Tipos de Widgets Disponibles (14):

### Widgets Básicos:
1. **Dashboard** - Panel de métricas general
2. **Chart** - Gráficos (bar, line, pie, doughnut)
3. **Table** - Tablas de datos
4. **Timeline** - Líneas de tiempo
5. **Comparison** - Comparaciones lado a lado
6. **Tree** - Estructuras jerárquicas (file explorer, org charts)

### Widgets Avanzados:
7. **Stats Cards** - Tarjetas de estadísticas con iconos y tendencias
8. **Progress** - Barras de progreso (bars, circles, skills, steps)
9. **Kanban** - Tableros tipo Trello con columnas y tarjetas
10. **Calendar** - Eventos de calendario (list, grid, timeline)
11. **Pricing** - Tarjetas de precios con planes
12. **Gallery** - Galería de imágenes (grid, masonry)
13. **Notifications** - Sistema de notificaciones con tipos
14. **Activity Feed** - Feed de actividades de usuarios

Todos los widgets retornan markdown formateado para ChatGPT.
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
    },

    "/api/widget/tree": {
      post: {
        operationId: "createTree",
        summary: "Crear estructura jerárquica (árbol)",
        description: `Genera una estructura de árbol visual interactiva. Úsalo cuando el usuario pida "árbol", "estructura de archivos", "jerarquía", "organigrama" o necesite visualizar datos jerárquicos con relaciones padre-hijo.`,
        tags: ["Widgets"],
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "data"],
                properties: {
                  title: { type: "string", example: "Sistema de Archivos" },
                  variant: {
                    type: "string",
                    enum: ["default", "premium", "minimal", "neon"],
                    default: "premium",
                    description: "Estilo visual del árbol"
                  },
                  data: {
                    type: "array",
                    description: "Nodos raíz del árbol",
                    items: {
                      type: "object",
                      required: ["id", "label"],
                      properties: {
                        id: { type: "string", example: "node-1" },
                        label: { type: "string", example: "src" },
                        icon: {
                          type: "string",
                          example: "folder",
                          description: "Icono: folder, file, database, code, package, settings, users, document, image, video, music"
                        },
                        badge: { type: "string", example: "New" },
                        isExpanded: { type: "boolean", default: false },
                        children: {
                          type: "array",
                          items: { type: "object" },
                          description: "Nodos hijos (misma estructura recursiva)"
                        }
                      }
                    },
                    example: [
                      {
                        id: "1",
                        label: "src",
                        icon: "folder",
                        isExpanded: true,
                        children: [
                          {
                            id: "1-1",
                            label: "components",
                            icon: "folder",
                            badge: "15"
                          },
                          {
                            id: "1-2",
                            label: "index.ts",
                            icon: "code"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Árbol generado exitosamente"
          }
        }
      }
    },

    "/api/widget/stats": {
      post: {
        operationId: "createStatsCards",
        summary: "Crear tarjetas de estadísticas",
        description: `Genera tarjetas de estadísticas con iconos y tendencias. Úsalo cuando el usuario pida ver "estadísticas", "métricas", "KPIs" o necesite visualizar datos con iconos y tendencias.`,
        tags: ["Widgets"],
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "stats"],
                properties: {
                  title: { type: "string", example: "Analytics Overview" },
                  stats: {
                    type: "array",
                    items: {
                      type: "object",
                      required: ["title", "value"],
                      properties: {
                        title: { type: "string", example: "Total Users" },
                        value: { type: "string", example: "45,678" },
                        change: { type: "string", example: "+12%" },
                        trend: { type: "string", enum: ["up", "down", "neutral"], example: "up" },
                        icon: { type: "string", example: "users" },
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
          "200": { description: "Stats cards generadas exitosamente" }
        }
      }
    },

    "/api/widget/progress": {
      post: {
        operationId: "createProgress",
        summary: "Crear barras de progreso",
        description: `Genera barras de progreso animadas. Úsalo cuando el usuario pida ver "progreso", "avance", "completado" o necesite visualizar porcentajes de completitud.`,
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
                  title: { type: "string", example: "Project Progress" },
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      required: ["label", "value"],
                      properties: {
                        label: { type: "string", example: "Design Phase" },
                        value: { type: "number", minimum: 0, maximum: 100, example: 75 },
                        color: { type: "string", example: "blue" },
                        status: { type: "string", enum: ["completed", "in-progress", "pending"] },
                        subtitle: { type: "string", example: "Due tomorrow" }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": { description: "Progress widget generado exitosamente" }
        }
      }
    },

    "/api/widget/kanban": {
      post: {
        operationId: "createKanban",
        summary: "Crear tablero Kanban",
        description: `Genera un tablero Kanban tipo Trello. Úsalo cuando el usuario pida ver "tareas", "kanban", "board", "sprint" o necesite organizar items en columnas.`,
        tags: ["Widgets"],
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "columns"],
                properties: {
                  title: { type: "string", example: "Sprint Board" },
                  columns: {
                    type: "array",
                    items: {
                      type: "object",
                      required: ["id", "title", "cards"],
                      properties: {
                        id: { type: "string", example: "todo" },
                        title: { type: "string", example: "To Do" },
                        color: { type: "string", example: "blue" },
                        cards: {
                          type: "array",
                          items: {
                            type: "object",
                            required: ["id", "title"],
                            properties: {
                              id: { type: "string", example: "task-1" },
                              title: { type: "string", example: "Implement login" },
                              description: { type: "string" },
                              assignee: { type: "string", example: "John" },
                              dueDate: { type: "string", example: "2025-11-01" },
                              tags: { type: "array", items: { type: "string" } },
                              priority: { type: "string", enum: ["low", "medium", "high"] }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": { description: "Kanban board generado exitosamente" }
        }
      }
    },

    "/api/widget/calendar": {
      post: {
        operationId: "createCalendar",
        summary: "Crear calendario de eventos",
        description: `Genera un calendario con eventos. Úsalo cuando el usuario pida ver "calendario", "eventos", "agenda", "reuniones" o necesite visualizar eventos con fechas.`,
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
                  title: { type: "string", example: "Upcoming Events" },
                  events: {
                    type: "array",
                    items: {
                      type: "object",
                      required: ["id", "title", "date", "time"],
                      properties: {
                        id: { type: "string", example: "evt-1" },
                        title: { type: "string", example: "Team Meeting" },
                        date: { type: "string", example: "2025-10-25" },
                        time: { type: "string", example: "10:00 AM" },
                        location: { type: "string", example: "Conference Room A" },
                        attendees: { type: "number", example: 12 },
                        color: { type: "string", example: "blue" },
                        description: { type: "string" }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": { description: "Calendar widget generado exitosamente" }
        }
      }
    },

    "/api/widget/pricing": {
      post: {
        operationId: "createPricing",
        summary: "Crear tarjetas de precios",
        description: `Genera tarjetas de planes de precios. Úsalo cuando el usuario pida ver "precios", "planes", "pricing", "suscripciones" o necesite comparar opciones de pago.`,
        tags: ["Widgets"],
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "plans"],
                properties: {
                  title: { type: "string", example: "Choose Your Plan" },
                  plans: {
                    type: "array",
                    items: {
                      type: "object",
                      required: ["name", "price", "features"],
                      properties: {
                        name: { type: "string", example: "Pro" },
                        price: { type: "string", example: "$29" },
                        period: { type: "string", example: "month" },
                        description: { type: "string" },
                        highlighted: { type: "boolean", example: true },
                        badge: { type: "string", example: "POPULAR" },
                        icon: { type: "string", enum: ["star", "zap", "crown"] },
                        features: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              text: { type: "string", example: "Unlimited projects" },
                              included: { type: "boolean", example: true }
                            }
                          }
                        },
                        buttonText: { type: "string", example: "Start Free Trial" }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": { description: "Pricing cards generadas exitosamente" }
        }
      }
    },

    "/api/widget/gallery": {
      post: {
        operationId: "createGallery",
        summary: "Crear galería de imágenes",
        description: `Genera una galería de imágenes. Úsalo cuando el usuario pida ver "galería", "imágenes", "fotos", "portafolio" o necesite mostrar contenido visual.`,
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
                  title: { type: "string", example: "Project Gallery" },
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      required: ["id", "title", "image"],
                      properties: {
                        id: { type: "string", example: "img-1" },
                        title: { type: "string", example: "Dashboard Design" },
                        image: { type: "string", example: "https://example.com/image.jpg" },
                        description: { type: "string" },
                        category: { type: "string", example: "Web Design" },
                        stats: {
                          type: "object",
                          properties: {
                            views: { type: "number" },
                            likes: { type: "number" },
                            downloads: { type: "number" }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": { description: "Gallery widget generada exitosamente" }
        }
      }
    },

    "/api/widget/notifications": {
      post: {
        operationId: "createNotifications",
        summary: "Crear sistema de notificaciones",
        description: `Genera un panel de notificaciones. Úsalo cuando el usuario pida ver "notificaciones", "alertas", "avisos" o necesite mostrar mensajes del sistema.`,
        tags: ["Widgets"],
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "notifications"],
                properties: {
                  title: { type: "string", example: "Notifications" },
                  notifications: {
                    type: "array",
                    items: {
                      type: "object",
                      required: ["id", "type", "title", "message", "timestamp"],
                      properties: {
                        id: { type: "string", example: "not-1" },
                        type: {
                          type: "string",
                          enum: ["success", "error", "warning", "info", "message", "like", "follow", "system"],
                          example: "success"
                        },
                        title: { type: "string", example: "Payment Successful" },
                        message: { type: "string", example: "Your payment was processed" },
                        timestamp: { type: "string", example: "2 min ago" },
                        read: { type: "boolean", example: false }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": { description: "Notifications widget generado exitosamente" }
        }
      }
    },

    "/api/widget/activity": {
      post: {
        operationId: "createActivityFeed",
        summary: "Crear feed de actividades",
        description: `Genera un feed de actividades de usuarios. Úsalo cuando el usuario pida ver "actividad", "feed", "timeline de acciones", "historial" o necesite mostrar acciones recientes.`,
        tags: ["Widgets"],
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "activities"],
                properties: {
                  title: { type: "string", example: "Recent Activity" },
                  activities: {
                    type: "array",
                    items: {
                      type: "object",
                      required: ["id", "type", "user", "action", "timestamp"],
                      properties: {
                        id: { type: "string", example: "act-1" },
                        type: {
                          type: "string",
                          enum: ["user", "like", "comment", "share", "star", "award", "commit", "post", "image"],
                          example: "commit"
                        },
                        user: {
                          type: "object",
                          properties: {
                            name: { type: "string", example: "John Doe" },
                            avatar: { type: "string" }
                          }
                        },
                        action: { type: "string", example: "pushed to" },
                        target: { type: "string", example: "main branch" },
                        timestamp: { type: "string", example: "10 min ago" },
                        details: { type: "string" }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": { description: "Activity feed generado exitosamente" }
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
