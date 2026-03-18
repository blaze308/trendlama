import { DummyCategory, DummyProduct } from "@/types";
import localData from "@/data/products.json";

const productsData: DummyProduct[] = (localData as { products: DummyProduct[] }).products;

export async function getProducts(
  limit = 12,
  sortBy?: string,
  order?: string
): Promise<DummyProduct[]> {
  const products = [...productsData];

  if (sortBy === "price") {
    products.sort((a, b) =>
      order === "desc" ? b.price - a.price : a.price - b.price
    );
  } else if (sortBy === "rating") {
    products.sort((a, b) => b.rating - a.rating);
  }

  return products.slice(0, limit);
}

export async function getProductsByCategory(
  categorySlug: string,
  limit = 20
): Promise<DummyProduct[]> {
  if (categorySlug === "all") return getProducts(limit);
  
  const filtered = productsData.filter(
    (p) => p.category.toLowerCase() === categorySlug.toLowerCase()
  );
  return filtered.slice(0, limit);
}

export async function searchProducts(
  query: string,
  limit = 20
): Promise<DummyProduct[]> {
  const lowercaseQuery = query.toLowerCase();
  const results = productsData.filter(
    (p) =>
      p.title.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.category.toLowerCase().includes(lowercaseQuery) ||
      p.brand?.toLowerCase().includes(lowercaseQuery)
  );
  return results.slice(0, limit);
}

export async function getProduct(id: string | number): Promise<DummyProduct | null> {
  const product = productsData.find((p) => p.id.toString() === id.toString());
  return product || null;
}

export async function getCategories(): Promise<DummyCategory[]> {
  const categories = Array.from(new Set(productsData.map((p) => p.category)));
  return categories.map((slug) => ({
    slug,
    name: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    url: `/products?category=${slug}`,
  })).slice(0, 15);
}

export function getSortParams(sort?: string): {
  sortBy?: string;
  order?: string;
} {
  switch (sort) {
    case "asc":
      return { sortBy: "price", order: "asc" };
    case "desc":
      return { sortBy: "price", order: "desc" };
    case "rating":
      return { sortBy: "rating", order: "desc" };
    default:
      return {};
  }
}
