import { getNextStaticProps } from "@faustjs/next";
import { client } from "client";
import { Footer, Header, Hero, Posts } from "components";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const POSTS_PER_PAGE = 6;

export default function Shop() {
  const { useQuery, usePosts } = client;
  const { query = {} } = useRouter();
  const generalSettings = useQuery().generalSettings;
  const { postSlug, postCursor } = query;
  const isBefore = postSlug === "before";
  const posts = usePosts({
    after: !isBefore ? (postCursor as string) : undefined,
    before: isBefore ? (postCursor as string) : undefined,
    first: !isBefore ? POSTS_PER_PAGE : undefined,
    last: isBefore ? POSTS_PER_PAGE : undefined,
  });

  console.log("dsada", client.client);

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>Ürünlerimiz - {generalSettings.title}</title>
      </Head>

      <Hero title="Ürünlerimiz" />

      <main className="content content-single">
        <Posts
          posts={posts.nodes}
          heading="Latest Posts"
          intro="The Posts component in src/pages/index.tsx shows the latest six posts from the connected WordPress site."
          headingLevel="h2"
          postTitleLevel="h3"
        />
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    // Page,
    client,
  });
}
