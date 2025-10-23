# ⚡ Configuración Rápida del GPT - 5 minutos

## 📋 Lo que necesitas

1. URL del OpenAPI Schema: `https://gpt-widget-production.up.railway.app/openapi.json`
2. Las instrucciones del archivo: `GPT_INSTRUCTIONS_V2_COMPLETE.md`

---

## 🚀 Paso 1: Crear o Editar tu GPT (1 min)

1. Ve a: https://chatgpt.com
2. Click en tu nombre → **"My GPTs"**
3. Click **"Create a GPT"** (nuevo) o selecciona tu GPT existente y click **"Edit"**

---

## 📝 Paso 2: Configuración Básica (1 min)

### Name (Nombre):
```
Widget Master Pro
```

### Description (Descripción):
```
Transform your data into beautiful interactive widgets. Create dashboards, charts, tables, timelines, kanban boards, progress trackers, and more with just natural language.
```

### Instructions (Instrucciones):
Copia y pega TODO el contenido del archivo:
`GPT_INSTRUCTIONS_V2_COMPLETE.md`

### Conversation starters (Sugerencias):
```
📊 Show me a sales dashboard
📈 Create a revenue chart
📋 Display top products in a table
🎯 Show project progress
📅 Display this week's calendar
💎 Show pricing plans
```

---

## 🔌 Paso 3: Configurar Actions (2 min)

1. En el menú lateral → **"Actions"**
2. Click **"Create new action"**
3. Click **"Import from URL"**
4. Pega esta URL:
   ```
   https://gpt-widget-production.up.railway.app/openapi.json
   ```
5. Click **"Import"**

### ✅ Verificar:
Deberías ver **14 actions**:
- createDashboard
- createChart
- createTable
- createTimeline
- createComparison
- createTree
- createStatsCards
- createProgress
- createKanban
- createCalendar
- createPricing
- createGallery
- createNotifications
- createActivity

---

## 🎨 Paso 4: Configuración de Imagen (30 seg)

### Profile Picture:
Puedes usar este prompt en DALL-E para generar una imagen:
```
Create a modern, professional icon showing colorful data visualization elements like charts, graphs, and dashboards. Use a gradient of blue, purple, and green colors. Minimalist style, 3D effect, tech aesthetic.
```

O simplemente elige un emoji: 📊

---

## ⚙️ Paso 5: Configuración Adicional (30 seg)

### Capabilities (Habilidades):
- ✅ Web Browsing (opcional)
- ✅ DALL·E Image Generation (opcional)
- ❌ Code Interpreter (no necesario)

### Additional Settings:
- **Use conversation data:** No recomendado
- **Allow customization:** A tu elección

---

## 💾 Paso 6: Guardar y Probar (1 min)

1. Click **"Save"** (esquina superior derecha)
2. Selecciona la visibilidad:
   - **Only me** → Solo tú
   - **Anyone with a link** → Cualquiera con el enlace
   - **Public** → Público (si quieres compartirlo)
3. Click **"Confirm"**

---

## 🧪 PRUEBA RÁPIDA

Abre tu GPT y prueba con:

```
Show me a sales dashboard with key metrics
```

**Resultado esperado:**
```
# 📊 Dashboard de Ventas

🟢 **Ventas Totales**: $125,430 (+18%) 📈
🔵 **Clientes Nuevos**: 1,234 (+9.1%) 📈
🟣 **Pedidos**: 856 (+5.2%) 📈

---
*Datos actualizados: [fecha]*
```

Si ves algo así → ✅ **¡FUNCIONA!**

---

## 🎯 WIDGETS DISPONIBLES - Referencia Rápida

