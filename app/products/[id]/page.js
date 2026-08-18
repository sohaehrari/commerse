"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductDetails() {
  const params = useParams();
  const id = params?.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );

        if (!res.ok) {
          throw new Error("Product not found");
        }

        const data = await res.json();

        if (!data || !data.id) {
          throw new Error("Invalid product");
        }

        setProduct(data);
      } catch (err) {
        console.error("Product error:", err);
        setError("Unable to load this product.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <p className="text-muted mt-3">
            Loading product...
          </p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="bg-light min-vh-100 d-flex align-items-center">
        <div className="container">
          <div
            className="card border-0 shadow-sm mx-auto text-center"
            style={{ maxWidth: "600px" }}
          >
            <div className="card-body p-5">

              <div className="display-3 mb-3">
                😕
              </div>

              <h2 className="fw-bold">
                Product Not Found
              </h2>

              <p className="text-muted mb-4">
                We couldn't find the product you're looking for.
              </p>

              <Link
                href="/search"
                className="btn btn-primary px-4"
              >
                ← Back to Products
              </Link>

            </div>
          </div>
        </div>
      </main>
    );
  }

  const rating = product.rating?.rate || 0;
  const reviewCount = product.rating?.count || 0;

  return (
    <main className="bg-light min-vh-100 py-5">
      <div className="container">

        {/* Back */}
        <div className="mb-4">
          <Link
            href="/search"
            className="text-decoration-none text-secondary fw-semibold"
          >
            ← Back to Products
          </Link>
        </div>

        {/* Product Card */}
        <div className="card border-0 shadow-lg overflow-hidden">

          <div className="row g-0">

            {/* IMAGE */}
            <div className="col-12 col-lg-6 bg-white">

              <div
                className="d-flex align-items-center justify-content-center p-5"
                style={{ minHeight: "550px" }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid"
                  style={{
                    maxHeight: "450px",
                    maxWidth: "90%",
                    objectFit: "contain",
                  }}
                />
              </div>

            </div>

            {/* DETAILS */}
            <div className="col-12 col-lg-6">

              <div className="card-body p-4 p-lg-5">

                {/* Category */}
                <span className="badge bg-primary mb-3 px-3 py-2 text-capitalize">
                  {product.category}
                </span>

                {/* Title */}
                <h1 className="fw-bold mb-3">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="d-flex align-items-center mb-4">

                  <span className="text-warning fs-5 me-2">
                    ★★★★★
                  </span>

                  <strong>
                    {rating}
                  </strong>

                  <span className="text-muted ms-2">
                    ({reviewCount} reviews)
                  </span>

                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="display-5 fw-bold text-primary">
                    ${product.price}
                  </span>
                </div>

                <hr />

                {/* Description */}
                <div className="my-4">

                  <h5 className="fw-bold mb-3">
                    Description
                  </h5>

                  <p className="text-muted lh-lg">
                    {product.description}
                  </p>

                </div>

                {/* Information */}
                <div className="row g-3 mb-4">

                  <div className="col-6">
                    <div className="bg-light rounded p-3">
                      <small className="text-muted d-block">
                        Category
                      </small>

                      <strong className="text-capitalize">
                        {product.category}
                      </strong>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="bg-light rounded p-3">
                      <small className="text-muted d-block">
                        Rating
                      </small>

                      <strong>
                        {rating} / 5
                      </strong>
                    </div>
                  </div>

                </div>

                {/* Buttons */}
                <div className="d-flex gap-3 flex-wrap">


                  <Link
                    href="/search"
                    className="btn btn-secondary btn-lg px-4"
                  >
                    Continue Shopping
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
