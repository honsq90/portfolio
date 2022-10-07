import { graphql, PageProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import * as React from "react";

const IndexPage = ({ data }: PageProps<Queries.AllPhotosQuery>) => {
  return (
    <div className="grid grid-flow-row grid-cols-2 overflow-scroll max-h-screen">
      {data.allContentfulAsset.nodes.map((node) => <div className="relative cursor-pointer">
        <GatsbyImage image={node.gatsbyImageData!} alt="" />
        <span className="opacity-0 hover:opacity-100 hover:bg-black hover:bg-opacity-40 transition-opacity ease-in-out duration-500 absolute left-0 right-0 top-0 bottom-0 flex flex-col justify-end text-center text-slate-300">{node.title}</span>
      </div>)}
    </div>
  );
};

export default IndexPage;

export const query = graphql`
 query AllPhotos {
  allContentfulAsset {
    nodes {
      id
      title
      gatsbyImageData(height: 800)
    }
  }
 }
`