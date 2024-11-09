import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: "duo6qw7g",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-11-08",
};

const sanityClient = createClient(config);
export default sanityClient;
