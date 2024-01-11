import { extendTheme } from "@chakra-ui/react"

import colors from "./foundations/colors"
import styles from "./styles"

const customTheme = extendTheme({
  styles,
  colors,
})

export default customTheme
