# 🎨 ChatGPT Widget API - Express.js

API completa para crear widgets configurables en tu GPT de ChatGPT.

## 🚀 Quick Start (2 minutos)

\`\`\`bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor
npm start
\`\`\`

**¡Listo!** Abre: http://localhost:3000

## ✅ Verificar que Funciona

\`\`\`bash
# Health check
curl http://localhost:3000/health

# Generar widget
curl "http://localhost:3000/api/widget/generate?type=dashboard&title=Mi%20Dashboard"

# Ver OpenAPI schema
curl http://localhost:3000/openapi.json
\`\`\`

## 📖 Endpoints Disponibles

| Endpoint | Descripción |
|----------|-------------|
| `GET /` | Información del API |
| `GET /health` | Health check |
| `GET /api/widget/generate` | Genera widget HTML |
| `GET /openapi.json` | Schema OpenAPI 3.1.0 |

## 🤖 Configurar en ChatGPT GPT

### Opción A: Desarrollo Local con ngrok

\`\`\`bash
# 1. Instalar ngrok
brew install ngrok  # Mac
# o descargar de: https://ngrok.com/download

# 2. Exponer puerto 3000
ngrok http 3000

# 3. Usar la URL de ngrok en tu GPT
# https://xxxx-xx-xx.ngrok-free.app
\`\`\`

### Opción B: Deploy en Railway

\`\`\`bash
# 1. Instalar Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Deploy
railway init
railway up

# 4. Obtener URL
railway open
\`\`\`

## 🎯 Configurar el GPT

1. Ve a **ChatGPT → My GPTs → Create**
2. En **Actions** → **Create new action**
3. Importar schema desde: `http://your-url/openapi.json`
4. Save

## 💬 Prompts de Ejemplo

\`\`\`
"Genera un dashboard con métricas de ventas"
"Muestra un widget con datos de usuarios"
"Crea un dashboard para mi proyecto"
\`\`\`

## 🎨 Personalizar

Edita `src/app.js` para agregar más tipos de widgets o endpoints.

## 📦 Estructura

\`\`\`
chatgpt-widget-api-express/
├── src/
│   └── app.js          # Servidor Express completo
├── package.json        # Dependencias
├── .env.example        # Variables de entorno
└── README.md           # Este archivo
\`\`\`

## 🚢 Deploy Rápido

### Vercel
\`\`\`bash
npm i -g vercel
vercel
\`\`\`

### Heroku
\`\`\`bash
heroku create
git push heroku main
\`\`\`

### Railway (Recomendado)
\`\`\`bash
railway up
\`\`\`

## 🔧 Variables de Entorno

\`\`\`bash
PORT=3000              # Puerto del servidor
CORS_ORIGIN=*          # Orígenes permitidos
\`\`\`

## 📞 Troubleshooting

**Problema:** Puerto ya en uso
\`\`\`bash
# Mac/Linux
lsof -ti:3000 | xargs kill

# O usar otro puerto
PORT=3001 npm start
\`\`\`

**Problema:** CORS error
- Verifica que `CORS_ORIGIN=*` esté en .env

## ✨ Próximos Pasos

1. ✅ Servidor funcionando localmente
2. ⬜ Deploy en Railway/Vercel
3. ⬜ Configurar GPT en ChatGPT
4. ⬜ Probar con prompts

## 📚 Recursos

- [Express.js Docs](https://expressjs.com/)
- [OpenAPI 3.1.0](https://spec.openapis.org/oas/v3.1.0)
- [GPT Actions Guide](https://platform.openai.com/docs/actions)

---

**¿Necesitas ayuda?** Revisa los logs del servidor o verifica que el puerto 3000 esté libre.

Hecho con ❤️ para ChatGPT GPTs
