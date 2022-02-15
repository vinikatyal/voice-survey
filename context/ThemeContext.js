import React from "react"


export const ThemeValues = {
    BLUE: 1,
    PINK: 2,
    YELLOW: 3
 };

const ThemeContext = React.createContext({
  theme: ThemeValues.BLUE, // This will come from api of theme
  setTheme: () => {},
})

export default ThemeContext