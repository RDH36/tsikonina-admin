import { LoginForm } from "@/components/auth/login-form";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 rounded-lg border bg-card p-8 shadow-sm">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-card-foreground">
              Tsikonina Admin
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Bienvenue dans l&apos;espace d&apos;administration
            </p>
          </div>
          <LoginForm />
          <div className="text-center text-sm text-muted-foreground flex flex-col gap-2">
            <p className="text-xs">© {new Date().getFullYear()} Tsikonina.</p>
            <p className="text-xs">
              Made with ❤️ by{" "}
              <Link
                href="https://github.com/RDH36"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary"
              >
                Raymond Dzery Hago
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
