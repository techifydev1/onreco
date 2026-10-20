'use client'
import { handleLogin } from '@/app/actions/auth'
import { auth } from '@/components/marketing/content'
import { Check13 } from '@/components/marketing/ui/Icons'
import { useToastStore } from '@/providers/toast-provider'
import { useUserProfileStore } from '@/providers/user-profile-store'
import { ArrowRight, Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useActionState, useEffect } from 'react'

const SAFE_REDIRECT = (value: string | null): string | null => {
  if (!value) return null
  if (!value.startsWith('/') || value.startsWith('//')) return null
  try {
    const url = new URL(value, 'http://localhost')
    if (url.origin !== 'http://localhost') return null
  } catch {
    return null
  }
  return value
}

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(handleLogin, null)
  const { setUserProfile } = useUserProfileStore()
  const { show } = useToastStore()
  const router = useRouter()
  const redirect = SAFE_REDIRECT(useSearchParams().get('redirect'))
  useEffect(() => {
    if (!state) return
    if (state.ok) {
      setUserProfile(state.data)
      show('Successfully signed up', 'success')
      router.push(redirect || '/app')
    } else {
      if (state.fieldErrors) {
        const validations = Object.values(state.fieldErrors)
        show(validations[0] || 'Validation failed', 'error')
      } else {
        show(state.message, 'error')
      }
    }
  }, [redirect, router, setUserProfile, show, state])

  const benefits = auth.signIn.bullets

  return (
    <>
      <ul className="auth-benefits">
        {benefits.map((benefit) => (
          <li key={benefit} className="auth-benefit">
            <Check13 />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      <form className="auth-form" action={formAction}>
        <div className="auth-field">
          <label htmlFor="email" className="auth-label">
            Email
          </label>
          <div className="auth-input-wrap">
            <input
              id="email"
              name="email"
              type="email"
              disabled={isPending}
              autoComplete="email"
              placeholder="you@company.com"
              className="auth-input"
            />
            <Mail className="auth-input-icon" width={18} height={18} strokeWidth={1.75} />
          </div>
        </div>

        <div className="auth-field">
          <div className="auth-label-row">
            <label htmlFor="password" className="auth-label">
              Password
            </label>
            <Link href="/reset-password" className="text-link" style={{ fontSize: 12 }}>
              Forgot password?
            </Link>
          </div>
          <div className="auth-input-wrap">
            <input
              id="password"
              disabled={isPending}
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="auth-input"
            />
            <Lock className="auth-input-icon" width={18} height={18} strokeWidth={1.75} />
          </div>
        </div>

        <button type="submit" disabled={isPending} className="btn btn-primary">
          {isPending ? (
            <>
              Signing you in
              <span className="auth-spinner" />
            </>
          ) : (
            <>
              {auth.signIn.submit}
              <ArrowRight width={16} height={16} strokeWidth={2.5} />
            </>
          )}
        </button>
      </form>
    </>
  )
}
