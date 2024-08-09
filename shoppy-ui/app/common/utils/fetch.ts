import { API_URL } from "@/app/common/constants/api";
import { getErrorMessage } from "@/app/common/utils/errors";
import { cookies } from "next/headers";

export const getHeaders = () => ({
  Cookie: cookies().toString(),
});

export const post = async (path: string, formData: FormData) => {
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getHeaders(),
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const parsedRes = await res.json();

  if (!res.ok) {
    return { data: parsedRes, error: getErrorMessage(parsedRes) };
  }
  return { error: "", data: parsedRes, response: res };
};

export const get = async <T>(path: string, tags?: string[]) => {
  const res = await fetch(`${API_URL}/${path}`, {
    headers: {
      ...getHeaders(),
    },
    next: {
      tags: ["products"],
    },
  });
  return res.json() as T;
};
