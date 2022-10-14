import { graphql, PageProps } from "gatsby";
import { orderBy, range } from "lodash";
import React from "react";
import Helmet from "react-helmet";
import logo from "../static/images/logo.png";

export default function Layout({
  data,
  children,
}: PageProps<Queries.IndexPageQuery>) {
  const years = orderBy(range(2010, 2023), [], "desc")

  return (

    <div className="flex flex-col overflow-scroll max-h-screen lg:max-w-none lg:flex-row">
      <Helmet>
        <title>{data?.site?.siteMetadata?.title}</title>
        <meta name="siteUrl" content={data?.site?.siteMetadata?.siteUrl} />
        <body className="bg-slate-900 overflow-hidden w-full h-screen bg-gradient-to-tr from-slate-900 to-slate-700 bg-no-repeat" />
      </Helmet>
      <header className="fixed top-0 z-10 w-full bg-white flex-none flex flex-row px-4 md:justify-center lg:sticky lg:w-1/6 lg:h-screen lg:justify-start lg:flex-col">
        <img
          src={logo}
          alt="Site logo"
          className="w-auto lg:h-24 h-10 justify-center self-center p-1 lg:py-4"
        />

        <div className="hidden lg:block text-center text-2xl ml-1 pt-1 self-center">
          Shuqian Hon Photography
        </div>

        <nav className="flex p-1 overflow-x-scroll w-full lg:flex lg:flex-wrap lg:pl-4 lg:pt-4 gap-1">
          {years.map((year) => {
            return <a key={year} href={`#year-${year}`}
              className="select-none flex-grow text-center p-1 border-x border-y border-transparent border-solid hover:border-b-slate-700 hover:bg-slate-200 lg:border-slate-700 lg:rounded-md lg:border lg:w-1/3 ">
              {year}
            </a>
          })}
        </nav>
      </header>
      <main className="flex-auto overflow-scroll max-h-screen scroll-smooth mt-10 lg:mt-0">
        {children}
      </main>

      <footer className="fixed z-10 text-xs bg-white w-full bottom-0 lg:text-base lg:left-0 lg:justify-self-end lg:w-1/6 text-center">
        Copyright © 2004-2022 Shuqian Hon
      </footer>
    </div>
  );
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
`;
