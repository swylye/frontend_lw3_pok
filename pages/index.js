import Head from 'next/head'
import Header from "../components/Header"
import NftDisplay from '../components/NftDisplay'
import Footer from '../components/Footer'

export default function Home() {

  return (
    <div className="">
      <Head>
        <title>LearnWeb3 - Proof of Knowledge</title>
        <meta name="description" content="LearnWeb3's Proof of Knowledge using non fungible tokens" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <NftDisplay />
      <Footer />
    </div>
  )
}
