"use client";

import React, { useState } from "react";
import Layout from "~/components/Layout/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Bell, Mail } from "lucide-react";

export default function ConfigPage() {
  const [notificacoes, setNotificacoes] = useState({
    email: true,
    push: false,
    entregas: true,
  });

  const [emailConfig, setEmailConfig] = useState({
    email: "",
    frequencia: "diaria",
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Layout>
      <div>
        <h1 className="mb-6 text-2xl font-bold">Configurações</h1>

        <div className="space-y-6">
          {saved && (
            <Alert className="border-green-500 bg-green-100">
              <AlertDescription className="text-green-800">
                Configurações salvas com sucesso!
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por Email</Label>
                  <div className="text-sm text-gray-500">
                    Receba atualizações importantes por email
                  </div>
                </div>
                <Switch
                  checked={notificacoes.email}
                  onCheckedChange={(checked) =>
                    setNotificacoes({ ...notificacoes, email: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações Push</Label>
                  <div className="text-sm text-gray-500">
                    Receba notificações em tempo real
                  </div>
                </div>
                <Switch
                  checked={notificacoes.push}
                  onCheckedChange={(checked) =>
                    setNotificacoes({ ...notificacoes, push: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Atualizações de Entrega</Label>
                  <div className="text-sm text-gray-500">
                    Seja notificado sobre o status das entregas
                  </div>
                </div>
                <Switch
                  checked={notificacoes.entregas}
                  onCheckedChange={(checked) =>
                    setNotificacoes({ ...notificacoes, entregas: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Configurações de Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email para notificações</Label>
                <Input
                  id="email"
                  type="email"
                  value={emailConfig.email}
                  onChange={(e) =>
                    setEmailConfig({ ...emailConfig, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequencia">Frequência de relatórios</Label>
                <select
                  id="frequencia"
                  className="w-full rounded-md border p-2"
                  value={emailConfig.frequencia}
                  onChange={(e) =>
                    setEmailConfig({
                      ...emailConfig,
                      frequencia: e.target.value,
                    })
                  }
                >
                  <option value="diaria">Diária</option>
                  <option value="semanal">Semanal</option>
                  <option value="mensal">Mensal</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave}>Salvar Configurações</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
