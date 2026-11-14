import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profileError, setProfileError] = useState('')

  async function loadProfile(userId) {
    if (!supabase || !userId) {
      setProfile(null)
      return null
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, account_type, created_at')
      .eq('id', userId)
      .maybeSingle()

    if (error) {
      setProfileError('Your account is signed in, but your profile could not be loaded.')
      setProfile(null)
      return null
    }

    setProfileError('')
    setProfile(data)
    return data
  }

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return undefined
    }

    let mounted = true
    supabase.auth.getSession().then(async ({ data, error }) => {
      if (!mounted) return
      if (error) setProfileError('Unable to restore your session. Please sign in again.')
      setSession(data?.session ?? null)
      if (data?.session?.user?.id) await loadProfile(data.session.user.id)
      if (mounted) setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return
      setSession(nextSession)
      if (!nextSession) {
        setProfile(null)
        setProfileError('')
        setLoading(false)
        return
      }
      // Avoid issuing Supabase queries inside the auth callback itself.
      queueMicrotask(() => {
        if (mounted) loadProfile(nextSession.user.id).finally(() => mounted && setLoading(false))
      })
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const value = useMemo(() => ({
    session,
    user: session?.user ?? null,
    profile,
    loading,
    profileError,
    configured: isSupabaseConfigured,
    async refreshProfile() {
      if (session?.user?.id) return loadProfile(session.user.id)
      return null
    },
    async signOut() {
      if (!supabase) throw new Error('Supabase is not configured.')
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    },
  }), [session, profile, loading, profileError])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider.')
  return context
}
