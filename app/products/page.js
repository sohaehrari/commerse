import Link from "next/link";
import "../globals.css";

export default async function ProductPage() {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  return (
    <div className="pro">
      <h2>Our Products</h2>

      <div className="pro2">
        {products.map((product) => (
          <div className="key" key={product.id}>
            <img
              src={product.image}
              alt={product.title}
            />

            <h3>{product.title}</h3>

            <p>${product.price}</p>

            <Link href={`/products/${product.id}`}>
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}