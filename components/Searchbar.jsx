"use client";

import { useEffect, useMemo, useState } from "react";

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
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

  const filteredProducts = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return products;
    }

    return products.filter((product) =>
      product.title?.toLowerCase().includes(searchValue)
    );
  }, [products, search]);

  if (loading) {
    return (
      <main className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <p className="mt-3 text-muted">
          Loading products...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container py-5 text-center">
        <h2 className="text-danger">
          {error}
        </h2>
      </main>
    );
  }

  return (
    <main className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary">
          Product Search
        </h1>

        <p className="text-muted">
          Search and discover products from our store
        </p>
      </div>

      {/* Search */}
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="input-group input-group-lg shadow-sm">
            <span className="input-group-text bg-white">
              🔍
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0">
          Products
        </h2>

        <span className="badge bg-primary">
          {filteredProducts.length} products
        </span>
      </div>

      {/* Products */}
      {filteredProducts.length > 0 ? (
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="col-12 col-sm-6 col-lg-4 col-xl-3"
            >
              <div className="card h-100 border-0 shadow-sm product-card">
                <div className="p-4 text-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="img-fluid"
                    style={{
                      height: "200px",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>

                <div className="card-body d-flex flex-column">
                  <h5
                    className="card-title fw-bold"
                    style={{
                      minHeight: "50px",
                    }}
                  >
                    {product.title}
                  </h5>

                  <p className="text-muted small flex-grow-1">
                    {product.description?.slice(0, 100)}
                    ...
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="text-primary fw-bold fs-5">
                      ${product.price}
                    </span>

                    <button
                      type="button"
                      className="btn btn-primary"
                    >
                      View Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <div className="display-4 mb-3">
            🔍
          </div>

          <h3>No products found</h3>

          <p className="text-muted">
            Try searching for another product.
          </p>

          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => setSearch("")}
          >
            Show All Products
          </button>
        </div>
      )}
    </main>
  );
}