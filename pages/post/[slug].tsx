import { ExperimentalGetTinaClient } from "../../.tina/__generated__/types";
import { useTina } from 'tinacms/dist/edit-state'
import { Post } from '../../components/post'

export default function BlogPost(props) {
  const { data } : any = useTina({...props.post})
  const content = data.getPostDocument.data
  
  return (
    <Post content={content} />
  )
}

export const getStaticPaths = async () => {
  const client = ExperimentalGetTinaClient()
  const posts = await client.getPostList()

  const paths = posts.data.getPostList.edges.map((x) => {
    return { params: { slug: x.node.sys.filename } }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async (ctx) => {
  const client = ExperimentalGetTinaClient()
  const post = await client.getPostDocument({relativePath: ctx.params.slug + '.mdx'})
  const themes = await client.getThemeList()

  return {
    props: {
      post,
      themes
    },
  }
}
