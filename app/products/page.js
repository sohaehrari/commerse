"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(
          "https://fakestoreapi.com/products"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <main className="container py-5 text-center">
        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <h3 className="mt-3">
          Loading products...
        </h3>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container py-5 text-center">
        <div className="alert alert-danger">
          {error}
        </div>
      </main>
    );
  }

  return (
    <main className="bg-light min-vh-100 py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-primary">
            Our Products
          </h1>

          <p className="lead text-muted">
            Explore our collection of quality products
          </p>
        </div>

        {/* Product count */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 mb-0">
            All Products
          </h2>

          <span className="badge bg-primary fs-6">
            {products.length} Products
          </span>
        </div>

        {/* Product grid */}
        <div className="row g-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="col-12 col-sm-6 col-lg-4 col-xl-3"
            >
              <div className="card h-100 border-0 shadow-sm">
                {/* Image */}
                <div
                  className="bg-white p-4 d-flex align-items-center justify-content-center"
                  style={{ height: "260px" }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="img-fluid"
                    style={{
                      maxHeight: "220px",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">
                    {product.title}
                  </h5>

                  <p className="text-muted small">
                    {product.description?.slice(0, 120)}
                    ...
                  </p>

                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="fs-4 fw-bold text-primary">
                        ${product.price}
                      </span>

                      <span className="badge bg-success">
                        In Stock
                      </span>
                    </div>

                    <Link
href="productDetailspage"
                      className="btn btn-primary w-100"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}