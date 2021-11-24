import { getStaticPropsForTina } from 'tinacms'
import { Layout } from '../../components/Layout'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
export default function Home(props) {

  const { data } = props.data.getPostDocument

  return (
    <Layout>
      <h1>
        {data.title}
      </h1>
      <TinaMarkdown content={data.body} />
    </Layout>
  )
}

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
  const tinaProps = await getStaticPropsForTina({
    query: `query getPost($relativePath: String!) {
        getPostDocument(relativePath: $relativePath) {
          data {
            title
            body
          }
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
