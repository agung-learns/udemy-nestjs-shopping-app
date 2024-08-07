import getProducts from "@/app/products/actions/get-products";
import {Grid} from "@mui/material";
import Product from "@/app/products/product";

export default async function Products() {
    const products = await getProducts();

    return (
        <Grid container spacing={3}>
            {products.map(product => (
                <Grid key={product.id} sm={6} lg={4} xs={12}>
                    <Product product={product}/>
                </Grid>
            ))}
        </Grid>
    )
}