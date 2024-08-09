"use client";

import { Button, Stack, TextField, Link } from "@mui/material";
import NextLink from "next/link";
import { useFormState } from "react-dom";
import createUser from "@/app/auth/signup/create-user";
import loginUser from "@/app/auth/login/login-user";

export default function Login() {
  const [state, formAction] = useFormState(loginUser, { error: "" });

  return (
    <form action={formAction} className="w-full max-w-xs">
      <Stack spacing={2} className="w-full max-w-xs">
        <TextField
          error={!!state?.error}
          helperText={state?.error}
          name="email"
          label="Email"
          variant="outlined"
          type="email"
        />
        <TextField
          error={!!state?.error}
          helperText={state?.error}
          name="password"
          label="Password"
          variant="outlined"
          type="password"
        />

        <Button type="submit" variant="contained">
          Login
        </Button>

        <Link component={NextLink} href="/auth/signup" className="self-center">
          Signup
        </Link>
      </Stack>
    </form>
  );
}
