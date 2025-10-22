# 📚 ChatGPT Widget API - Documentación Completa

## 🔑 API Key del Proyecto

Tu API key es:
```
YOUR_API_KEY_HERE
```

**⚠️ IMPORTANTE:** Guarda esta API key de forma segura. La necesitarás para todas las peticiones a los endpoints protegidos.

## 🚀 Base URL

- **Local**: `http://localhost:3000`
- **Producción**: (Después de deploy, actualizar aquí)

## 🔐 Autenticación

Todos los endpoints protegidos requieren autenticación mediante API Key.

### Métodos de autenticación:

#### Opción 1: Header (Recomendado)
```bash
curl -H "X-API-Key: YOUR_API_KEY_HERE" \
  http://localhost:3000/api/widget/generate
```

#### Opción 2: Query Parameter
```bash
curl "http://localhost:3000/api/widget/generate?api_key=YOUR_API_KEY_HERE"
```

## 📡 Endpoints

### 1. Health Check (Público)

Verifica que el servidor está funcionando correctamente.

**Endpoint:** `GET /health`

**Autenticación:** No requerida

**Ejemplo:**
```bash
curl http://localhost:3000/health
```

**Respuesta:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-22T10:00:00.000Z"
}
```

---

### 2. Información del API (Público)

Obtiene información general del API y lista de endpoints disponibles.

**Endpoint:** `GET /`

**Autenticación:** No requerida

**Ejemplo:**
```bash
curl http://localhost:3000/
```

**Respuesta:**
```json
{
  "name": "ChatGPT Widget API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "widget": "/api/widget/generate",
    "openapi": "/openapi.json"
  }
}
```

---

### 3. Generar Widget (Protegido)

Genera un widget HTML completamente estilizado con Tailwind CSS.

**Endpoint:** `GET /api/widget/generate`

**Autenticación:** ✅ Requerida

**Query Parameters:**

| Parámetro | Tipo | Requerido | Default | Descripción |
|-----------|------|-----------|---------|-------------|
| `type` | string | No | "dashboard" | Tipo de widget (dashboard, metrics, stats) |
| `title` | string | No | "Widget" | Título personalizado del widget |

**Ejemplo con curl:**
```bash
curl -H "X-API-Key: YOUR_API_KEY_HERE" \
  "http://localhost:3000/api/widget/generate?title=Dashboard%20de%20Ventas&type=dashboard"
```

**Ejemplo con JavaScript:**
```javascript
const API_KEY = 'YOUR_API_KEY_HERE';

