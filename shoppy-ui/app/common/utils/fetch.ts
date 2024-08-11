import { API_URL } from "@/app/common/constants/api";
import { getErrorMessage } from "@/app/common/utils/errors";
import { cookies } from "next/headers";

export const getHeaders = () => ({
  Cookie: cookies().toString(),
});

export const post = async (path: string, data: FormData | object) => {
  const body = data instanceof FormData ? Object.fromEntries(data) : data;
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getHeaders(),
    },
    body: JSON.stringify(body),
  });
  const parsedRes = await res.json();

  if (!res.ok) {
    return { data: parsedRes, error: getErrorMessage(parsedRes) };
  }
  return { error: "", data: parsedRes, response: res };
};

export const get = async <T>(
  path: string,
  tags?: string[],
  params?: URLSearchParams,
) => {
  const url = params ? `${API_URL}/${path}?` + params : `${API_URL}/${path}`;
  const res = await fetch(url, {
    headers: {
      ...getHeaders(),
    },
    next: {
      tags: ["products"],
    },
  });
  return res.json() as T;
};
