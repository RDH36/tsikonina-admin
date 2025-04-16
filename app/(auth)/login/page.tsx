import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"

export default async function LoginPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Tsikonina Admin</h1>
          <p className="mt-2 text-gray-600">Connectez-vous à votre compte</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
