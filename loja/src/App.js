import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      const products = response.data;
      const formattedProducts = [];
      for (const product of products) { 
        const title = product.title.length > 25 ? product.title.substring(0, 25) + "..." : product.title;

        formattedProducts.push({
          ...product,
          title: title,
          price: `R$${Number(product.price).toFixed(2)}`.replace(".", ","),
        });
      }

      setProducts(formattedProducts);
    });
  }, []);

  return (
    <div className="App">
      <h1>Products</h1>
      <div className="product-list">
        {products.map((item) => (
          <div className="product-card">
            <img src={item.image} alt={item.title}/>
            <h2>{item.title}</h2>
            <p>Price: {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
