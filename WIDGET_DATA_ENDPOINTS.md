# 📊 Widget Data Retrieval Endpoints

## ✅ Implementación Completada

Se han agregado los endpoints necesarios para que el frontend pueda recuperar los datos de los widgets creados desde ChatGPT.

## 🔄 Flujo de Datos

1. **ChatGPT crea widget** → POST `/api/widget/table`
2. **Backend genera ID** → Ejemplo: `af68972775a152df`
3. **Backend almacena datos** → En memoria usando `widgetStore`
4. **Backend devuelve URL** → `https://frontend-production-d329.up.railway.app/widgets/table?id=af68972775a152df`
5. **Frontend carga widget** → GET `/api/widget/data/af68972775a152df`
6. **Backend devuelve datos** → Widget renderiza correctamente

## 📡 Nuevos Endpoints

### GET /api/widget/data/:id
**Endpoint principal** para recuperar datos de widgets

```javascript
// Request
GET /api/widget/data/af68972775a152df

// Response
{
  "success": true,
  "widget": {
    "type": "table",
    "title": "Top 5 Productos",
    "headers": ["Producto", "Ventas"],
    "rows": [["iPhone", "$1.2M"]]
  },
  "widgetId": "af68972775a152df",
  "createdAt": "2024-10-23T..."
}
```

### GET /api/widgets/:id
**Endpoint alternativo** para compatibilidad

```javascript
// Request
GET /api/widgets/af68972775a152df

// Response similar con propiedad adicional "data"
```

## 🛠️ Cambios Realizados

1. **Agregados endpoints de recuperación de datos**:
   - `/api/widget/data/:id` (principal)
   - `/api/widgets/:id` (compatibilidad)

2. **Mejorado almacenamiento de widgets**:
   - Los datos ahora incluyen el tipo de widget
   - Se mantiene la estructura consistente

3. **Actualizado FRONTEND_URL**:
   - Configurado para apuntar al frontend de Railway
   - URL: `https://frontend-production-d329.up.railway.app`

4. **Logging mejorado**:
   - Mensajes de consola para debugging
   - Seguimiento de widgets creados y recuperados

## 💾 Almacenamiento

Actualmente usa memoria (`Map`). Para producción, considerar:

### Opción 1: Redis (Recomendado)
```javascript
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

// Guardar con TTL de 24 horas
await redis.setex(`widget:${widgetId}`, 86400, JSON.stringify(data));

// Recuperar
const data = await redis.get(`widget:${widgetId}`);
```

### Opción 2: MongoDB
```javascript
const Widget = mongoose.model('Widget', {
  widgetId: String,
  type: String,
  data: Object,
  createdAt: Date,
  expiresAt: Date
});

// Guardar
await Widget.create({ widgetId, type, data });

// Recuperar
const widget = await Widget.findOne({ widgetId });
```

## 🧪 Testing

### Probar recuperación de widgets:
```bash
# Crear un widget
curl -X POST https://gpt-widget-production.up.railway.app/api/widget/table \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Table",
    "headers": ["Col1", "Col2"],
    "rows": [["A", "B"]]
  }'

# Recuperar el widget (usar el widgetId devuelto)
curl https://gpt-widget-production.up.railway.app/api/widget/data/{widgetId}
```

## 📋 Logs

Los endpoints agregan logs para facilitar debugging:
- `📥 Fetching widget data for ID: xxx` - Cuando se solicita un widget
- `✅ Widget found: xxx (type: table)` - Cuando se encuentra el widget
- `⚠️ Widget not found: xxx` - Cuando no existe el widget

## 🚀 Deployment

Los cambios están listos para desplegarse:
1. El código ya está actualizado
2. Las URLs están configuradas correctamente
3. Los endpoints están probados y funcionando

## ⚠️ Consideraciones

1. **Persistencia**: Los widgets se pierden al reiniciar el servidor (usar Redis/DB)
2. **TTL**: Considerar agregar expiración automática de widgets antiguos
3. **Rate Limiting**: Agregar límites de tasa para prevenir abuso
4. **Validación**: Validar que los IDs sean válidos antes de buscar

## 🔐 Seguridad

- Los endpoints no requieren autenticación (diseño para ChatGPT)
- CORS está configurado para permitir todas las origins (`*`)
- Considerar agregar validación de origen en producción

---

**Los widgets ahora funcionan correctamente con ChatGPT** ✅