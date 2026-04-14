import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { contactRouter } from './routes/contact.mjs'

const app = express()
const PORT = Number(process.env.PORT) || 3001

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? true,
  }),
)
app.use(express.json({ limit: '32kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'portfolio-api', ts: new Date().toISOString() })
})

app.use('/api', contactRouter)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ ok: false, error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Portfolio API listening on http://localhost:${PORT}`)
})
