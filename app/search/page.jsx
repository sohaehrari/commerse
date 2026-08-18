import SearchPage from "../components/Searchbar";

export default async function Search() {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  return <SearchPage products={products} />;
}