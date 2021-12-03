import { getStaticPropsForTina } from 'tinacms'
import { Layout } from '../../components/Layout'
import Link from 'next/link'
import { customGetStaticPropsForTina } from '../_app'
export default function Posts(props) {
  
  const postsList = props.data.getPostList.edges

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {postsList.map((post) => (
          <li key={post.node.id}>
            <Link href={`/posts/${post.node.sys.filename}`}>
              <a>{post.node.data.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps = async () => {
  const tinaProps = await customGetStaticPropsForTina({
    firstLine: null,
    query: `
        getPostList{
          edges {
            node {
              id
              sys {
                filename
              }
              data {
                title
              }
            }
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
