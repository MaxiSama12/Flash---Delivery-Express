import "../../styles/home.css";
import Card from "./Card";
import { useState } from "react";

const CatalogoHomePage = () => {

  const productos = [
    {
      id: 1,
      title: "Burger Indiapolis",
      description: "Delicious burger with a unique twist.",
      price: 12.99,
      stars: 4.5,
      urlImage:
        "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/24P2OKC3RVEHRD3F2VKQ76XX7M.jpg",
      category: "comida",
    },
    {
      id: 2,
      title: "Pizza Margherita",
      description: "Classic pizza with fresh ingredients.",
      price: 10.99,
      stars: 4.0,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY7RbPLpeQGEKr-JMLB6L9kRdCTMtUbFJfJw&s",
      category: "comida",
    },
    {
      id: 3,
      title: "Sushi Platter",
      description: "Assorted sushi rolls with fresh fish.",
      price: 15.99,
      stars: 4.8,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2jvMS-TgX4acPMeLqoZCnJht27NJhkKQW3A&s",
      category: "comida",
    },
    {
      id: 4,
      title: "Fideos x 500g",
      description: "Pasta seca de trigo candeal.",
      price: 2.5,
      stars: 4.3,
      urlImage:
        "https://acdn-us.mitiendanube.com/stores/798/865/products/106815563-2a0f2d53946e5e557f16994272770401-640-0.jpg",
      category: "supermercado",
    },
    {
      id: 5,
      title: "Galletas Oreo",
      description: "Galletas Dulces x 354g",
      price: 3.2,
      stars: 4.6,
      urlImage:
        "https://masonlineprod.vtexassets.com/arquivos/ids/316379/Galletitas-Oreo-Regular-Tripack-354g-2-42387.jpg?v=638757387211700000",
      category: "supermercado",
    },
    {
      id: 6,
      title: "Agua Villavicencio 1.5L",
      description: "Agua Mineral Sin Gas",
      price: 1.8,
      stars: 4.2,
      urlImage:
        "https://acdn-us.mitiendanube.com/stores/001/157/846/products/556225-800-auto11-6873ce0acf40df215b16354448519602-1024-1024.jpg",
      category: "supermercado",
    },
    {
      id: 7,
      title: "Jugo Citric x 1L",
      description: "Jugo exprimido 100% Natural",
      price: 2.9,
      stars: 4.5,
      urlImage:
        "https://http2.mlstatic.com/D_NQ_NP_679509-MLA46881414167_072021-O.webp",
      category: "supermercado",
    },
    {
      id: 8,
      title: "Tafirol 500mg",
      description: "Analgésico y antipirético x 30 comprimidos",
      price: 1.5,
      stars: 4.8,
      urlImage: "https://tafirol.com/hubfs/Tafirol-500.png",
      category: "medicamentos",
    },
    {
      id: 9,
      title: "Alcohol en Gel 250ml",
      description: "Desinfectante instantáneo para manos con 70% de alcohol.",
      price: 2.3,
      stars: 4.7,
      urlImage:
        "https://acdn-us.mitiendanube.com/stores/001/130/470/products/algabo-ultra-x250-ml-alcohol-en-gel-77912742002431-3fe19bb1061aa7eda916487618099237-640-0.png",
      category: "medicamentos",
    },
    {
      id: 10,
      title: "Cuaderno Rivadavia",
      description: "Tapa dura, A4 x 80 hojas rayadas",
      price: 4.0,
      stars: 4.4,
      urlImage:
        "https://acdn-us.mitiendanube.com/stores/001/398/366/products/abc-a4-rayado-60-a518098ca15a1ee57917024203804500-640-0.jpg",
      category: "librería",
    },
    {
      id: 11,
      title: "Bolígrafos Bic (pack x3)",
      description: "Tinta fluida, cuerpo ergonómico. Escritura suave.",
      price: 1.2,
      stars: 4.3,
      urlImage:
        "https://tiotomar.vtexassets.com/arquivos/ids/174508-800-800?v=637937591748630000&width=800&height=800&aspect=true",
      category: "librería",
    },
  ];
  const [activeFilter, setActiveFilter] = useState("todos");

  const filteredProducts =
    activeFilter === "todos"
      ? productos
      : productos.filter((producto) => producto.category === activeFilter);

  return (
    <div className="cat-section-container">
      <div className="about-section-text-container">
        <p className="primary-subheading">Catálogo</p>
        <div className="section-principal-category">
          <h1 className="primary-heading">Menú de Productos</h1>
          <div className="filter-category">
            {["todos", "comida", "librería", "supermercado"].map((category) => (
              <button
                key={category}
                className={`category ${
                  activeFilter.toLowerCase() === category.toLowerCase()
                    ? "active"
                    : ""
                }`}
                onClick={() => setActiveFilter(category.toLowerCase())}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
            {/* 
            <div className="category">Comida</div>
            <div className="category">Bebidas</div>
            <div className="category">Limpieza</div>
            <div className="category">Papelería</div> */}
          </div>
        </div>
        <div className="card-container">
          {filteredProducts.map((producto) => (
            <Card key={producto.id} {...producto} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogoHomePage;
