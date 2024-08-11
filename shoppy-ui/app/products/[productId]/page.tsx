import getProduct from "@/app/products/[productId]/get-product";
import { Stack, Typography, Grid } from "@mui/material";
import Image from "next/image";
import { getProductImage } from "@/app/products/product-image";
import Checkout from "../../checkout/checkout";

interface SingleProductProps {
  params: {
    productId: number;
  };
}

export default async function SingleProduct({
  params: { productId },
}: SingleProductProps) {
  const product = await getProduct(+productId);

  return (
    <Grid container marginBottom="2rem" rowGap="3">
      {product.imageExist && (
        <Grid md={6} xs={12}>
          <Image
            src={getProductImage(product.id)}
            alt={product.name}
            width="0"
            height="0"
            sizes="100vw"
            className="w-auto md:w-3/4 h-auto"
          />
        </Grid>
      )}
      <Grid md={6} xs={12}>
        <Stack gap={3}>
          <Typography variant="h2">{product.name}</Typography>
          <Typography>{product.description}</Typography>
          <Typography variant="h4">$ {product.price}</Typography>

          <Checkout productId={productId} />
        </Stack>
      </Grid>
    </Grid>
  );
}
