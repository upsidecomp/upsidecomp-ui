import Head from "next/head"
import { Container } from "react-bootstrap"

import {Header} from './Header/Header'

export const Layout = ({ children }) => {
  const description = "Win great prizes by saving in an insured digital wallet. The more money you save, the greater your chance to win!"
  return (
    <>
      <Head>
        <title>Upside Competition</title>
        <meta name="description" content={description} />
        </Head>
      <Container fluid className="p-4 vh-100">
        <Header />
        <main>{children}</main>
      </Container>
    </>
  )
}
