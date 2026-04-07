import { createClient } from "next-sanity";

const projectId = process.env.SANITY_PROJECT_ID!;
const dataset = process.env.SANITY_DATASET!;
const apiVersion = process.env.SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_TOKEN;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});
