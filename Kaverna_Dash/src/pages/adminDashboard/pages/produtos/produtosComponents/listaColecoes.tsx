import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const colecoes = [
  {
    id: "1",
    nome: "Coleção Verão",
    descricao: "Estampas leves e coloridas",
    status: "Ativa",
    destaque: true,
  },
  {
    id: "2",
    nome: "Coleção Inverno",
    descricao: "Modelos mais sóbrios e quentes",
    status: "Desativada",
    destaque: false,
  },
  {
    id: "3",
    nome: "Coleção Exclusiva",
    descricao: "Peças limitadas e únicas",
    status: "Ativa",
    destaque: true,
  },
];

function ListaColecoes() {
  return (
    <div className="p-o">
      <h1 className="text-2xl font-bold mb-4 text-white">Coleções</h1>
      <Table className="text-white">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Destaque</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {colecoes.map((colecao) => (
            <TableRow key={colecao.id}>
              <TableCell>{colecao.id}</TableCell>
              <TableCell>{colecao.nome}</TableCell>
              <TableCell>{colecao.descricao}</TableCell>
              <TableCell>{colecao.status}</TableCell>
              <TableCell>
                {colecao.destaque ? "Sim" : "Não"}
              </TableCell>
              <TableCell>
                <Link to={`/colecao/${colecao.id}`}>
                  <Button  className="text-white hover:bg-neutral-600" size="sm">
                    Ver detalhes
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ListaColecoes;
