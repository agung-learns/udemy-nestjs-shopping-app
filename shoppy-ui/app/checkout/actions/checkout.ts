"use server";

import { post } from "@/app/common/utils/fetch";

export default async function checkout(productId: number) {
  const r = await post("checkout/session", {
    productId: +productId,
  });
  return r;
}
