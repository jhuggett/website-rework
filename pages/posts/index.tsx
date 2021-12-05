import { getStaticPropsForTina } from 'tinacms'
import { Layout } from '../../components/Layout'
import Link from 'next/link'
import { customGetStaticPropsForTina } from '../_app'
import styled from 'styled-components'
export default function Posts(props) {
  
  const postsList = props.data.getPostList.edges

  return (
    <Page>
      <PostsHeading>Posts</PostsHeading>
      <PostList>
        {postsList.map((post) => (
          <Link key={post.node.id} href={`/posts/${post.node.sys.filename}`} passHref>
            <PostCard >
              {post.node.data.title}
              <Topics>
                ({post.node.data.topic.map(i => (<Topic>{i}</Topic>))})
              </Topics>
              
            </PostCard>
          </Link>
          
        ))}
      </PostList>
    </Page>
  )
}

const PostsHeading = styled.h1`
  width: 100%;
  text-align: center;
`

const Page = styled.div`

  margin: 1em;

`

const Topic = styled.div`
  font-size: .5em;

  margin: 0 .5em 0 .5em;

`
const Topics = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .5em;

  color: ${props => props.theme.primary};
`

const PostCard = styled.a`

  font-size: 5rem;

  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none !important;

  flex-flow: column;

  min-width: min(500px, 100%);
  max-width: 500px;

  min-height: 500px;
  max-height: 500px;

  border-style: solid;
  border-color: ${props => props.theme.secondary};

  margin: 16px;
  padding: 32px;

&:hover {
  cursor: pointer;
  
  color: ${props => props.theme.background};
  background-color: ${props => props.theme.secondary};
}

  flex: 1;

`

const PostList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;


`

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
                topic
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
