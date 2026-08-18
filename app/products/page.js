export const dynamic = "force-dynamic";

import { getProducts } from "@/lib/api";

export default async function Products() {
  const products = await getProducts();

  return (
    <main className="bg-dark text-light min-vh-100 py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-primary">
            All Products
          </h1>

          <p className="text-secondary">
            Explore our products
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
                    {product.description}
                  </p>

                  <p className="fw-bold text-warning">
                    ${product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}