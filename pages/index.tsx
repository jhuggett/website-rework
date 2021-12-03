import { getStaticPropsForTina } from 'tinacms'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { Layout } from '../components/Layout'
import Image from 'next/image'
import { themeFragment, customGetStaticPropsForTina } from './_app'


export default function Home(props) {
  const { data } = props.data.getPageDocument
  const content = data.body
  return (
    <Layout>
      <TinaMarkdown content={content} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const tinaProps = await customGetStaticPropsForTina({
    firstLine: null,
    query: `
    getPageDocument(relativePath: "home.mdx"){
      data{
        body
        hero
      }
    }
  `,
    variables: {},
  })

  return {
    props: {
      ...tinaProps,
    },
  }
}
