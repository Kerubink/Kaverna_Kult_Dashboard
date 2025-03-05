import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "@/database/firebase_config";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import MultiInput from "./form/MultiInput";
import ImageGalleryInput from "./form/ImageGalleryInput";
import ProductProfitCalculator from "./form/ProductProfitCalculator";

export function ProductForm() {
  const navigate = useNavigate();
  const [artists, setArtists] = useState<{ id: string; name: string }[]>([]);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [pattern, setPattern] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(false);

  // Calcula o preço final automaticamente
  const finalPrice = price - discount;

  // Busca os artistas do Firestore
  useEffect(() => {
    const fetchArtists = async () => {
      const q = query(collection(db, "users"), where("role", "==", "artist"));
      const querySnapshot = await getDocs(q);
      const artistList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name || "Artista sem nome",
      }));
      setArtists(artistList);
    };

    fetchArtists();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedArtist) {
      alert("Selecione um artista!");
      return;
    }

    setLoading(true);

    try {
      // Criando um novo produto no Firestore
      const productRef = await addDoc(collection(db, "products"), {
        name,
        artistId: selectedArtist,
        colors,
        price,
        discount,
        finalPrice,
        image,
        gallery,
        pattern,
        description,
        category,
        tags,
        isFeatured,
        status: "ativo",
        type: "camisa",
        created_at: Timestamp.now(),
        totalSold: 0,
        averageRating: 0,
      });

      alert("Produto cadastrado com sucesso!");
      navigate("/admin/produtos/criar_produto");
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      alert("Erro ao cadastrar produto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-[#09090b] text-white border-none">
      <CardHeader>
        <CardTitle className="text-xl">Cadastrar Produto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <section className="col-span-3 gap-4 grid">
            <section className="bg-neutral-900 p-6 flex flex-col gap-6 rounded-2xl">
              {/* Seleção do Artista */}
              <h1 className="text-xl">Geral</h1>
              <div className="grid gap-2">
                <Label>Artista</Label>
                <select
                  value={selectedArtist}
                  onChange={(e) => setSelectedArtist(e.target.value)}
                  className="border rounded-md p-2 bg-[#17171a] text-white"
                  required
                >
                  <option value="" disabled>
                    Selecione um artista
                  </option>
                  {artists.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nome e Descrição */}
              <div className="grid gap-2">
                <Label>Nome do Produto</Label>
                <Input
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Label>Descrição</Label>
                <Textarea
                  placeholder="Detalhes do produto"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </section>

            <section className="bg-neutral-900 p-6 flex flex-col gap-6 rounded-2xl">
              <h1 className="text-xl">Midias</h1>
              {/* Imagens */}
              <div className="grid gap-2">
                <Label>Imagem Principal</Label>
                <Input
                  type="url"
                  placeholder="URL da imagem"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
                <Label>Galeria de Imagens</Label>
                <ImageGalleryInput values={gallery} onChange={setGallery} />
              </div>
            </section>

            <section className="bg-neutral-900 p-6 flex flex-col gap-6 rounded-2xl">
              <h1 className="text-xl">Preço</h1>

              <ProductProfitCalculator />

              {/* Preço e Desconto */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Preço</Label>
                  <Input
                    type="number"
                    placeholder="R$ 00,00"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                  />
                </div>
                <div>
                  <Label>Desconto</Label>
                  <Input
                    type="number"
                    placeholder="R$ 00,00"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                  />
                </div>
              </div>
            </section>
          </section>


          <section>
            {/* Cores */}
            <MultiInput
              label="Cores Disponíveis"
              values={colors}
              onChange={setColors}
            />

            {/* Categoria e Padrão */}
            <div className="grid gap-2">
              <Label>Categoria</Label>
              <Input
                type="text"
                placeholder="Ex: Camisetas, Moletons..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <Label>Padrão</Label>
              <Input
                type="text"
                placeholder="Ex: Floral, Minimalista..."
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
              />
            </div>

            {/* Tags */}
            <MultiInput label="Tags" values={tags} onChange={setTags} />

            {/* Produto em destaque */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={() => setIsFeatured(!isFeatured)}
              />
              <Label>Destacar Produto</Label>
            </div>
          </section>

          {/* Botão de Envio */}
          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-neutral-300"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Cadastrar Produto"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default ProductForm;
