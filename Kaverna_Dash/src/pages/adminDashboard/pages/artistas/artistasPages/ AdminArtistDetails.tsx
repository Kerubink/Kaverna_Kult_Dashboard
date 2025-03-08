import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/database/firebase_config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function ArtistaDetalhes() {
  const { id } = useParams(); // Pegando o ID da URL
  const [artist, setArtist] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setArtist(docSnap.data());
        } else {
          setArtist(null);
        }
      } catch (error) {
        console.error("Erro ao buscar artista:", error);
        setArtist(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  if (loading) {
    return <div className="text-white text-center py-10">Carregando...</div>;
  }

  if (!artist) {
    return <div className="text-white text-center py-10">Artista não encontrado.</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="text-white bg-neutral-900 border-none w-full max-w-3xl p-6">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src={artist.avatar || "https://via.placeholder.com/150"} />
            <AvatarFallback>{artist.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold mt-4">{artist.name}</CardTitle>
          <p className="text-neutral-400">@{artist.username || "Sem username"}</p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-bold">Contato</h2>
            <p>📧 <a href={`mailto:${artist.email}`} className="text-blue-400">{artist.email}</a></p>
            <p>📞 {artist.phone || "Não informado"}</p>
          </div>

          <div>
            <h2 className="text-lg font-bold">Portfólio</h2>
            {artist.portfolio ? (
              <a href={artist.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-400">
                {artist.portfolio}
              </a>
            ) : (
              <p>Sem portfólio</p>
            )}
          </div>

          <div>
            <h2 className="text-lg font-bold">Estatísticas</h2>
            <p>🎨 Estampas criadas: {artist.estampas || 0}</p>
            <p>🔥 Popularidade: {artist.popularidade || 0}</p>
            <p>📌 Status: {artist.status || "Ativo"}</p>
          </div>

          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => window.history.back()}
          >
            Voltar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ArtistaDetalhes;
