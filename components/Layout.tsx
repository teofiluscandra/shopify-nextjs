import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Head>
        <title>Fisher</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
