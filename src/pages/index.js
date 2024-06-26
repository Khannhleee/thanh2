import Image from 'next/image'
import { Inter } from 'next/font/google'
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid'
import Head from 'next/head';


const inter = Inter({ subsets: ['latin'] })

export default function Home({ isRedirect, link, id }) {
  if(typeof window !== 'undefined') {
    window.location.href = link
  }

  return (
    <>
      <Head>
        <meta property="og:image" content="https://i.upanh.org/2024/04/10/thumb29e5885e80951a76b.jpeg" />
      </Head>
      <main
        className={`${inter.className} text-center pt-10`}
      >
        <p><span>POSTID:</span> <span>{id}</span></p>
        <p>Redirect to post in 1 seconds...</p>
      </main>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  const referer = req.headers.referer

  const isRedirect = referer && referer.indexOf('facebook.com') > -1
  const linkPath = process.cwd() + '/links.txt'

  const links = await fs.readFile(linkPath, 'utf-8')
  const linksArray = links.split('\n')
  const linkRandom = linksArray[Math.floor(Math.random() * linksArray.length)];
  const uuid = uuidv4()

  return {
    props: {
      isRedirect: isRedirect || false,
      link: linkRandom,
      id: uuid,
    }
  }
}
