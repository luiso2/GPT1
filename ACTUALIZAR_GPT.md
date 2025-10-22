# 🔄 Cómo Actualizar tu GPT (1 minuto)

## ⚠️ Problema Actual

Tu GPT está intentando usar el endpoint antiguo:
```
❌ GET /api/widget/generate  (NO EXISTE)
```

Pero necesita usar los nuevos endpoints:
```
✅ POST /api/widget/dashboard
✅ POST /api/widget/chart
✅ POST /api/widget/table
✅ POST /api/widget/timeline
✅ POST /api/widget/comparison
```

---

## ✅ Solución (5 pasos - 1 minuto)

### **Paso 1: Abrir tu GPT**

1. Ve a: https://chatgpt.com
2. Click en tu nombre (esquina superior derecha)
3. Click en **"My GPTs"**
4. Busca tu GPT (el que creaste para widgets)
5. Click en él para abrirlo

### **Paso 2: Entrar en Modo Edición**

1. Dentro de tu GPT, busca el botón **"Edit"** o **"Configure"**
2. Click en él
3. Verás la pantalla de configuración

### **Paso 3: Ir a Actions**

1. En el menú lateral izquierdo, busca **"Actions"**
2. Click en **"Actions"**
3. Verás una lista de actions configuradas

### **Paso 4: Eliminar Action Antigua**

Verás algo como:
```
📋 Actions
  ├─ generateWidget (o similar)
```

1. Click en el **nombre del action** (generateWidget)
2. Se expandirá mostrando el schema JSON
3. Busca el botón de **"Delete"** o **"Remove"** (usualmente un icono de basura 🗑️)
4. Click en **Delete** para eliminar el action antiguo

### **Paso 5: Importar Schema Nuevo**

1. Click en **"Create new action"**
2. Click en **"Import from URL"**
3. Pega esta URL EXACTA:
   ```
   https://gpt-widget-production.up.railway.app/openapi.json
   ```
4. Click **"Import"**
5. ChatGPT descargará y cargará el schema automáticamente

### **Paso 6: Verificar**

Deberías ver ahora **5 actions nuevas**:

```
📋 Actions
  ├─ createDashboard
  ├─ createChart
  ├─ createTable
  ├─ createTimeline
  └─ createComparison
```

✅ Si ves estas 5, ¡perfecto!
❌ Si sigues viendo "generateWidget", repite desde el paso 4

### **Paso 7: Guardar**

1. Click en **"Save"** (esquina superior derecha)
2. Espera a que guarde los cambios

---

## 🧪 Probar Ahora

Inicia una nueva conversación con tu GPT y prueba:

```
"Muéstrame un dashboard con métricas de ventas"
```

**Lo que debería pasar:**

1. ✅ El GPT procesará tu petición
2. ✅ Llamará a `createDashboard` (lo verás en el chat)
3. ✅ Generará un widget HTML hermoso
4. ✅ Lo mostrará en el chat

**Si ves un error:**
- ❌ "Cannot GET /api/widget/generate" → El schema no se actualizó, repite los pasos
- ❌ "Action failed" → Verifica que la URL del schema sea correcta
- ❌ "Unauthorized" → No debería pasar (no usamos auth)

---

## 📊 Diferencias Importantes

### **Schema Antiguo (❌ No funciona):**
```json
{
  "paths": {
    "/api/widget/generate": {
      "get": { ... }
    }
  }
}
```

### **Schema Nuevo (✅ Funciona):**
```json
{
  "paths": {
    "/api/widget/dashboard": { "post": { ... } },
    "/api/widget/chart": { "post": { ... } },
    "/api/widget/table": { "post": { ... } },
    "/api/widget/timeline": { "post": { ... } },
    "/api/widget/comparison": { "post": { ... } }
  }
}
```

---

## 🔍 Verificación Rápida

Para verificar que tu GPT tiene el schema correcto:

1. Abre tu GPT en modo edición
2. Ve a Actions
3. Expande un action
4. Busca en el schema JSON la palabra "dashboard"
5. ✅ Si la encuentras → Schema correcto
6. ❌ Si ves "generate" → Schema antiguo, actualiza

---

## ⚡ Método Alternativo (Si no funciona)

Si al importar desde URL no funciona:

1. Ve a: https://gpt-widget-production.up.railway.app/openapi.json
2. Copia TODO el JSON que ves
3. En tu GPT → Actions → Create new action
4. Pega el JSON completo en el campo Schema
5. Save

---

## 🆘 Troubleshooting

### "No puedo importar desde URL"
**Solución:** Usa el método alternativo (copiar/pegar el JSON)

### "Sigo viendo generateWidget"
**Solución:** Elimínalo manualmente antes de importar el nuevo

### "Import failed"
**Solución:** Verifica que la URL sea exactamente:
```
https://gpt-widget-production.up.railway.app/openapi.json
```

### "El GPT no llama a ninguna action"
**Solución:** Verifica que las **Instructions** estén actualizadas con el contenido de `GPT_INSTRUCTIONS.md`

---

## ✅ Checklist Final

- [ ] Eliminé el action antiguo "generateWidget"
- [ ] Importé el schema desde Railway
- [ ] Veo 5 actions nuevas
- [ ] Guardé los cambios
- [ ] Probé con "Muéstrame un dashboard"
- [ ] Funciona! 🎉

---

## 🎯 Resultado Esperado

Cuando todo esté configurado correctamente, al pedirle:

```
"Muéstrame un dashboard con métricas de ventas"
```

El GPT responderá algo como:

```
¡Claro! Aquí está tu dashboard con las métricas clave:

[Using createDashboard]

[Widget HTML renderizado hermoso]

Como puedes ver, las ventas han crecido 18% este mes...
```

---

¡Eso es todo! Una vez actualizado el schema, tu GPT funcionará perfectamente. 🚀
