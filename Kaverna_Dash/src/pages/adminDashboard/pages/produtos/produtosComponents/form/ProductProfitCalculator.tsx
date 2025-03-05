import { useState, useEffect } from "react";

const ProductProfitCalculator = () => {
  // Estado para o valor da estampa (definido pelo artista)
  const [artistPrice, setArtistPrice] = useState<number>(0);
  // Custo fixo da produção (por exemplo, valor que a gráfica cobra)
  const [productionCost, setProductionCost] = useState<number>(30);
  // Margem de lucro desejada para a loja (em %)
  const [storeMargin, setStoreMargin] = useState<number>(60);

  // Cálculo do preço mínimo necessário (somente para cobrir os custos)
  const minPrice = artistPrice + productionCost;

  // Preço sugerido: o mínimo mais a margem de lucro desejada
  // Exemplo: se a margem é 60%, então preço sugerido = minPrice * (1 + 60/100)
  const suggestedPrice = minPrice * (1 + storeMargin / 100);

  // Lucro da loja: diferença entre o preço sugerido e o preço mínimo
  const storeProfit = suggestedPrice - minPrice;

  // Percentual de lucro da loja sobre o preço sugerido
  const storeProfitPercentage =
    suggestedPrice > 0 ? (storeProfit / suggestedPrice) * 100 : 0;

  return (
    <section className="p-4 border rounded-md border-gray-700 mt-4">
      <h1 className="text-white text-xl mb-4">Calculadora de Preço e Lucro</h1>
      
      {/* Inputs para os valores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Valor da Estampa */}
        <div>
          <label className="block text-white mb-1" htmlFor="artistPrice">
            Valor da Estampa (Artista)
          </label>
          <input
            id="artistPrice"
            type="number"
            step="0.01"
            className="w-full p-2 border-2 rounded-md bg-gray-800 text-white"
            placeholder="Valor da estampa"
            value={artistPrice}
            onChange={(e) => setArtistPrice(parseFloat(e.target.value) || 0)}
          />
        </div>

        {/* Custo de Produção */}
        <div>
          <label className="block text-white mb-1" htmlFor="productionCost">
            Custo de Produção (Gráfica)
          </label>
          <input
            id="productionCost"
            type="number"
            step="0.01"
            className="w-full p-2 border-2 rounded-md bg-gray-800 text-white"
            placeholder="Custo de produção"
            value={productionCost}
            onChange={(e) =>
              setProductionCost(parseFloat(e.target.value) || 0)
            }
          />
        </div>

        {/* Margem de Lucro da Loja */}
        <div>
          <label className="block text-white mb-1" htmlFor="storeMargin">
            Margem de Lucro da Loja (%)
          </label>
          <input
            id="storeMargin"
            type="number"
            step="0.1"
            className="w-full p-2 border-2 rounded-md bg-gray-800 text-white"
            placeholder="Margem de lucro (%)"
            value={storeMargin}
            onChange={(e) => setStoreMargin(parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>

      {/* Exibição dos resultados */}
      <div className="bg-gray-900 p-4 rounded-md">
        <h2 className="text-white text-lg mb-2">Resultados</h2>
        <ul className="text-white space-y-2">
          <li>
            <strong>Custo de Produção (Gráfica):</strong> R${" "}
            {productionCost.toFixed(2)}
          </li>
          <li>
            <strong>Valor da Estampa (Artista):</strong> R$ {artistPrice.toFixed(2)}
          </li>
          <li>
            <strong>Preço Mínimo Necessário:</strong> R$ {minPrice.toFixed(2)}
          </li>
          <li>
            <strong>Preço Sugerido:</strong> R$ {suggestedPrice.toFixed(2)}
          </li>
          <li>
            <strong>Lucro da Loja:</strong> R$ {storeProfit.toFixed(2)}
          </li>
          <li>
            <strong>Percentual de Lucro da Loja:</strong>{" "}
            {storeProfitPercentage.toFixed(2)}%
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ProductProfitCalculator;
