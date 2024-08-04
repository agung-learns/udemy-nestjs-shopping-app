import {API_URL} from "@/app/constants/api";
import {getErrorMessage} from "@/app/utils/errors";
import {cookies} from "next/headers";

export const getHeaders = () => ({
    Cookie: cookies().toString(),
})

export const post = async (path: string, formData: FormData) => {
    const res = await fetch(`${API_URL}/${path}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          ...getHeaders(),
        },
        body: JSON.stringify(Object.fromEntries(formData)),
    });
    const parsedRes = await res.json();

    if (!res.ok) {
        return { res, error: getErrorMessage(parsedRes) };
    }
    return { res, error: ''}
}

export const get = async (path: string) => {
    const res = await fetch(`${API_URL}/${path}`, {
        headers: {
            ...getHeaders(),
        },
    });
    return res.json();
}