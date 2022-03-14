import Link from 'next/link'
import styled from 'styled-components'
import { ExperimentalGetTinaClient } from '../../.tina/__generated__/types'


export default function Posts({ posts, themeInteractor }) {
  const postsList = posts.data.getPostList.edges


  return (
    <Page>
      <Heading>Posts</Heading>
      <PostList>
        {postsList.map((post) => (
          <Link key={post.node.id} href={`/post/${post.node.sys.filename}`} passHref>
            <PostCard >
              {post.node.data.title}
              <Topics>
                ({post.node.data.topic.map(i => (<Topic>{i}</Topic>))})
              </Topics>
            </PostCard>
          </Link>
        ))}
      </PostList>
      <h4>
        Palettes
      </h4>
      <ThemeCardContainer>
        {themeInteractor.get().map(theme => (
          <ThemeCard selected={theme.name === themeInteractor.current().name} onClick={() => themeInteractor.set(theme)}>
            {theme.name}
          </ThemeCard>
        ))}
      </ThemeCardContainer>
      <h4>
        Directions
      </h4>
      <ThemeCardContainer>
        <a href='https://collection.huggett.ca'>
          <h6>Collection</h6>
          <p>Treasures from my adventures</p>
        </a>
      </ThemeCardContainer>
    </Page>
  )
}


const ThemeCard = styled.div`
  font-size: .5em;
  padding: 1rem 1rem 1rem 1rem;
  margin: 1rem 1rem 1rem 1rem;
  cursor: pointer;

  color: ${props => props.selected ? props.theme.primary : props.theme.secondary};

  transition-duration: .5s;
  border: 2px solid ${props => props.theme.background};  
  :hover {
    border-color: ${props => props.selected ? props.theme.background : props.theme.secondary};
  }
`

const ThemeCardContainer = styled.div`
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
`

const Heading = styled.h1`
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
  transition-duration: .5s;

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
  const client = ExperimentalGetTinaClient()
  const posts = await client.getPostList()
  const themes = await client.getThemeList()

  return {
    props: {
      posts,
      themes
    },
  }
}
