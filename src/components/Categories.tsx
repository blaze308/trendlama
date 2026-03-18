import { getCategories } from "@/lib/api";
import CategoriesClient from "./CategoriesClient";

const Categories = async () => {
  const categories = await getCategories();
  return <CategoriesClient categories={categories} />;
};

export default Categories;
