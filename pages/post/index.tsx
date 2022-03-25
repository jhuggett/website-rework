import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import styled from 'styled-components'
import { ExperimentalGetTinaClient } from '../../.tina/__generated__/types'

// github: '<i class="fab fa-github"></i>',
// npm: '<i class="fab fa-npm"></i>',
// other: '<i class="fas fa-link"></i>'

export default function Posts({ posts, themeInteractor }) {
  const postsList = posts.data.getPostList.edges


  return (
    <Page>
      
      <Heading>J. T. Huggett</Heading>
      <PostList>
        {postsList.map((post) => (
          <Link key={post.node.id} href={`/post/${post.node.sys.filename}`} passHref>
            <PostCard >
              {post.node.data.title}
              <Topics>
                {post.node.data.topic.map(i => (<Topic>{i}</Topic>))}
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
        See also
      </h4>
      <ThemeCardContainer>
        <ExternalLink target={'_blank'} referrerPolicy={'no-referrer'} href='https://collection.huggett.ca'>
          <p>Treasures from my adventures</p>
        </ExternalLink>
      </ThemeCardContainer>
      <ExternalCollection>
        <ExternalLink target={'_blank'} referrerPolicy={'no-referrer'} href='https://www.instagram.com/harvesthailforge'>
          <i className="fab fa-instagram-square"></i>
        </ExternalLink>
        <ExternalLink target={'_blank'} referrerPolicy={'no-referrer'} href='https://www.linkedin.com/in/joelhuggett'>
          <i className="fab fa-linkedin"></i>
        </ExternalLink>

        <ExternalLink target={'_blank'} referrerPolicy={'no-referrer'} href='https://github.com/jhuggett'>
          <i className="fab fa-github-square"></i>
        </ExternalLink>
      </ExternalCollection>
    </Page>
  )
}



const ExternalCollection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ExternalLink = styled.a`
  transition-duration: .5s;
  margin: .5em;
  color: ${props => props.theme.secondary};
  text-align: center;
  :hover{
    color: ${props => props.theme.primary};
    cursor: pointer;
  }
`

const ThemeCard = styled.div`
  font-size: .5em;
  padding: 1rem;
  margin: .1rem;
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
  flex-wrap: wrap;
`

const Heading = styled.h1`
  width: 100%;
  text-align: center;
`

const Page = styled.div`
  padding: 1em;
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

  margin-top: .5em;

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
