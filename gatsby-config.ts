import type { GatsbyConfig } from "gatsby"
import * as dotenv from "dotenv"
dotenv.config()

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Shuqian Hon`,
    siteUrl: `https://sqhon.me`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_API_KEY,
      },
    },
  ],
}

export default config
