import { getStaticPropsForTina } from 'tinacms'
import { Layout } from '../../components/Layout'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import styled from 'styled-components'
import Image from 'next/image'
import { customGetStaticPropsForTina } from '../_app'

const Gallery = props => {
  console.log({...props});

  const { alignment, images, gap } = props

  return (
    <StyledGallery alignment={alignment || 'center'} gap={gap} >
      {images && images.map( i => {
        const { width, height, src } = i
        return <Image 
          src={src || 'http://res.cloudinary.com/dza6vysyp/image/upload/w\_1000,h\_1000,c\_fill,q\_auto/v1613580742/sample.jpg'}
          width={width || 100}
          height={height || 100}
        />
      })}
    </StyledGallery>
  )
}

const StyledGallery = styled.div`
  width: 100%;

  padding: 1em 1em 1em 1em;
  

  display: flex;
  flex-wrap: wrap;
  align-items: ${props => props.alignment};
  justify-content: ${props => props.alignment};
  column-gap: ${props => props.gap};
  row-gap: ${props => props.gap};

`

const components = {
  Gallery: Gallery
}

export default function Home(props) {


  const { data } = props.data.getPostDocument

  return (
    <Page>
      <h1>
        {data.title}
      </h1>
      <TinaMarkdown components={components} content={data.body} />
    </Page>
  )
}

const Page = styled.div`

  margin: 1em;

`

export const getStaticPaths = async () => {
  const tinaProps = await getStaticPropsForTina({
    query: `{
        getPostList{
          edges {
            node {
              sys {
                filename
              }
            }
          }
        }
      }`,
    variables: {},
  })
  const paths = tinaProps.data.getPostList.edges.map((x) => {
    return { params: { slug: x.node.sys.filename } }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}
export const getStaticProps = async (ctx) => {
  const tinaProps = await customGetStaticPropsForTina({
    firstLine: 'query getPost($relativePath: String!)',
    query: `
        getPostDocument(relativePath: $relativePath) {
          data {
            title
            body
          }
        }
      `,
    variables: {
      relativePath: ctx.params.slug + '.mdx',
    },
  })

  return {
    props: {
      ...tinaProps,
    },
  }
}
