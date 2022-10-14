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
      <header className="sticky top-0 z-10 flex-none lg:w-1/6 lg:h-screen bg-white flex flex-row px-4 md:justify-center lg:justify-start lg:flex-col">
        <img
          src={logo}
          alt="Site logo"
          className="flex-none w-10 lg:w-16 h-auto justify-center self-center py-2 lg:py-4"
        />

        <div className="hidden lg:block text-center text-2xl ml-1 lg:text-3xl pt-1 self-center">
          Shuqian Hon Photography
        </div>

        <nav className="flex p-2 overflow-x-scroll max-w-full lg:flex lg:flex-wrap lg:pl-4 lg:pt-4 gap-1">
          {years.map((year) => {
            return <a key={year} href={`#year-${year}`}
              className="select-none flex-grow text-center p-1 border-slate-600 border-solid lg:rounded-md lg:border lg:w-1/3 border-r-slate-700 hover:border-b hover:bg-slate-200">
              {year}
            </a>
          })}
        </nav>

      </header>
      <main className="flex-auto overflow-scroll max-h-screen scroll-smooth">
        {children}
      </main>
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
