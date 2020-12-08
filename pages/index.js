import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { client } from "../utils/prismicPosts";
import Post from "@components/Post";

export default function Home({ posts, home }) {
  //  console.log(home);

  const homepage = home[0].data.title[0].text;
  console.log(homepage);

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title={homepage} />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
        {/* <div className="posts">
          {posts !== undefined &&
            posts.map((p) => {
              console.log(p);
              let title = p.title[0].text;
              let key = `${p.date}+${title}`;
              return (
                <Post key={key} date={p.date} image={p.image} title={title} />
              );
            })}
        </div> */}
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  // query() is empty on purpose!
  // https://prismic.io/docs/rest-api/query-the-api/query-all-documents
  const res = await client.query(`[at(document.type, "post")]`);
  const posts = res.results.map((p) => {
    return p.data;
  });

  const resHome = await client.query(`[at(document.type, "home")]`);
  const home = resHome.results;

  return {
    props: {
      posts,
      home,
    },
  };
}
