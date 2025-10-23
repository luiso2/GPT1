# 🤖 Cómo Importar el Schema OpenAPI a ChatGPT

## ⚡ Método Recomendado: Usar el Endpoint Dinámico

El backend genera automáticamente el schema OpenAPI con la URL correcta de Railway.

### Paso 1: Ir a la configuración de tu GPT

1. Ve a https://chatgpt.com/gpts/editor
2. Selecciona tu GPT o crea uno nuevo
3. Ve a la pestaña **"Configure"**
4. Scroll hasta **"Actions"**

### Paso 2: Importar el Schema

1. Click en **"Create new action"**
2. En **"Authentication"**, selecciona **"None"** (sin autenticación)
3. En **"Schema"**, click en **"Import from URL"**
4. Pega esta URL:

```
https://gpt-widget-production.up.railway.app/openapi.json
```

5. Click en **"Import"**
6. ChatGPT validará el schema automáticamente ✅

### Paso 3: Verificar los Endpoints

Deberías ver **14 actions** disponibles:

- ✅ createDashboard
- ✅ createChart
- ✅ createTable
- ✅ createTimeline
- ✅ createComparison
- ✅ createTree
- ✅ createStatsCards
- ✅ createProgress
- ✅ createKanban
- ✅ createCalendar
- ✅ createPricing
- ✅ createGallery
- ✅ createNotifications
- ✅ createActivityFeed

### Paso 4: Agregar las Instrucciones al GPT

Copia el contenido completo del archivo `GPT_INSTRUCTIONS_V2_COMPLETE.md` y pégalo en la sección **"Instructions"** de tu GPT.

---

## 📄 Método Alternativo: Copiar y Pegar el JSON

Si prefieres copiar y pegar manualmente:

1. Abre: https://gpt-widget-production.up.railway.app/openapi.json
2. Copia todo el JSON
3. En ChatGPT GPT Editor → Actions → Create new action
4. Pega el JSON completo en el campo **"Schema"**
5. Click en **"Save"**

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
