# 🤖 Guía Rápida: Configurar tu GPT en ChatGPT

## 📋 Requisitos Previos

- ✅ API funcionando (local o deploy)
- ✅ Tu API Key: `YOUR_API_KEY_HERE`
- ✅ URL pública (ngrok o Railway)

## 🚀 Opción 1: Deploy Rápido con Railway (5 minutos)

### 1. Instalar Railway CLI
```bash
npm install -g @railway/cli
```

### 2. Login en Railway
```bash
railway login
```

### 3. Deploy el proyecto
```bash
# En el directorio del proyecto
railway init
railway up
```

### 4. Obtener tu URL pública
```bash
railway domain
# Te dará algo como: https://chatgpt-widget-api-production.up.railway.app
```

### 5. Configurar API Key en Railway
```bash
railway variables set API_KEY=YOUR_API_KEY_HERE
railway variables set BASE_URL=https://tu-url.railway.app
```

## 🔧 Opción 2: Testing Local con Ngrok (2 minutos)

### 1. Iniciar tu servidor
```bash
npm start
# Servidor corriendo en http://localhost:3000
```

### 2. Exponer con ngrok
```bash
# Instalar ngrok
brew install ngrok  # Mac
# O descargar: https://ngrok.com/download

# Exponer puerto 3000
ngrok http 3000
```

### 3. Copiar la URL pública
```
Forwarding: https://xxxx-xxx-xxx.ngrok-free.app -> http://localhost:3000
```

## 🎯 Configurar el GPT en ChatGPT

### Paso 1: Crear nuevo GPT

1. Ve a **ChatGPT**: https://chat.openai.com/
2. Click en tu perfil (esquina superior derecha)
3. Click en **My GPTs**
4. Click en **Create a GPT**

### Paso 2: Configuración Básica (Configure Tab)

**Name:**
```
Widget Generator Pro
```

**Description:**
```
Genera widgets HTML profesionales con dashboards, métricas y visualizaciones
```

**Instructions:**
```
Eres un asistente especializado en generar widgets HTML visuales y profesionales.

## Capacidades:
- Generar widgets HTML con Tailwind CSS
- Crear dashboards con métricas
- Personalizar títulos y contenido

## Comportamiento:
1. Cuando el usuario pida un widget, dashboard o métricas, usa la acción generateWidget
2. Personaliza el título según el contexto del usuario
3. Después de generar, explica brevemente qué se creó
4. Si el usuario pide modificaciones, genera un nuevo widget actualizado

## Ejemplos de prompts que debes manejar:
- "Genera un dashboard de ventas"
- "Crea métricas de usuarios activos"
- "Muestra un widget con estadísticas de mi proyecto"
- "Dashboard para monitorear mi aplicación"

## Formato de respuesta:
Después de generar un widget, di:
"He generado un [tipo de widget] con [características]. El HTML está listo para usar e incluye estilos con Tailwind CSS."
```

**Conversation starters (ejemplos):**
```
📊 Genera un dashboard de ventas
📈 Crea métricas de usuarios
🎯 Widget con estadísticas del proyecto
💼 Dashboard para mi negocio
```

### Paso 3: Configurar Actions

1. Click en la pestaña **Actions** (arriba)
2. Click en **Create new action**

3. **Importar Schema** - Elige UNA opción:

#### Opción A: Importar desde URL (Recomendado)
```
En "Import from URL" pega:
https://tu-url-aqui.com/openapi.json

Ejemplo ngrok:
https://xxxx-xxx.ngrok-free.app/openapi.json

Ejemplo Railway:
https://chatgpt-widget-api-production.up.railway.app/openapi.json
```

#### Opción B: Pegar manualmente
1. Copia el contenido del archivo `OPENAPI_SCHEMA_FOR_GPT.json`
2. Pégalo en el editor de schema
3. **IMPORTANTE:** Cambia la URL del servidor:
```json
"servers": [
  {
    "url": "https://TU-URL-AQUI.com"
  }
]
```