| Widget | Keyword | Action | Uso |
|--------|---------|--------|-----|
| 📊 Dashboard | "dashboard", "métricas" | createDashboard | Métricas KPI |
| 📈 Chart | "gráfico", "chart" | createChart | Gráficos (bar/line/pie) |
| 📋 Table | "tabla", "lista" | createTable | Datos tabulares |
| 🕐 Timeline | "timeline", "cronología" | createTimeline | Líneas de tiempo |
| ⚖️ Comparison | "comparar", "vs" | createComparison | Comparaciones |
| 🌲 Tree | "árbol", "estructura" | createTree | Jerarquías |
| 📊 Stats Cards | "estadísticas", "stats" | createStatsCards | Tarjetas de métricas |
| 🎯 Progress | "progreso", "avance" | createProgress | Barras de progreso |
| 📋 Kanban | "kanban", "board" | createKanban | Tableros de tareas |
| 📅 Calendar | "calendario", "eventos" | createCalendar | Eventos y agenda |
| 💎 Pricing | "precios", "planes" | createPricing | Planes y precios |
| 🖼️ Gallery | "galería", "imágenes" | createGallery | Galerías de imágenes |
| 🔔 Notifications | "notificaciones" | createNotifications | Sistema de alertas |
| 📰 Activity | "actividad", "feed" | createActivity | Feed de actividades |

---

## 🔧 TROUBLESHOOTING

### ❌ "Cannot GET /api/widget/..."
**Solución:** Reimporta el schema. Ve a Actions → Delete action antigua → Import new

### ❌ "Action not found"
**Solución:** Verifica que importaste desde `https://gpt-widget-production.up.railway.app/openapi.json`

### ❌ El GPT no llama a ninguna action
**Solución:** Revisa que copiaste bien las Instructions del archivo `GPT_INSTRUCTIONS_V2_COMPLETE.md`

### ❌ El GPT describe pero no muestra el widget
**Solución:** Las Instructions enfatizan mostrar el `content` de la API. Relee las instrucciones.

### ❌ Error 500 del servidor
**Solución:** El backend en Railway podría estar dormido. Espera 30 segundos y reintenta.

---

## 📚 EJEMPLOS DE USO

Una vez configurado, puedes probar con:

### Para Dashboard:
```
Show me a business dashboard with revenue, users, and growth metrics
```

### Para Chart:
```
Create a bar chart showing monthly sales from January to June
```

### Para Kanban:
```
Show me a sprint board with tasks in To Do, In Progress, and Done columns
```

### Para Progress:
```
Display project milestones with completion percentages
```

### Para Pricing:
```
Show pricing plans: Starter $9, Pro $29, Enterprise $99 with features
```

### Para Calendar:
```
Display this week's events including team meetings and deadlines
```

### Para Stats Cards:
```
Show me key business statistics with icons and trends
```

### Para Gallery:
```
Create a portfolio gallery with 4 projects including images and stats
```

---

## ✅ CHECKLIST FINAL

- [ ] GPT creado/editado
- [ ] Name configurado
- [ ] Description configurada
- [ ] Instructions copiadas desde `GPT_INSTRUCTIONS_V2_COMPLETE.md`
- [ ] Conversation starters agregados
- [ ] Actions importadas desde Railway URL
- [ ] 14 actions visibles
- [ ] Profile picture configurada
- [ ] Configuración guardada
- [ ] Probado con un ejemplo
- [ ] Funciona correctamente ✅

---

## 🎓 MEJORES PRÁCTICAS

### Para el Usuario:
1. **Sé específico:** "Dashboard de ventas con ingresos, usuarios y conversión"
2. **Usa keywords:** "gráfico", "tabla", "progreso", etc.
3. **Pide variantes:** "Muestra esto como gráfico" o "Conviértelo en tabla"

### Para el GPT:
El GPT está configurado para:
1. ✅ Identificar automáticamente el widget apropiado
2. ✅ Mostrar el content exacto de la API
3. ✅ Agregar contexto útil después
4. ✅ Sugerir visualizaciones relacionadas

---

## 🚀 PRÓXIMOS PASOS

1. Prueba todos los widgets con diferentes datos
2. Experimenta con diferentes variantes (gradient, glass, neon, etc.)
3. Combina múltiples widgets en una conversación
4. Pide al GPT que sugiera el mejor widget para tus datos

---

## 📞 SOPORTE

Si tienes problemas:
1. Revisa este documento
2. Verifica que el schema URL sea correcto
3. Revisa que las Instructions estén completas
4. Prueba con ejemplos simples primero

---

**¡Listo!** Tu GPT ahora es un maestro de visualización de datos con 14 tipos de widgets profesionales. 🎉

**Tiempo total:** 5 minutos
**Dificultad:** Fácil
**Resultado:** GPT profesional de visualización de datos ⭐⭐⭐⭐⭐
