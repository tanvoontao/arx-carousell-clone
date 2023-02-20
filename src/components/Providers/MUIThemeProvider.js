import { useTheme } from "next-themes"
import { GlobalStyles } from "@mui/material"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { darkTheme, globalStyles, lightTheme } from "./theme"

const MUIThemeProvider = ({ children }) => {
    const { theme } = useTheme()
    const currentTheme = (theme == "light" ? lightTheme : darkTheme)

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <GlobalStyles styles={globalStyles} />
            {children}
        </ThemeProvider>
    )
}

export default MUIThemeProvider
