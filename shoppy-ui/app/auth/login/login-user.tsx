"use server";

import { redirect } from "next/navigation";
import {post} from "@/app/utils/fetch";
import {FormError} from "@/app/common/form-error.interface";
import {cookies} from "next/headers";
import {jwtDecode} from "jwt-decode";

export default async function loginUser(_prevState: FormError, formData: FormData) {
    const { res, error } = await post('auth/login', formData);
    if (error) {
        return { error }
    }
    setAuthCookie(res);
    redirect("/");
}

const setAuthCookie = (response: Response) => {
    const setCookieHeader = response.headers.get("Set-Cookie");
    if (setCookieHeader) {
        const token = setCookieHeader.split(';')[0].split('=')[1];
        cookies().set({
            name: 'Authentication',
            value: token,
            secure: true,
            httpOnly: true,
            expires: new Date(jwtDecode(token).exp! * 1000),
        })
    }
}