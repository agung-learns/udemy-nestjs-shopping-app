import {Card} from "@mui/material";
import Typography from "@mui/material/Typography";
import {IProduct} from "@/app/products/interfaces/product.interface";

interface ProductProps {
    product: IProduct
}

export default function Product({ product }: ProductProps) {
    return (
        <Card className="m-1 p-5">
            <Typography variant="h4">
                {product.name}
            </Typography>
            <Typography variant="h4">
                {product.description}
            </Typography>
            <Typography>
                $ {product.price}
            </Typography>
        </Card>
    )
}