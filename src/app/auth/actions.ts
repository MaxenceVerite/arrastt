'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

// Traduction des erreurs fréquentes de Supabase
function translateError(errorMsg: string): string {
  const msg = errorMsg.toLowerCase();
  if (msg.includes("invalid login credentials")) return "Email ou mot de passe incorrect.";
  if (msg.includes("user already registered")) return "Un compte existe déjà avec cette adresse email.";
  if (msg.includes("password should be at least")) return "Le mot de passe doit contenir au moins 6 caractères.";
  if (msg.includes("email rate limit exceeded")) return "Trop de tentatives. Veuillez réessayer plus tard.";
  return "Une erreur est survenue. Veuillez réessayer.";
}

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: translateError(error.message) }
  }

  revalidatePath('/', 'layout')
  redirect('/espace-joueur')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        first_name: formData.get('first_name') as string,
        last_name: formData.get('last_name') as string,
      }
    }
  }

  const { data: authData, error } = await supabase.auth.signUp(data)

  if (error) {
    return { error: translateError(error.message) }
  }

  revalidatePath('/', 'layout')
  redirect('/espace-joueur')
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
}

export async function linkLicense(formData: FormData) {
  const supabase = await createClient()
  const licenseNumber = formData.get('license_number') as string
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Non authentifié" }
  
  const { error } = await supabase.auth.updateUser({
    data: { license_number: licenseNumber }
  })

  if (error) {
    return { error: translateError(error.message) }
  }

  revalidatePath('/espace-joueur')
}
