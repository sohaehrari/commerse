"use client";

import { useState } from "react";

export default function SearchPage({ products }) {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-5">
      <div className="row justify-content-center mb-4">
        <div className="col-md-8 col-lg-6">
          <input
            type="text"
            className="form-control form-control-lg shadow-sm"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="row g-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <div className="card h-100 shadow border-0">
              <div className="card-body text-center">
                <h5 className="card-title">{product.title}</h5>

                <p className="text-primary fw-bold fs-5">
                  ${product.price}
                </p>
                <img
              src={product.image}
              alt={product.title}
              width={200}
              height={200}
            />

                <button className="btn btn-primary">
                  View Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center mt-5">
          <h4 className="text-muted">
            No products found
          </h4>
        </div>
      )}
    </div>
  );
}