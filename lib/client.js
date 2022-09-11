import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

import config from "./config";

export const client = sanityClient({
  projectId: config.projectId,
  dataset: config.dataset,
  apiVersion: config.apiVersion,
  useCdn: true,
  ignoreBrowserTokenWarning: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

// https://www.sanity.io/docs/image-url
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
