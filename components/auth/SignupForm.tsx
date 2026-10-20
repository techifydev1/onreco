'use client'
import { handleSignup } from '@/app/actions/auth'
import { auth } from '@/components/marketing/content'
import { Check13 } from '@/components/marketing/ui/Icons'
import { useToastStore } from '@/providers/toast-provider'
import { useUserProfileStore } from '@/providers/user-profile-store'
import { UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'

export default function SignupForm() {
  const { show } = useToastStore()
  const { setUserProfile } = useUserProfileStore()
  const [state, formAction, isPending] = useActionState(handleSignup, null)
  const router = useRouter()
  useEffect(() => {
    if (!state) return
    if (state.ok) {
      setUserProfile(state.data)
      show('Successfully signed up', 'success')
      router.push('/verify-email')
    } else {
      if (state.fieldErrors) {
        const validations = Object.values(state.fieldErrors)
        show(validations[0] || 'Validation failed', 'error')
      } else {
        show(state.message, 'error')
      }
    }
  }, [state, setUserProfile, show, router])

  const benefits = auth.signUp.bullets

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
        <div className="auth-row">
          <div className="auth-field">
            <label htmlFor="firstName" className="auth-label">
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              disabled={isPending}
              autoComplete="given-name"
              placeholder="John"
              className="auth-input auth-input-plain"
            />
          </div>
          <div className="auth-field">
            <label htmlFor="lastName" className="auth-label">
              Last name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              disabled={isPending}
              autoComplete="family-name"
              placeholder="Doe"
              className="auth-input auth-input-plain"
            />
          </div>
        </div>

        <div className="auth-field">
          <label htmlFor="email" className="auth-label">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="john@email.com"
            disabled={isPending}
            className="auth-input auth-input-plain"
          />
        </div>

        <div className="auth-field">
          <label htmlFor="password" className="auth-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            disabled={isPending}
            placeholder="••••••••"
            className="auth-input auth-input-plain"
          />
        </div>

        <button type="submit" disabled={isPending} className="btn btn-primary">
          {isPending ? (
            <>
              Setting up your account
              <span className="auth-spinner" />
            </>
          ) : (
            <>
              <UserPlus width={16} height={16} strokeWidth={2} />
              {auth.signUp.submit}
            </>
          )}
        </button>
      </form>
    </>
  )
}
