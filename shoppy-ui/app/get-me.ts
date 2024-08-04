"use server"

import {API_URL} from "@/app/constants/api";
import {cookies} from "next/headers";
import {get} from "@/app/utils/fetch";

export default async function getMe() {
    return get('users/me');
}