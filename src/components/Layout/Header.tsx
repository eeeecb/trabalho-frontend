'use client';

import { signOut } from "../../server/auth";
import { useSession } from "next-auth/react";
import { UserCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  // Para trocar as cores, apenas altere a cor aqui
  const titleColorClass = "!text-custom-wine";
  const iconColorClass = "!text-custom-wine";
  const hoverColorClass = "hover:!text-custom-wine";

  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <h1 className={cn("text-2xl font-bold", titleColorClass)}>Trabaio Camião</h1>
        <div className="flex items-center space-x-4">
          {session ? (
            <div className="flex items-center space-x-4">
              <UserCircle className={cn("w-12 h-12", iconColorClass)} />
              <span className={cn("text-base text-gray-300")}>{session.user.name || session.user.email}</span>
              <Button
                variant="ghost"
                onClick={() => signOut()}
                className={cn("text-base text-gray-300", hoverColorClass)}
              >
                Sair
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button
                variant="ghost"
                className={cn(
                  "flex items-center space-x-2",
                  iconColorClass,
                  "hover:opacity-80"
                )}
              >
                <UserCircle className={cn("w-12 h-12", iconColorClass)} />
                <span className={cn("text-base", iconColorClass)}>Entrar</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}