import { getStaticPropsForTina } from 'tinacms'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { Layout } from '../components/Layout'
import Image from 'next/image'
import { themeFragment, customGetStaticPropsForTina } from './_app'
import styled from 'styled-components'


export default function Home(props) {
  const { data } = props.data.getPageDocument
  const content = data.body
  return (
      <Page>
      <TinaMarkdown content={content} />
      </Page>
  )
}

const Page = styled.div`

  margin: 1em;

`

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
