import { graphql, PageProps } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import logo from "../static/images/logo.png";

export default function Layout({ data, children }: PageProps<Queries.IndexPageQuery>) {

  return (
    <div className="flex flex-col overflow-scroll max-h-screen lg:max-w-none lg:flex-row">
      <Helmet>
        <title>{data?.site?.siteMetadata?.title}</title>
        <meta name="siteUrl" content={data?.site?.siteMetadata?.siteUrl} />
        <body className="bg-slate-900 overflow-hidden w-full h-screen bg-gradient-to-tr from-slate-900 to-slate-700 bg-no-repeat" />
      </Helmet>
      <header className="flex-none lg:w-1/6 lg:h-screen bg-white flex flex-row justify-center lg:justify-start lg:flex-col">
        <img src={logo} alt="Site logo" className="flex-none w-10 lg:w-16 h-auto justify-center self-center py-2 lg:py-4" />
        <div className="text-center text-2xl ml-1 lg:text-3xl pt-1 self-center">
          Shuqian Hon Photography
        </div>
      </header>
      <main className="flex-auto lg:overflow-scroll lg:max-h-screen">
        {children}
      </main>
    </div>
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
