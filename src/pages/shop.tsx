import { getNextStaticProps } from "@faustjs/next";
import { client } from "client";
import { Footer, Header, Hero, Posts } from "components";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import AddToCartButton from "components/cart/AddToCartButton";

const POSTS_PER_PAGE = 6;

export default function Shop() {
  const { useQuery, usePosts, useMutation } = client;
  const { products } = useQuery();
  const items = products({}).nodes;
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
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row">
                {items.map((product, index) => {
                  return (
                    <div key={index} className="col-12 col-md-6 col-lg-4">
                      <div className="card">
                        <img
                          src={product.image.sourceUrl()}
                          className="card-img-top"
                          alt={product.image.altText}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>

                          <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html: product.shortDescription() ?? "",
                            }}
                          />
                        </div>
                        <p>{product.$on.SimpleProduct.price()}</p>
                      </div>
                      <AddToCartButton product={product} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page: Shop,
    client,
  });
}
