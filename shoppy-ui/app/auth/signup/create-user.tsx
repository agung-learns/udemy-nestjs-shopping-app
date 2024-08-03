"use server";

import { API_URL } from "@/app/constants/api";
import { redirect } from "next/navigation";
import {getErrorMessage} from "@/app/utils/errors";

export default async function createUser(_prevState: any, formData: FormData) {
    const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        body: formData,
    });
    const parsedRes = await res.json();
    if (!res.ok) {
        return { error: getErrorMessage(parsedRes) };
    }
    redirect("/");
}