fetch('http://localhost:3000/api/widget/generate?title=Mi Dashboard', {
  headers: {
    'X-API-Key': API_KEY
  }
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**Ejemplo con Python:**
```python
import requests

API_KEY = 'YOUR_API_KEY_HERE'

response = requests.get(
    'http://localhost:3000/api/widget/generate',
    headers={'X-API-Key': API_KEY},
    params={'title': 'Dashboard de Ventas', 'type': 'dashboard'}
)

print(response.json())
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "html": "<!DOCTYPE html>\n<html>...</html>"
}
```

**Error 401 (Sin API Key):**
```json
{
  "error": "API key requerida",
  "message": "Incluye tu API key en el header X-API-Key o como query parameter api_key"
}
```

**Error 403 (API Key inválida):**
```json
{
  "error": "API key inválida",
  "message": "La API key proporcionada no es válida"
}
```

---

### 4. OpenAPI Schema (Público)

Obtiene el schema OpenAPI 3.1.0 completo para configurar tu GPT.

**Endpoint:** `GET /openapi.json`

**Autenticación:** No requerida

**Ejemplo:**
```bash
curl http://localhost:3000/openapi.json
```

## 🤖 Configurar en ChatGPT GPT

### Paso 1: Deploy tu API (Elige una opción)

#### Opción A: Ngrok (Local, para testing)
```bash
# Instalar ngrok
brew install ngrok  # Mac
# o descargar: https://ngrok.com/download

# Iniciar tu servidor
npm start

# En otra terminal, exponer puerto 3000
ngrok http 3000

# Copiar la URL pública: https://xxxx-xxx.ngrok-free.app
```

#### Opción B: Railway (Producción, recomendado)
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway init
railway up

# Obtener URL
railway domain
```

### Paso 2: Crear tu GPT

1. Ve a **ChatGPT** → https://chat.openai.com/
2. Click en tu perfil → **My GPTs** → **Create**
3. En el panel de configuración:

#### Configure Tab:
```
Nombre: Widget Generator
Descripción: Genera widgets HTML con métricas y dashboards visuales
```

#### Instructions (ejemplo):
```
Eres un asistente especializado en generar widgets HTML.

Cuando el usuario pida un dashboard o métricas:
1. Usa la acción generateWidget
2. Personaliza el título según el contexto
3. Muestra el HTML generado o explica qué se creó

Ejemplos de uso:
- "Genera un dashboard de ventas"
- "Crea métricas de usuarios"
- "Muestra un widget con estadísticas"
```

### Paso 3: Configurar Actions

1. Ve a la pestaña **Actions**
2. Click en **Create new action**
3. Importa el schema de una de estas formas:

#### Opción A: Importar desde URL (Recomendado)
```
https://tu-url.com/openapi.json
```

#### Opción B: Pegar manualmente
Copia el contenido desde `http://localhost:3000/openapi.json`

### Paso 4: Configurar Autenticación

1. En **Authentication**, selecciona **API Key**
2. Configura:
   - **Auth Type**: API Key
   - **API Key**: `YOUR_API_KEY_HERE`
   - **Auth Header Name**: `X-API-Key`

3. Click **Save**

### Paso 5: Probar tu GPT

Prueba con estos prompts:
```
"Genera un dashboard de ventas"
"Crea métricas de usuarios activos"
"Muestra un widget con estadísticas del proyecto"
```

## 🧪 Testing

### Probar localmente

```bash
# 1. Iniciar servidor
npm start

# 2. Probar health check
curl http://localhost:3000/health

# 3. Probar sin API key (debe fallar)
curl http://localhost:3000/api/widget/generate

# 4. Probar con API key (debe funcionar)
curl -H "X-API-Key: YOUR_API_KEY_HERE" \
  http://localhost:3000/api/widget/generate
```

### Probar desde navegador

1. Abre: http://localhost:3000
2. Prueba: http://localhost:3000/health
3. Descarga el schema: http://localhost:3000/openapi.json

## 🔒 Seguridad

### Variables de entorno

En producción, SIEMPRE usa variables de entorno:

1. Crea archivo `.env`:
```bash
API_KEY=tu_api_key_personalizada_aqui
BASE_URL=https://tu-dominio.com
PORT=3000
```

2. Nunca subas `.env` a GitHub (ya está en `.gitignore`)

### Generar nueva API Key

Para producción, genera una nueva API key:

```bash
node -e "console.log('gpt1_sk_live_' + require('crypto').randomBytes(48).toString('hex'))"
```

## 📊 Límites y Rate Limiting

Actualmente no hay límites configurados. Para producción, considera agregar:

- Rate limiting (express-rate-limit)
- Request validation
- Logging y monitoreo
- Error tracking

## 🐛 Troubleshooting

### Error: "API key requerida"
✅ Solución: Incluye el header `X-API-Key` o query parameter `api_key`

### Error: "API key inválida"
✅ Solución: Verifica que estés usando la API key correcta

### Error: "CORS"
✅ Solución: Verifica `CORS_ORIGIN` en `.env`

### Puerto en uso
```bash
# Matar proceso en puerto 3000
lsof -ti:3000 | xargs kill

# O usar otro puerto
PORT=3001 npm start
```

## 📞 Soporte

- **GitHub Issues**: https://github.com/luiso2/GPT1/issues
- **Documentación**: Este archivo
- **OpenAPI Schema**: http://localhost:3000/openapi.json

## 🎯 Próximos Pasos

- [ ] Deploy en Railway/Vercel
- [ ] Configurar GPT en ChatGPT
- [ ] Probar con diferentes prompts
- [ ] Agregar más tipos de widgets
- [ ] Implementar rate limiting
- [ ] Agregar logging

---

Hecho con ❤️ para ChatGPT GPTs
