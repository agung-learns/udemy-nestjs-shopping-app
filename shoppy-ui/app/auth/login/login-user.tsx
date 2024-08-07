"use server";

import { redirect } from "next/navigation";
import {post} from "@/app/common/utils/fetch";
import {FormError} from "@/app/common/interfaces/form-response.interface";
import {cookies} from "next/headers";
import {jwtDecode} from "jwt-decode";
import {AUTHENTICATION_COOKIE} from "@/app/auth/auth-cookie";

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
            name: AUTHENTICATION_COOKIE,
            value: token,
            secure: true,
            httpOnly: true,
            expires: new Date(jwtDecode(token).exp! * 1000),
        })
    }
}