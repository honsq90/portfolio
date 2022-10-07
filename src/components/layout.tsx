import { graphql, PageProps } from "gatsby";
import React from "react";
import Helmet from "react-helmet";

export default function Layout({ data, children }: PageProps<Queries.IndexPageQuery>) {

  return (
    <>
      <Helmet>
        <title>{data?.site?.siteMetadata?.title}</title>
        <meta name="siteUrl" content={data?.site?.siteMetadata?.siteUrl} />
        <body className="bg-slate-900 text-slate-300 overflow-hidden w-full h-screen bg-gradient-to-tr from-slate-900 to-slate-700 bg-no-repeat" />
      </Helmet>
      <main className="opacity-100">
        <div className="w-full h-12 text-center text-3xl pt-1">
          Shuqian Hon Photography
        </div>
        <section>
          {children}
        </section>
      </main>
    </>

  )
}

export const query = graphql`
 query IndexPage {
   site {
     siteMetadata {
       title
       siteUrl
     }
   }
 }
`
