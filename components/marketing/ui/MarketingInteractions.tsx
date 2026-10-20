'use client'

import { useEffect } from 'react'

// Marketing-only interactions ported from onreco-redesign/script.js:
// smooth anchor scrolling with nav offset, active nav highlight, and a
// subtle hero entrance.
export default function MarketingInteractions() {
  useEffect(() => {
    const NAV_HEIGHT = 96

    // Smooth anchor scroll with nav offset
    const anchors = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"], a[href*="/#"]')
    )
    const onClick = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement
      const hash = a.getAttribute('href')?.split('#')[1]
      if (!hash) return
      const target = document.getElementById(hash)
      if (!target) return
      e.preventDefault()
      const top =
        target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    }
    anchors.forEach((a) => a.addEventListener('click', onClick))

    // Active nav link on scroll
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('section[id], header[id]')
    )
    const navLinks = Array.from(
      document.querySelectorAll<HTMLElement>('.nav-link')
    )
    const update = () => {
      const scrollY = window.scrollY + 120
      let current = ''
      sections.forEach((sec) => {
        if (sec.offsetTop <= scrollY) current = sec.id
      })
      navLinks.forEach((link) => {
        const href = (link.getAttribute('href') || '').split('#')[1]
        link.style.color = href === current ? 'var(--ink-dark)' : ''
      })
    }
    window.addEventListener('scroll', update, { passive: true })
    update()

    // Subtle hero entrance
    const headline = document.querySelector<HTMLElement>('.hero-headline')
    const side = document.querySelector<HTMLElement>('.hero-side')
    const targets = [headline, side].filter(Boolean) as HTMLElement[]
    targets.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`
    })
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        targets.forEach((el) => {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        })
      )
    )

    return () => {
      anchors.forEach((a) => a.removeEventListener('click', onClick))
      window.removeEventListener('scroll', update)
    }
  }, [])

  return null
}
