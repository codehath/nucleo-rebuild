"use client";

import { Home, Mic, Users, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-lg border-t border-white/10">
      <nav className="h-full max-w-screen-sm mx-auto px-6 flex items-center justify-around">
        {[
          { href: "/", icon: Home, label: "Home" },
          { href: "/talk", icon: Mic, label: "Talk" },
          { href: "/team", icon: Users, label: "Team" },
          { href: "/journal", icon: BookOpen, label: "Journal" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center"
          >
            <div
              className={cn(
                "p-2 rounded-full transition-colors",
                pathname === item.href
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/10"
              )}
            >
              <item.icon className="w-6 h-6" />
            </div>
            <span className="text-xs mt-1 font-medium text-muted-foreground">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
