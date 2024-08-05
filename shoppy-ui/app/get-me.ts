"use server"

import {API_URL} from "@/app/common/constants/api";
import {cookies} from "next/headers";
import {get} from "@/app/common/utils/fetch";

export default async function getMe() {
    return get('users/me');
}