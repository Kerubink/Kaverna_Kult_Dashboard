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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/database/firebase_config";

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      await handleUserRedirect(result.user.uid);
    } catch (err) {
      setError("Erro ao autenticar com Google");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await handleUserRedirect(user.uid);
    } catch (err) {
      setError("Email ou senha incorretos");
    }
  };

  const handleUserRedirect = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      const userRole = userDoc.exists() ? userDoc.data().role : null;

      if (userRole === "admin") {
        navigate("/admin");
      } else if (userRole === "artist") {
        navigate("/artist");
      } else if (userRole === "graphic") {
          navigate("/graphic");
      } else {
        setError("Usuário sem permissão");
      }
    } catch (error) {
      setError("Erro ao buscar informações do usuário");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-[#09090b] text-white border-[#17171a]">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bem-vindo de volta</CardTitle>
          <CardDescription className="text-[#828288] text-[13px]">
            Faça login com sua conta do Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <div className="flex flex-col gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full text-black border-[#17171a] hover:bg-neutral-300"
                  onClick={handleGoogleLogin}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Faça login com o Google
                </Button>
              </div>
              <div className="relative text-center text-[#17171a] text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 text-[#828288] text-[13px] bg-[#09090b] px-2 ">
                  Ou continuar com
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className="border-[#17171a]"
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Esqueceu sua senha?
                    </a>
                  </div>
                  <Input
                    className="border-[#17171a]"
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-neutral-300"
                >
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
              Não tem uma conta?{" "}
              <Link to="/login/signup" className="underline underline-offset-4">
                Criar conta
              </Link>
            </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        Ao continuar, você concorda com nossos <a href="#">Termos de Serviço</a>{" "}
        e <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  );
}
