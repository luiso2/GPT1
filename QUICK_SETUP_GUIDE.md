# ⚡ Guía Rápida - Configurar tu GPT (3 Pasos)

Tu API **ya está lista y funcionando** en Railway. Solo necesitas configurar el GPT.

---

## 🎯 Paso 1: Obtener URL de Railway (30 segundos)

### Opción A: Web Dashboard
1. Ve a https://railway.app/dashboard
2. Encuentra tu proyecto
3. Copia la URL pública (algo como `https://xxx.up.railway.app`)

### Opción B: Terminal
```bash
cd /Users/josemichaelhernandezvargas/Desktop/chatgpt-widget-api-express
railway status
```

Guarda esta URL, la necesitarás en el paso 3.

---

## 🤖 Paso 2: Crear el GPT (2 minutos)

1. **Ve a ChatGPT:**
   https://chatgpt.com → Tu nombre → **My GPTs** → **Create a GPT**

2. **Name:**
   ```
   Widget Master
   ```

3. **Description:**
   ```
   Asistente que visualiza información mediante widgets dinámicos interactivos.
   ```

4. **Instructions:**
   - Abre el archivo: `GPT_INSTRUCTIONS.md`
   - **Copia TODO el contenido**
   - Pégalo en el campo "Instructions"

5. **Save** (por ahora)

---

## 🔌 Paso 3: Configurar Actions (1 minuto)

1. En tu GPT, ve a **Configure** → **Actions**

2. Click **Create new action**

3. Click **Import from URL**

4. Pega tu URL + `/openapi.json`:
   ```
   https://tu-proyecto.up.railway.app/openapi.json
   ```

5. Click **Import**

6. **Verifica** que veas estos 5 endpoints:
   - ✅ createDashboard
   - ✅ createChart
   - ✅ createTable
   - ✅ createTimeline
   - ✅ createComparison

7. Click **Save**

---

## ✅ Paso 4: ¡Probar! (30 segundos)

Inicia una conversación con tu GPT:

```
"Muéstrame un dashboard con métricas de ventas"
```

**¿Qué debería pasar?**
1. El GPT procesa tu petición
2. Llama automáticamente a `createDashboard`
3. Genera un widget HTML con métricas
4. Lo muestra en el chat

---

## 🎨 Más Ejemplos para Probar

```
"Crea un gráfico de barras con las ventas mensuales"
"Lista los 10 mejores productos en una tabla"
"Muéstrame un timeline del proyecto"
"Compara los planes básico vs premium"
```

---

## 🐛 Troubleshooting

### Problema: "Action failed"
**Solución:**
```bash
# Verifica que tu API esté funcionando
curl https://tu-proyecto.railway.app/health
```
Debería retornar: `{"status":"ok",...}`

### Problema: OpenAPI import falla
**Solución:**
1. Verifica que la URL termine en `/openapi.json`
2. Ábrela en tu navegador para verificar que responde
3. Re-importa el schema

### Problema: GPT no usa los actions
**Solución:**
Verifica que las **Instructions** incluyan esta frase clave:
```
SIEMPRE genera un widget visual apropiado
```

---

## 📊 Estructura de la API

Tu API ahora tiene:

```
GET  /health              - Health check
GET  /openapi.json        - Schema OpenAPI
POST /api/widget/dashboard    - Dashboard con métricas
POST /api/widget/chart        - Gráficos interactivos
POST /api/widget/table        - Tablas de datos
POST /api/widget/timeline     - Líneas de tiempo
POST /api/widget/comparison   - Comparaciones
```

---

## 🔄 Actualizar la API

Si haces cambios en el código:

```bash
cd /Users/josemichaelhernandezvargas/Desktop/chatgpt-widget-api-express

# Opción 1: Si está conectado a Git
git add .
git commit -m "Update widgets"
git push

# Opción 2: Railway CLI
railway up
```

Railway re-desplegará automáticamente.

---

## 📚 Documentación Completa

- **README.md** - Documentación completa
- **GPT_INSTRUCTIONS.md** - Para copiar al GPT
- **API_DOCUMENTATION.md** - Docs de la API

---

## ✨ ¡Listo!

Tu GPT ahora puede:
- ✅ Generar dashboards con métricas
- ✅ Crear gráficos interactivos
- ✅ Mostrar tablas de datos
- ✅ Renderizar timelines
- ✅ Comparar opciones lado a lado

**Todo automáticamente según la conversación!** 🎉

---

## 🎯 Próximos Pasos

1. ✅ API funcionando en Railway
2. ✅ GPT configurado
3. ✅ Widgets funcionando
4. ⬜ **Comparte tu GPT** con tu equipo
5. ⬜ **Personaliza** los widgets según necesites

---

**Tiempo total:** ~3 minutos
**Resultado:** GPT profesional con widgets dinámicos

¡Disfruta! 🚀
