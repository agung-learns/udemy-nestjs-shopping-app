"use server";

import { API_URL } from "@/app/common/constants/api";
import { redirect } from "next/navigation";
import {getErrorMessage} from "@/app/common/utils/errors";
import {post} from "@/app/common/utils/fetch";
import {FormError} from "@/app/common/interfaces/form-error.interface";

export default async function createUser(_prevState: FormError, formData: FormData) {
    const { error } = await post('users', formData);
    if (error) {
        return { error }
    }
    redirect("/");
}
