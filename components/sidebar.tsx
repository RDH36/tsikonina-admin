import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, BookOpen, Tags, Users, LogOut } from "lucide-react"

const routes = [
  {
    label: "Tableau de bord",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Recettes",
    icon: BookOpen,
    href: "/recettes",
  },
  {
    label: "Catégories",
    icon: Tags,
    href: "/categories",
  },
  {
    label: "Utilisateurs",
    icon: Users,
    href: "/utilisateurs",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col space-y-4 bg-gray-900 text-white">
      <div className="flex-1 px-3 py-2">
        <Link href="/dashboard" className="mb-14 flex items-center pl-3">
          <h1 className="text-2xl font-bold">Tsikonina Admin</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition hover:bg-white/10",
                pathname === route.href ? "bg-white/10" : "text-zinc-400"
              )}
            >
              <div className="flex flex-1 items-center">
                <route.icon className="mr-3 h-5 w-5" />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="p-3">
        <button
          className="flex w-full items-center rounded-lg p-3 text-sm font-medium text-zinc-400 transition hover:bg-white/10"
          onClick={() => {
            // TODO: Implémenter la déconnexion
          }}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Déconnexion
        </button>
      </div>
    </div>
  )
}
