import { graphql, PageProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { groupBy, reverse } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";

const IndexPage = ({ data }: PageProps<Queries.AllPhotosQuery>) => {
  const photos = data.allContentfulAsset?.nodes || [];
  const photosByYear = groupBy(photos, (node) => node.title!.slice(0, 4));

  const [selectedId, setSelectedId] = useState<string>()

  useEffect(() => {
    const changeImage = (event: KeyboardEvent) => {

      if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
        const currentIndex = photos.findIndex((p) => p.id == selectedId);
        let newIndex = currentIndex;
        if (event.key == "ArrowLeft") {
          newIndex -= 1
          if (newIndex < 0) {
            newIndex = photos.length - 1
          }
        } else {
          newIndex += 1
          if (newIndex >= photos.length) {
            newIndex = 0
          }
        }

        const node = photos[newIndex]
        setSelectedId(node.id)
        window.postMessage({ type: "image-requested", node })
      }

    }

    window.addEventListener("keydown", changeImage)

    return () => {
      window.removeEventListener("keydown", changeImage)
    }
  }, [photos, selectedId])



  return (
    <div className="flex flex-wrap flex-grow">
      {reverse(Object.keys(photosByYear)).map((year) => (
        <React.Fragment key={year}>
          {photosByYear[year].map((node, index) => (
            <div
              key={node.id}
              id={index == 0 ? `year-${year}` : undefined}
              className="md:w-1/2 content-center hover:cursor-pointer"
              onClick={() => {
                setSelectedId(node.id)
                window.postMessage({ type: "image-clicked", node })
              }}
            >
              <GatsbyImage
                imgClassName="h-full"
                image={node.gatsbyImageData!} alt={node.title!} />
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default IndexPage;

export const query = graphql`
  query AllPhotos {
    allContentfulAsset(sort: { fields: title, order: DESC }) {
      nodes {
        id
        title
        gatsbyImageData(height: 800)
        fullScreen: gatsbyImageData(height: 1200)
      }
    }
  }
`;
