import CreateProductFab from "@/app/products/create-product/create-product-fab";
import Products from "@/app/products/products";

export default async function Home() {
  return (
      <>
        <Products />
        <CreateProductFab />
      </>
  );
}
