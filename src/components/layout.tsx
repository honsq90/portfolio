import { HeadFC } from "gatsby";
import React from "react"
import Helmet from "react-helmet";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Helmet>
        <body className="bg-slate-900 text-slate-300 overflow-hidden w-full h-screen bg-gradient-to-tr from-slate-900 to-slate-700 bg-no-repeat" />
      </Helmet>
      <main className="opacity-100">
        <div className="z-40 p-8">
          {children}
        </div>
      </main>
    </>

  )
}