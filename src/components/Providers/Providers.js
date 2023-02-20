'use client'
import { Provider } from "react-redux"
import { store } from "@/redux/store"


import { ThemeProvider as NextThemeProvider } from "next-themes"
import { CacheProvider } from "@emotion/react"
import createEmotionCache from "./createEmotionCache"

import MUIThemeProvider from "./MUIThemeProvider"
import Layout from '@/components/Layout/Layout';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function Providers({ children, emotionCache = clientSideEmotionCache }) {

    return (
        <Provider store={store}>
            {/* disableTransitionOnChange */}
            <NextThemeProvider enableSystem={true} attribute="class" disableTransitionOnChange>
                <CacheProvider value={emotionCache}>
                    <MUIThemeProvider>
                        <Layout>

                            {children}

                        </Layout>
                    </MUIThemeProvider>
                </CacheProvider>
            </NextThemeProvider>
        </Provider>
    );
}