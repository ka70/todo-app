// import { ChakraProvider } from "./index";

// export default function Provider({ children }: { children: React.ReactNode }) {
//     return <ChakraProvider>{children}</ChakraProvider>;
// }

'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <CacheProvider>
            <ChakraProvider>
                {children}
            </ChakraProvider>
        </CacheProvider>
    )
}
