"use client";

import { IProduct } from "@/app/products/interfaces/product.interface";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Product from "@/app/products/product";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { API_URL } from "@/app/common/constants/api";
import revalidateProducts from "@/app/products/actions/revalidate-products";
import getAuthentication from "@/app/auth/actions/get-authentication";

interface ProductGridProps {
  products: IProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  useEffect(() => {
    let socket: Socket;
    const createSocket = async () => {
      socket = io(API_URL!, {
        auth: { Authentication: await getAuthentication() },
      });
      socket.on("productUpdated", () => {
        revalidateProducts();
      });
    };

    createSocket();

    return () => {
      socket?.disconnect();
    };
  }, []);

  return (
    <Grid container spacing={3} sx={{ height: "85vh", overflow: "scroll" }}>
      {products.map((product) => (
        <Grid key={product.id} sm={6} lg={4} xs={12}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
