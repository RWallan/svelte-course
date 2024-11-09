import { createClient, type ClientConfig } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

const config: ClientConfig = {
  projectId: "duo6qw7g",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-11-08",
};

const sanityClient = createClient(config);
export default sanityClient;

function processProjectContent(content: RawTextContent | RawImageContent) {
  if (content._type === "block") {
    const processedTextContent: ProcessedTextContent = {
      type: "text",
      style: content.style,
      textToRender: content.children.map((elem) => elem.text).join("\n"),
    };

    return processedTextContent;
  } else {
    const builder = ImageUrlBuilder(sanityClient);
    const projectImageUrl = builder.image(content).url();

    const processedImage: ProcessedImageContent = {
      type: "image",
      url: projectImageUrl,
    };

    return processedImage;
  }
}

export function processProjectEntries(rawProject: SanityProject) {
  const builder = ImageUrlBuilder(sanityClient);
  const projectImageUrl = builder.image(rawProject.image).url();

  const processedProject: ProcessedProject = {
    name: rawProject.name,
    company: rawProject.company,
    dateAccomplished: rawProject.dateAccomplished,
    stack: rawProject.stack,
    slug: rawProject.slug,
    projectUrl: rawProject.url,
    projectImageUrl,
    content: rawProject.content.map(processProjectContent),
  };

  return processedProject;
}
