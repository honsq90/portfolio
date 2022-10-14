import { graphql, PageProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { groupBy, orderBy, reverse, sortBy } from "lodash";
import * as React from "react";

const IndexPage = ({ data }: PageProps<Queries.AllPhotosQuery>) => {
  const photos = data.allContentfulAsset?.nodes || []

  const photosByYear = groupBy(photos, (node) => node.title!.slice(0, 4))

  return (
    <div className="flex flex-wrap flex-grow">
      {reverse(Object.keys(photosByYear))
        .map((year) =>
          <React.Fragment key={year}>
            {photosByYear[year].map((node, index) => (
              <div key={node.id} id={index == 0 ?`year-${year}`: undefined} className="md:w-1/2 content-center">
                <GatsbyImage image={node.gatsbyImageData!} alt="" />
              </div>
            ))}
          </React.Fragment>
        )}

    </div>
  );
};

export default IndexPage;

export const query = graphql`
  query AllPhotos {
    allContentfulAsset(sort: {fields: title, order: DESC }) {
      nodes {
        id
        title
        gatsbyImageData(height: 800)
      }
    }
  }
`;
