import { Router } from 'express'
import nodemailer from 'nodemailer'

export const contactRouter = Router()

const MAX = { name: 120, email: 254, message: 4000 }

const smtpUser = process.env.GMAIL_USER
const smtpPass = process.env.GMAIL_APP_PASSWORD
const mailTo = process.env.CONTACT_TO_EMAIL || smtpUser
const mailFrom = process.env.CONTACT_FROM_EMAIL || smtpUser

const transporter =
  smtpUser && smtpPass
    ? nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })
    : null

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0
}

contactRouter.post('/contact', async (req, res) => {
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

  if (!transporter || !mailTo || !mailFrom) {
    return res.status(503).json({
      ok: false,
      error: 'Email service is not configured yet.',
    })
  }

  const subject = `Portfolio contact from ${trimmed.name}`
  const text = [
    `Name: ${trimmed.name}`,
    `Email: ${trimmed.email}`,
    '',
    'Message:',
    trimmed.message,
  ].join('\n')

  const html = `
    <h2>New portfolio contact</h2>
    <p><strong>Name:</strong> ${trimmed.name}</p>
    <p><strong>Email:</strong> ${trimmed.email}</p>
    <p><strong>Message:</strong></p>
    <p>${trimmed.message.replace(/\n/g, '<br />')}</p>
  `

  try {
    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: trimmed.email,
      subject,
      text,
      html,
    })
  } catch (error) {
    console.error('[contact-email-error]', error)
    return res.status(500).json({
      ok: false,
      error: 'Unable to send message right now. Please try again later.',
    })
  }

  res.status(201).json({
    ok: true,
    message: 'Thanks — your message was received.',
  })
})
