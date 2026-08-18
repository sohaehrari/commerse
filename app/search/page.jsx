import SearchPage from "@/components/Searchbar";

export default async function Search() {
  let products = [];

  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API failed:", res.status);
    } else {
      products = await res.json();
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }

  return <SearchPage products={products} />;
}
