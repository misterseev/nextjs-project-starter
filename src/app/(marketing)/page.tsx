import { HomeView } from "@/features/home";
import { siteConfig } from "@/shared/config/site";
import { JsonLd } from "@/shared/seo/json-ld";
import { createMetadata } from "@/shared/seo/metadata";
import { websiteSchema } from "@/shared/seo/schemas";

export const metadata = createMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <HomeView name={siteConfig.name} description={siteConfig.description} />
    </>
  );
}
