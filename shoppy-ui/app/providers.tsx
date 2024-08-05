'use client'

import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import {ThemeProvider} from "@mui/material";
import darkTheme from "@/app/dark.theme";
import {ReactElement} from "react";
import {AuthContext} from "@/app/auth/auth-context";

interface ProviderProps {
    children: ReactElement[];
    authenticated: boolean;
}

export default function Providers({ children, authenticated }: ProviderProps) {
    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={darkTheme}>
                <AuthContext.Provider value={authenticated}>
                    { children }
                </AuthContext.Provider>
            </ThemeProvider>
        </AppRouterCacheProvider>
    )
}