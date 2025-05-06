"use client"

import {
  Bell,
  ChefHat,
  LayoutDashboard,
  Loader2,
  LogOut,
  Users,
  UtensilsCrossed,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

import { logout } from "@/app/(auth)/login/actions"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useState } from "react"
import { Button } from "./ui/button"

const data = {
  teams: {
    name: "Tsikonina app",
    logo: UtensilsCrossed,
    plan: "Administration",
  },
  navMain: [
    {
      name: "Tableau de bord",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Recettes",
      href: "/recipes",
      icon: ChefHat,
    },
    {
      name: "Utilisateurs",
      href: "/users",
      icon: Users,
    },
    {
      name: "Notification",
      href: "/notification",
      icon: Bell,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  const handleLogout = async () => {
    setIsLoading(true)
    await logout()
    setIsLoading(false)
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="p-4">
        <nav className="flex flex-col gap-1">
          {data.navMain.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <item.icon className="size-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant="outline"
          onClick={handleLogout}
          disabled={isLoading}
          className="cursor-pointer"
        >
          {isLoading ? <Loader2 className="size-4 animate-spin" /> : <LogOut />}
          <span>Déconnexion</span>
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
