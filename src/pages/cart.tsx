import { useState, useContext } from "react";
import { getNextStaticProps } from "@faustjs/next";
import { client } from "client";
import { Footer, Header, Hero, Posts } from "components";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { AppContext } from "../components/context/AppContext";
import Link from "next/link";

export default function Cart() {
  const { useQuery, usePosts, useMutation } = client;
  const { products } = useQuery();
  const items = products({}).nodes;
  const { query = {} } = useRouter();
  const generalSettings = useQuery().generalSettings;
  const [cart, setCart] = useContext(AppContext);

  if (typeof window !== "undefined") {
    var existingCart =
      JSON.parse(localStorage.getItem("wpd-cart")) &&
      JSON.parse(localStorage.getItem("wpd-cart")).products;
    console.log("dsasadsdsdas", existingCart);
  } else {
    var existingCart = cart.products;
  }

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>Your Cart- {generalSettings.title}</title>
      </Head>

      <Hero title="Cart" />

      <main className="content content-single">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row">
                {existingCart &&
                  existingCart.map((product, index) => {
                    return (
                      <div key={index} className="col-12 col-md-6 col-lg-4">
                        <div className="card">
                          <div className="card-body">
                            <div
                              // eslint-disable-next-line react/no-danger
                              dangerouslySetInnerHTML={{
                                __html: product.name ?? "",
                              }}
                            />
                            <p className="card-text">
                              <small className="text-muted">
                                {product.qty}
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <Link href="/shop">Return to Shop</Link>
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
    Page: Cart,
    client,
  });
}
