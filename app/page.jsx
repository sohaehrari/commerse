"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <main className="bg-dark text-light min-vh-100 py-5">
        <div className="container text-center">
          <h2>Loading products...</h2>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-dark text-light min-vh-100 py-5">
        <div className="container text-center">
          <h2 className="text-danger">{error}</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-dark text-light min-vh-100 py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-primary">
            Welcome To E-Commerce Store
          </h1>

          <p className="text-secondary">
            Buy and explore amazing products online
          </p>
        </div>

        <div className="row g-4">
          {products.map((product) => (
            <div key={product.id} className="col-md-4">
              <div className="card bg-secondary text-light h-100 shadow">
                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold">
                    {product.title}
                  </h5>

                  <p className="small">
                    {product.description?.slice(0, 80)}...
                  </p>

                  <Link
                    href="/products"
                    className="btn btn-primary w-100 mt-auto"
                  >
                    View Products
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}