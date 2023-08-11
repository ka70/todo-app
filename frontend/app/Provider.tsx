"use client";
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import React from 'react';

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};

export const theme = extendTheme({
    config,
});

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <React.StrictMode>
            <ChakraProvider theme={theme}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                {children}
            </ChakraProvider>
        </React.StrictMode>
    );
}
