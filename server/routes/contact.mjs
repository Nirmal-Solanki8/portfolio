import { Router } from 'express'

export const contactRouter = Router()

const MAX = { name: 120, email: 254, message: 4000 }

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0
}

contactRouter.post('/contact', (req, res) => {
  const name = req.body?.name
  const email = req.body?.email
  const message = req.body?.message

  if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(message)) {
    return res.status(400).json({
      ok: false,
      error: 'Name, email, and message are required.',
    })
  }

  const trimmed = {
    name: name.trim().slice(0, MAX.name),
    email: email.trim().slice(0, MAX.email),
    message: message.trim().slice(0, MAX.message),
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email address.' })
  }

  // Hook for email (Nodemailer, Resend, etc.) or persistence
  console.log('[contact]', new Date().toISOString(), trimmed)

  res.status(201).json({
    ok: true,
    message: 'Thanks — your message was received.',
  })
})
