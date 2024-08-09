import { Card, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { IProduct } from "@/app/products/interfaces/product.interface";
import Image from "next/image";
import { API_URL } from "@/app/common/constants/api";

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  return (
    <Card className="m-1 p-5">
      <Stack gap={3}>
        <Typography variant="h4">{product.name}</Typography>
        {product.imageExist && (
          <Image
            src={`${API_URL}/products/${product.id}.png`}
            alt={product.name}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
          />
        )}
        <Typography>{product.description}</Typography>
        <Typography>$ {product.price}</Typography>
      </Stack>
    </Card>
  );
}
