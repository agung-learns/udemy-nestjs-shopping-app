import getProducts from "@/app/products/actions/get-products";
import { Grid } from "@mui/material";
import Product from "@/app/products/product";
import ProductGrid from "@/app/products/product-grid";

export default async function Products() {
  const products = await getProducts();

  return <ProductGrid products={products} />;
}
