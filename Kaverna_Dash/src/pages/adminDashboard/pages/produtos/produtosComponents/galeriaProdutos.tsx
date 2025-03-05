import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

function GaleriaProdutos() {
  // Dados fictícios apenas para demonstrar o layout. Em breve você integrará com a sua fonte de dados.
  const produtos = [
    { id: "1", nome: "Camiseta Estampada", autor: "@Kaverna_Kult", preco: "R$ 49,90" },
    { id: "2", nome: "Camiseta Básica", autor: "@joaodasartes", preco: "R$ 39,90" },
    { id: "3", nome: "Camiseta Premium", autor: "@Arte_viva", preco: "R$ 59,90" },
    { id: "4", nome: "Camiseta Exclusiva", autor: "Kaverna Kult", preco: "R$ 79,90" },
    // adicione quantos quiser...
  ];

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4 text-white">
        Galeria de Produtos
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produtos.map((produto) => (
          <Card
            key={produto.id}
            className="bg-transparent overflow-hidden text-white shadow-md"
          >
            <CardHeader className="p-3">
              <CardTitle className="text-md font-bold">
                {produto.nome}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <img src="url" alt="foto_do_produto" />
            </CardContent>
            <CardFooter className="bg-neutral-900 flex justify-between items-center p-3">
              <div>
                <h1>{produto.autor}</h1>
                <span>{produto.preco}</span>
              </div>
              {/* botão para abrir a pagina que mostra as informações do produto (pedidos/:id) */}
              <Button>
                <Eye size={20} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default GaleriaProdutos;
