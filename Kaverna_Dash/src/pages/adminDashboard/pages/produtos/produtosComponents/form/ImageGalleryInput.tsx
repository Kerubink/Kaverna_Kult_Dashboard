import { X } from "lucide-react";
import { useState } from "react";

const ImageGalleryInput = () => {
  const [gallery, setGallery] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addImage = () => {
    if (inputValue.trim() !== "") {
      setGallery([...gallery, inputValue.trim()]);
      setInputValue(""); // Limpa o input após adicionar
    }
  };

  const removeImage = (index: number) => {
    setGallery(gallery.filter((_, i) => i !== index));
  };

  return (
    <div className="text-white">
      <label className="text-white">Galeria</label>
      <div className="flex gap-2">
        <input
          type="text"
          className="border-2 rounded-md p-2 w-full"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Insira a URL da imagem"
        />
        <button
          type="button"
          onClick={addImage}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Adicionar
        </button>
      </div>

      {/* Exibir imagens adicionadas */}
      <ul className="mt-2">
        {gallery.map((url, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-800 p-2 rounded-md mt-1"
          >
            <div className="flex items-center gap-2">
              <img src={url} alt="produto" className="w-20" />
              <span className="text-white truncate w-3/4">{url}</span>
            </div>
            <button
              onClick={() => removeImage(index)}
              className=" text-white px-3 py-1 rounded-md"
            >
              <X size={20}/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGalleryInput;
