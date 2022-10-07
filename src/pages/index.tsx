import { graphql, PageProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import * as React from "react";

const IndexPage = ({ data }: PageProps<Queries.AllPhotosQuery>) => {
  return (
    <div className="grid grid-flow-row grid-cols-4 gap-2">
      {data.allContentfulPhoto.nodes.map((node) => <div className="relative cursor-pointer">
        <GatsbyImage image={node.image?.gatsbyImageData!} alt=""/>
        <span className="opacity-0 hover:opacity-100 hover:bg-black hover:bg-opacity-40 transition-opacity ease-in-out duration-500 absolute left-0 right-0 top-0 bottom-0 flex flex-col justify-end text-center">{node.name}</span>
      </div>)}
    </div>
  );
};

export default IndexPage;

export const query = graphql`
 query AllPhotos {
  allContentfulPhoto {
    nodes {
      id
      name
      dateTaken
      image {
        gatsbyImageData(height: 800)
      }
    }
  }
 }
`