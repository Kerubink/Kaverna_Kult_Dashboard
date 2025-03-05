import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Check, Eye, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function TableSolicitacoesArtistas() {
  return (
    <Card className="text-white h-[750px] lg:h-[950px] border-none overflow-hidden flex gap-4 flex-col">
      <CardHeader className="rounded-2xl p-0 py-3">
        <CardTitle className="text-2xl font-bold">
          SOLICITAÇÕES DE PARCERIAS
        </CardTitle>
        <CardDescription className="text-white">
          Lista de solicitações
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 bg-neutral-900 rounded-2xl flex-1 flex flex-col">
        <Card className="text-white border-none flex flex-1 flex-col gap-5">
          <CardHeader className="m-0 p-0">
            <CardTitle className="flex justify-between">
              <Input
                placeholder="Buscar..."
                className="w-[160px] lg:w-[350px]"
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 rounded-md border-none flex-1">
            <ScrollArea className="h-full max-w-[300px] min-w-full  lg:w-full whitespace-nowrap rounded-md border">
              <Table className="">
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Contatos</TableHead>
                    <TableHead>Portfólio</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="gap-3">FidaPuta</TableCell>
                    <TableCell className="">
                      <h2>(99)99999-9999</h2>
                      <a href="mailto:joaozinho@gmail.com">
                        Joaozinho@gmail.com
                      </a>
                    </TableCell>
                    <TableCell>link.com.br</TableCell>
                    <TableCell className="text-right">
                      {/* esse botao deve levar para a rota "produto:id" que mostra as informações detalhadas do produto*/}
                      <Button className="w-6 h-6 p-4 bg-transparent cursor-pointer">
                        <Check size={20} />
                      </Button>
                      <Button className="w-6 h-6 p-4 bg-transparent cursor-pointer">
                        <X size={20} />
                      </Button>
                      <Button className="w-6 h-6 p-4 bg-transparent cursor-pointer">
                        <Trash2 size={20}/>
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-0">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
  );
}

export default TableSolicitacoesArtistas;
