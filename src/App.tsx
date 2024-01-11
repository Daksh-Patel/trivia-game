import { ChakraProvider, Container } from "@chakra-ui/react"
import { SkipNavLink } from "@chakra-ui/skip-nav"

import HomePage from "./pages/home"
import theme from "./theme"

export const App = () => (
  <ChakraProvider theme={theme}>
    <SkipNavLink id='content' zIndex='skipLink'>
      Skip to Content
    </SkipNavLink>

    <Container maxW='1440px' px='40px' my='40px'>
      <HomePage />
    </Container>
  </ChakraProvider>
)
