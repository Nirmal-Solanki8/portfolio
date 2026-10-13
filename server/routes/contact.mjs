import { Router } from 'express'
import nodemailer from 'nodemailer'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const contactRouter = Router()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const messagesFilePath = path.join(__dirname, '..', 'messages.json')

const MAX = { name: 120, email: 254, message: 4000 }

const smtpUser = process.env.GMAIL_USER
const smtpPass = process.env.GMAIL_APP_PASSWORD
const mailTo = process.env.CONTACT_TO_EMAIL || 'nirmalsolanki1432@gmail.com'
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

async function saveMessageFallback(data) {
  try {
    let existing = []
    try {
      const fileData = await fs.readFile(messagesFilePath, 'utf-8')
      existing = JSON.parse(fileData)
      if (!Array.isArray(existing)) existing = []
    } catch {
      existing = []
    }
    existing.push({ ...data, receivedAt: new Date().toISOString() })
    await fs.writeFile(messagesFilePath, JSON.stringify(existing, null, 2), 'utf-8')
  } catch (err) {
    console.error('[contact-save-fallback-error]', err)
  }
}

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

  // Always save locally to ensure no message is ever lost
  await saveMessageFallback(trimmed)

  if (transporter && mailFrom) {
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
      // Message already saved locally, return friendly success
      return res.status(200).json({
        ok: true,
        message: 'Thanks — your message was received and logged.',
      })
    }
  }

  return res.status(200).json({
    ok: true,
    message: 'Thanks — your message was received successfully.',
  })
})
