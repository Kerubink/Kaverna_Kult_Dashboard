import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/service/authService";

export function RegistrationForm({ className, ...props }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await registerUser({
        name,
        userName,
        bio,
        profilePicture,
        banner,
        totalProducts,
        popularity,
        totalSales,
        email,
        phone,
        password,
        role: "artist",
      });
      navigate("/login"); // Redireciona para login após cadastro
    } catch (err) {
      console.error(err);
      setError("Erro ao criar a conta. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-[#09090b] text-white border-[#17171a]">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Criar Conta</CardTitle>
          <CardDescription className="text-[#828288] text-[13px]">
            Cadastre-se para acessar o painel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              {/* Nome */}
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite seu nome"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-[#17171a]"
                />
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-[#17171a]"
                />
              </div>

              {/* Telefone */}
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-[#17171a]"
                />
              </div>

              {/* Senha */}
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-[#17171a]"
                />
              </div>

              {/* Botão de Cadastro */}
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-neutral-300"
              >
                Criar Conta
              </Button>
            </div>

            {/* Link para Login */}
            <div className="text-center text-sm mt-4">
              Já tem uma conta?{" "}
              <Link to="/login/signin" className="underline underline-offset-4">
                Fazer login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Termos de Serviço e Política de Privacidade */}
      <div className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        Ao continuar, você concorda com nossos <a href="#">Termos de Serviço</a>{" "}
        e <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  );
}
