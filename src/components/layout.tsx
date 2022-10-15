import { graphql, PageProps } from "gatsby";
import { orderBy, range } from "lodash";
import React from "react";
import Helmet from "react-helmet";
import logo from "../static/images/logo.png";

export default function Layout({
  data,
  children,
}: PageProps<Queries.IndexPageQuery>) {
  const years = orderBy(range(2009, 2023), [], "desc");

  return (
    <div className="flex flex-col overflow-scroll max-h-screen lg:max-w-none lg:flex-row bg-slate-800 text-slate-200">
      <Helmet>
        <title>{data?.site?.siteMetadata?.title}</title>
        <meta name="siteUrl" content={data?.site?.siteMetadata?.siteUrl} />
        <body className="bg-slate-800 overflow-hidden w-full h-screen bg-gradient-to-tr from-slate-800 to-slate-700 bg-no-repeat" />
      </Helmet>
      <header className="bg-slate-800 fixed top-0 z-10 w-full flex-none flex flex-row px-4 py-1 md:justify-center lg:sticky lg:w-1/6 lg:h-screen lg:justify-start lg:flex-col">
        <img
          src={logo}
          alt="Site logo"
          className="w-auto lg:h-24 h-8 justify-center self-center lg:py-4"
        />

        <div className="hidden lg:block text-center text-2xl self-center">
          Shuqian Hon Photography
        </div>

        <nav className="flex gap-1 mx-1 lg:mx-0 lg:p-1 overflow-x-scroll w-full lg:flex lg:flex-wrap lg:py-8 ">
          {years.map((year) => {
            return (
              <a
                key={year}
                href={`#year-${year}`}
                className="select-none flex-grow text-center px-1 border-x border-y border-transparent border-solid hover:border-b-slate-300 hover:bg-slate-700 lg:border-slate-300 lg:rounded-md lg:border lg:w-1/3 "
              >
                {year}
              </a>
            );
          })}
        </nav>
      </header>
      <main className="flex-auto overflow-scroll max-h-screen scroll-smooth mt-10 mb-4 lg:mb-0 lg:mt-0">
        {children}
      </main>

      <footer className="bg-slate-800 fixed z-10 px-4 text-xs text-center w-full bottom-0 lg:text-base lg:left-0 lg:justify-self-end lg:w-1/6">
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
