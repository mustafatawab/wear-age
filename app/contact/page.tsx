'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, Check } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSubmitted(true)
      setSending(false)
    }, 800)
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-accent" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Get in Touch</span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]"
            >
              Wed love to
              <br />
              <span className="text-muted-foreground">hear from you</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground mt-6 text-lg leading-relaxed"
            >
              Have a question about sizing, orders, or just want to say hello? Reach out and well get back to you within 24 hours.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-8"
              >
                <h2 className="font-display text-xl font-bold">Contact Information</h2>

                {[
                  { Icon: Mail, label: 'Email', value: 'hello@wearage.pk', href: 'mailto:hello@wearage.pk' },
                  { Icon: Phone, label: 'Phone', value: '+92 300 1234567', href: 'tel:+923001234567' },
                  { Icon: MapPin, label: 'Location', value: 'Gulberg Green, Islamabad', href: '#' },
                ].map(({ Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-sm bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-colors">
                      <Icon size={18} strokeWidth={1.5} className="text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
                      <p className="text-sm font-medium mt-0.5 group-hover:text-accent transition-colors">{value}</p>
                    </div>
                  </a>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-6 border border-border rounded-sm bg-white"
              >
                <h3 className="text-sm font-semibold mb-2">Business Hours</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span className="text-foreground">9:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-foreground">10:00 AM – 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
              >
                {submitted ? (
                  <div className="p-12 border border-border rounded-sm bg-white text-center space-y-6">
                    <div className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center mx-auto">
                      <Check size={24} strokeWidth={2} />
                    </div>
                    <h3 className="font-display text-2xl font-bold">Message Sent</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. Well get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setFormData({ name: '', email: '', subject: '', message: '' })
                      }}
                      className="text-xs font-semibold tracking-[0.12em] uppercase text-accent border border-accent/20 px-6 py-3 rounded-sm hover:bg-accent/5 transition-colors"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-8 lg:p-10 border border-border rounded-sm bg-white space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-semibold tracking-[0.1em] uppercase text-foreground">
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="w-full px-4 py-3 border border-border rounded-sm bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-semibold tracking-[0.1em] uppercase text-foreground">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 border border-border rounded-sm bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-xs font-semibold tracking-[0.1em] uppercase text-foreground">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="How can we help?"
                        className="w-full px-4 py-3 border border-border rounded-sm bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-semibold tracking-[0.1em] uppercase text-foreground">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Tell us more..."
                        className="w-full px-4 py-3 border border-border rounded-sm bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full h-14 bg-foreground text-white hover:bg-foreground/90 text-xs font-semibold tracking-[0.15em] uppercase rounded-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {sending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending
                        </>
                      ) : (
                        <>
                          <Send size={14} strokeWidth={1.5} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
