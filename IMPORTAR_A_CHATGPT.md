# 🤖 Cómo Importar el Schema OpenAPI a ChatGPT

## ⚡ Método Único y Recomendado ⭐

**USA ESTA URL EN TU GPT:**

```
https://gpt-widget-production.up.railway.app/openapi.json
```

### Pasos:

1. Ve a tu GPT: https://chatgpt.com/gpts/editor
2. **Configure** → **Actions**
3. **Elimina** la action vieja si existe
4. Click **"Create new action"**
5. **Authentication**: None
6. **Schema**: Click **"Import from URL"**
7. Pega la URL de arriba
8. Click **"Import"**

5. Click en **"Import"**
6. ChatGPT validará el schema automáticamente ✅

### Paso 3: Verificar los Endpoints

Deberías ver **5 actions** disponibles:

- ✅ createDashboard - Panel de métricas KPI
- ✅ createChart - Gráficos (bar, line, pie, doughnut)
- ✅ createTable - Tablas de datos
- ✅ createTimeline - Líneas de tiempo
- ✅ createComparison - Comparaciones lado a lado

### Paso 4: Agregar las Instrucciones al GPT

Usa las siguientes instrucciones para tu GPT (solo 5 widgets disponibles):

**Dashboard**: Usa cuando el usuario pida "dashboard", "panel", "métricas", "resumen"
**Chart**: Usa cuando pida "gráfico", "gráfica", "chart", "tendencias"
**Table**: Usa cuando pida "tabla", "listado", "datos tabulares"
**Timeline**: Usa cuando pida "timeline", "cronología", "historial", "eventos"
**Comparison**: Usa cuando pida "comparar", "vs", "diferencias", "lado a lado"

---

## ⚠️ NO Usar el Archivo JSON Estático

**NO uses** el archivo `OPENAPI_SCHEMA_FOR_GPT.json` directamente. Este archivo puede estar desactualizado.

**SIEMPRE importa desde**: `https://gpt-widget-production.up.railway.app/openapi.json`

El schema actual incluye solo los 5 widgets originales que funcionan correctamente:
- ✅ Dashboard, Chart, Table, Timeline, Comparison
- ✅ La URL correcta de Railway
- ✅ Todos los parámetros validados y probados

---

## 🔍 Verificar que Funciona

### Test 1: Verificar la URL del servidor
```bash
curl https://gpt-widget-production.up.railway.app/health
```

Deberías ver: `{"status":"ok","timestamp":"...","uptime":...}`

### Test 2: Probar un endpoint
```bash
curl -X POST https://gpt-widget-production.up.railway.app/api/widget/dashboard \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Dashboard",
    "metrics": [
      {"value": "$1,234", "label": "Test", "color": "text-blue-600", "change": "+10%"}
    ]
  }'
```

Deberías ver markdown formateado con emojis.

---

## ❌ Solución de Problemas

### Error: "Cannot connect to server"

**Causa**: El schema tiene una URL incorrecta (localhost o dominio viejo)

**Solución**:
1. Elimina la action actual en ChatGPT
2. Importa de nuevo usando: `https://gpt-widget-production.up.railway.app/openapi.json`

### Error: "Invalid schema format"

**Causa**: El JSON está corrupto o incompleto

**Solución**:
1. Verifica que el backend esté funcionando: `https://gpt-widget-production.up.railway.app/health`
2. Re-importa el schema desde el endpoint `/openapi.json`

### El GPT responde pero no llama a las actions

**Causa**: Falta agregar las instrucciones

**Solución**:
1. Copia el contenido completo de `GPT_INSTRUCTIONS_V2_COMPLETE.md`
2. Pégalo en la sección **"Instructions"** del GPT
3. Asegúrate de incluir las 14 secciones de widgets

---

## 🎯 URLs Importantes

- **Backend API**: https://gpt-widget-production.up.railway.app
- **Health Check**: https://gpt-widget-production.up.railway.app/health
- **OpenAPI Schema**: https://gpt-widget-production.up.railway.app/openapi.json
- **GitHub Backend**: https://github.com/luiso2/GPT1
- **GitHub Frontend**: https://github.com/luiso2/chatgpt-widgets-frontend

---

## ✨ Próximos Pasos

1. ✅ Importa el schema OpenAPI
2. ✅ Agrega las instrucciones al GPT
3. ✅ Prueba con: "Muéstrame un dashboard de ventas"
4. ✅ Prueba con: "Crea un gráfico de barras con datos mensuales"
5. ✅ Prueba con: "Muéstrame un árbol de archivos del proyecto"

¡Tu GPT ahora puede crear widgets visuales dinámicos! 🎨
