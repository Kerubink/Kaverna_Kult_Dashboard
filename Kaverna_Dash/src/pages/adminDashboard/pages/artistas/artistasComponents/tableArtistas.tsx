import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/database/firebase_config";
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
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function TableArtistas() {
  const [artists, setArtists] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Buscar artistas no Firestore
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("role", "==", "artist"));
        const querySnapshot = await getDocs(q);

        const artistsList: any[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          username: doc.data().username || "Sem username",
          phone: doc.data().phone || "Sem telefone",
          email: doc.data().email,
          portfolio: doc.data().portfolio || "Sem portfólio",
          estampas: doc.data().estampas || 0,
          popularidade: doc.data().popularidade || 0,
          status: doc.data().status || "Ativo",
          avatar: doc.data().avatar || "", // Avatar do artista
        }));

        setArtists(artistsList);
      } catch (error) {
        console.error("Erro ao buscar artistas:", error);
      }
    };

    fetchArtists();
  }, []);

  // Filtrar artistas pelo nome ou username
  const filteredArtists = artists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(search.toLowerCase()) ||
      artist.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="text-white h-[750px] lg:h-[950px] border-none overflow-hidden flex gap-4 flex-col">
      <CardHeader className="rounded-2xl p-0 py-3">
        <CardTitle className="text-2xl font-bold">ARTISTAS</CardTitle>
        <CardDescription className="text-white">
          Lista de artistas parceiros
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 bg-neutral-900 rounded-2xl flex-1 flex flex-col">
        <Card className="text-white border-none flex flex-1 flex-col gap-5">
          <CardHeader className="m-0 p-0">
            <CardTitle className="flex justify-between">
              <Input
                placeholder="Buscar..."
                className="w-[160px] lg:w-[350px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 rounded-md border-none flex-1">
            <ScrollArea className="h-full max-w-[300px] min-w-full lg:w-full whitespace-nowrap rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Artista</TableHead>
                    <TableHead>Contatos</TableHead>
                    <TableHead>Portfólio</TableHead>
                    <TableHead className="text-right">Estampas</TableHead>
                    <TableHead className="text-right">Popularidade</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredArtists.length > 0 ? (
                    filteredArtists.map((artist) => (
                      <TableRow key={artist.id}>
                        <TableCell className="flex gap-3">
                          <Avatar>
                            <AvatarImage src={artist.avatar || "https://via.placeholder.com/150"} />
                            <AvatarFallback>
                              {artist.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h2 className="text-white font-bold">{artist.name}</h2>
                            <span className="text-neutral-500">@{artist.username}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <h2>{artist.phone}</h2>
                          <a href={`mailto:${artist.email}`}>{artist.email}</a>
                        </TableCell>
                        <TableCell>
                          <a href={artist.portfolio} target="_blank" rel="noopener noreferrer">
                            {artist.portfolio}
                          </a>
                        </TableCell>
                        <TableCell className="text-right">{artist.estampas}</TableCell>
                        <TableCell className="text-right">{artist.popularidade}</TableCell>
                        <TableCell className="text-right">{artist.status}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            className="w-6 h-6 p-4 bg-transparent cursor-pointer"
                            onClick={() => navigate(`/admin/parceiros/artistas/${artist.id}`)}
                          >
                            <Eye size={20} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        Nenhum artista encontrado.
                      </TableCell>
                    </TableRow>
                  )}
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

export default TableArtistas;