### Paso 4: Configurar Autenticación

1. En la sección **Authentication**, click en el dropdown
2. Selecciona **API Key**
3. Configura:

```
Authentication Type: API Key
API Key: YOUR_API_KEY_HERE
Auth Type: Custom
Custom Header Name: X-API-Key
```

4. Click **Save**

### Paso 5: Configurar Privacy

1. Selecciona la visibilidad:
   - **Only me**: Solo tú puedes usar el GPT
   - **Anyone with a link**: Cualquiera con el link
   - **Public**: Público en la GPT Store

2. Click **Save** (esquina superior derecha)

## ✅ Verificar que Funciona

### Test 1: Verificar servidor
```bash
# Probar que el servidor responde
curl https://tu-url.com/health

# Debe responder:
# {"status":"ok","timestamp":"2025-01-22T..."}
```

### Test 2: Probar OpenAPI schema
```bash
curl https://tu-url.com/openapi.json

# Debe devolver el schema JSON completo
```

### Test 3: Probar en el GPT

En tu GPT, prueba estos prompts:

```
1️⃣ "Genera un dashboard de ventas"
2️⃣ "Crea un widget con métricas de usuarios"
3️⃣ "Muestra estadísticas de mi aplicación"
```

**Respuesta esperada:**
El GPT debe llamar a tu API y decirte que generó el widget.

## 🐛 Troubleshooting

### ❌ Error: "Action failed"

**Causa:** No puede conectarse a tu API

**Solución:**
1. Verifica que tu servidor esté corriendo
2. Prueba la URL en el navegador: `https://tu-url.com/health`
3. Si usas ngrok, verifica que el túnel sigue activo

### ❌ Error: "Unauthorized" o "API key required"

**Causa:** Problema con la autenticación

**Solución:**
1. Ve a Actions → Authentication
2. Verifica que la API Key sea correcta
3. Verifica que el header name sea `X-API-Key`
4. Click **Save** de nuevo

### ❌ Error: "Invalid API Key"

**Causa:** La API Key no coincide

**Solución:**
1. Verifica la API Key en tu servidor (variable de entorno)
2. Verifica la API Key en la configuración del GPT
3. Deben ser EXACTAMENTE iguales

### ❌ Ngrok tunnel cerrado

**Solución:**
```bash
# Reiniciar ngrok
ngrok http 3000

# Actualizar la URL en el GPT:
# Actions → Schema → servers[0].url
```

## 📱 Probar desde móvil

Una vez configurado, tu GPT funciona en:
- ✅ Web (chat.openai.com)
- ✅ App iOS de ChatGPT
- ✅ App Android de ChatGPT

## 🔄 Actualizar el GPT

Si haces cambios en tu API:

1. **Cambios en endpoints:**
   - Ve a Actions → Refresh
   - O re-importa el schema desde `/openapi.json`

2. **Cambios en la API Key:**
   - Ve a Actions → Authentication
   - Actualiza la API Key
   - Click Save

3. **Cambios en la URL:**
   - Ve a Actions → Schema
   - Actualiza `servers[0].url`
   - Click Save

## 🎯 Próximos Pasos

Después de configurar tu GPT:

- [ ] Prueba con diferentes prompts
- [ ] Comparte el link con amigos (si configuraste "Anyone with a link")
- [ ] Agrega más funcionalidades a tu API
- [ ] Publica en la GPT Store (si quieres)

## 📞 Links Útiles

- **Tu API (local)**: http://localhost:3000
- **OpenAPI Schema**: http://localhost:3000/openapi.json
- **Documentación completa**: Ver `API_DOCUMENTATION.md`
- **ChatGPT GPTs**: https://chat.openai.com/gpts/mine
- **Railway Dashboard**: https://railway.app/dashboard
- **Ngrok Dashboard**: https://dashboard.ngrok.com/

---

¡Listo! Ahora tienes un GPT personalizado que llama a tu API 🎉
