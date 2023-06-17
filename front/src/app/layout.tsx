import { ReactNode } from "react"
import Head from "./head"

export default function RootLayout(
  { children }: { children: ReactNode }
) {
  return (
    <html lang="pt-BR">
      <Head />
      <body>
        {children}
      </body>
    </html>
  )
}
