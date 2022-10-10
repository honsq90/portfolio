import { graphql, PageProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import * as React from "react";

const IndexPage = ({ data }: PageProps<Queries.AllPhotosQuery>) => {
  return (
    <div className="grid grid-flow-row grid-cols-2 overflow-scroll max-h-screen">
      {data.allContentfulAsset.nodes.map((node) => <div key={node.id}>
        <GatsbyImage image={node.gatsbyImageData!} alt="" />
      </div>)}
    </div>
  );
};

export default IndexPage;

export const query = graphql`
  query AllPhotos {
    allContentfulAsset(sort: {fields: title, order: DESC}) {
      nodes {
        id
        title
        gatsbyImageData(height: 800)
      }
    }
  }
`
