
// import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from "./navbar";

// const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html>
      <head></head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
