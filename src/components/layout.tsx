import React from "react"

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <main className="w-full h-screen p-8 bg-slate-900 text-slate-300 bg-hero bg-no-repeat bg-cover bg-center bg-fixed">
      {children}
    </main>
  )
}