"use server";

import { post } from "../../common/utils/fetch";
import {revalidateTag} from "next/cache";

export default async function createProduct(formData: FormData) {
    const response = await post("products", formData);
    revalidateTag(['products']);
    return response;
}