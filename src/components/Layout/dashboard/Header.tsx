"use client";

import { UserCircle, Truck } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "~/providers/AuthProvider";

interface User {
  name: string;
  email: string;
}

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Para trocar as cores, apenas altere a cor aqui
  const iconColorClass = "!text-custom-wine";
  const hoverColorClass = "hover:!text-custom-wine";

  const handleSignOut = async () => {
    logout();
    router.push("/");
  };

  const userInfo = user as User | null;

  return (
    <header className="border-b border-gray-700 bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Truck className={cn("h-8 w-8", iconColorClass)} />
          <h1 className={cn("text-2xl font-bold text-white")}>
            Transportadora ABC
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          {userInfo ? (
            <div className="flex items-center space-x-4">
              <UserCircle className={cn("h-12 w-12", iconColorClass)} />
              <span className={cn("text-base text-gray-300")}>
                {userInfo.name || userInfo.email}
              </span>
              <Button
                variant="ghost"
                onClick={handleSignOut}
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
                  "hover:opacity-80",
                )}
              >
                <UserCircle className={cn("h-12 w-12", iconColorClass)} />
                <span className={cn("text-base", iconColorClass)}>Entrar</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
