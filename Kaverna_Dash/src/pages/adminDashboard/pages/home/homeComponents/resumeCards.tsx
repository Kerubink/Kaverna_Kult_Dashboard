import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Package, Shirt, User } from "lucide-react";

function ResumeCards() {
  return (
    <>
      <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <li>
          <Card className="text-white p-4 flex flex-col gap-2">
            <CardHeader className="flex flex-row p-0 items-center justify-between">
              <CardTitle className="m-0 text-md">Pedidos</CardTitle>
              <Package size={20} />
            </CardHeader>
            <CardContent className="p-0">
              <h1 className="text-xl font-extrabold">150</h1>
              <span className="text-[12px]">total de pedidos</span>
            </CardContent>
          </Card>
        </li>
        <li>
          <Card className="text-white p-4 flex flex-col gap-2">
            <CardHeader className="flex flex-row p-0 items-center justify-between">
              <CardTitle className="m-0 text-md">Vendas</CardTitle>
              <DollarSign size={20} />
            </CardHeader>
            <CardContent className="p-0">
              <h1 className="text-xl font-extrabold">R$2.000</h1>
              <span className="text-[12px]">Faturamento total</span>
            </CardContent>
          </Card>
        </li>
        <li>
          <Card className="text-white p-4 flex flex-col gap-2">
            <CardHeader className="flex flex-row p-0 items-center justify-between">
              <CardTitle className="m-0 text-md">Artistas</CardTitle>
              <User size={20} />
            </CardHeader>
            <CardContent className="p-0">
              <h1 className="text-xl font-extrabold">23</h1>
              <span className="text-[12px]">Parceiros cadastrados</span>
            </CardContent>
          </Card>
        </li>
        <li>
          <Card className="text-white p-4 flex flex-col gap-2">
            <CardHeader className="flex flex-row p-0 items-center justify-between">
              <CardTitle className="m-0 text-md">Produtos</CardTitle>
              <Shirt size={20} />
            </CardHeader>
            <CardContent className="p-0">
              <h1 className="text-xl font-extrabold">47</h1>
              <span className="text-[12px]">Camisetas disponíveis</span>
            </CardContent>
          </Card>
        </li>
      </ul>
    </>
  );
}

export default ResumeCards;
