import Link from "next/link";

async function getProduct(id) {
  const res = await fetch(
    `https://fakestoreapi.com/products/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function ProductDetails({ params }) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    return (
      <main className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
        <div className="container">
          <div className="card border-0 shadow-sm text-center mx-auto" style={{ maxWidth: "600px" }}>
            <div className="card-body p-5">
              <div className="display-3 mb-3">😕</div>

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

  return (
    <main className="bg-light min-vh-100 py-5">
      <div className="container">

        {/* Back button */}
        <div className="mb-4">
          <Link
            href="/search"
            className="text-decoration-none text-muted"
          >
            ← Back to Products
          </Link>
        </div>

        {/* Product Card */}
        <div className="card border-0 shadow-lg overflow-hidden">
          <div className="row g-0">

            {/* Product Image */}
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

            {/* Product Information */}
            <div className="col-12 col-lg-6">
              <div className="card-body p-4 p-lg-5">

                {/* Category */}
                <span className="badge bg-primary-subtle text-primary text-uppercase mb-3 px-3 py-2">
                  {product.category}
                </span>

                {/* Title */}
                <h1 className="display-6 fw-bold mb-3">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="d-flex align-items-center mb-4">

                  <span className="text-warning fs-5 me-2">
                    ★★★★★
                  </span>

                  <span className="fw-semibold">
                    {product.rating?.rate || "N/A"}
                  </span>

                  <span className="text-muted ms-2">
                    ({product.rating?.count || 0} reviews)
                  </span>

                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="display-5 fw-bold text-primary">
                    ${product.price}
                  </span>
                </div>

                <hr className="my-4" />

                {/* Description */}
                <h5 className="fw-bold mb-3">
                  Product Description
                </h5>

                <p className="text-muted lh-lg">
                  {product.description}
                </p>

                {/* Features */}
                <div className="row g-3 my-4">

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
                        {product.rating?.rate || "N/A"} / 5
                      </strong>
                    </div>
                  </div>

                </div>

                {/* Buttons */}
                <div className="d-flex gap-3 flex-wrap">

                  <button
                    type="button"
                    className="btn btn-primary btn-lg px-4 flex-grow-1"
                  >
                    🛒 Add to Cart
                  </button>

                  <Link
                    href="/search"
                    className="btn btn-outline-secondary btn-lg px-4"
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
