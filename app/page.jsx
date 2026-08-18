"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getProducts } from "./lib/api";

export default function Home() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/login");
      return;
    }

    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [router]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-dark text-light min-vh-100 py-5">
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
            <div
              key={product.id}
              className="col-md-4"
            >
              <div className="card bg-secondary text-light h-100 shadow">
                <div className="card-body">
                  <h5 className="fw-bold">
                    {product.title}
                  </h5>

                  <p className="small">
                    {product.description?.slice(
                      0,
                      80
                    )}
                    ...
                  </p>

                  <Link
                    href="/products"
                    className="btn btn-primary w-100 mt-2"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}