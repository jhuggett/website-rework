import { TinaMarkdown } from 'tinacms/dist/rich-text'
import styled from 'styled-components'
import { GallerySchema, Gallery } from './gallery'
import Link from 'next/link'

export const BlogPostSchema = {
  label: 'Blog Posts',
  name: 'post',
  path: 'content/post',
  format: 'mdx',
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    {
      type: 'string',
      label: 'Topic',
      name: 'topic',
      options: ['programming', 'blacksmithing'],
      list: true
    },
    {
      type: 'rich-text',
      label: 'Blog Post Body',
      name: 'body',
      isBody: true,
      templates: [
        GallerySchema
      ]
    },
  ],
}

const components = {
  Gallery: Gallery
}

export const Post = ({content}) => {
  return (
    <Page>
      <ReturnButton />
      <Title data-tinafield={'title'}>
        {content.title}
      </Title>
      <div data-tinafield={'body'} >
        <TinaMarkdown components={components} content={content.body} />
      </div>
      <ReturnButton />
    </Page>
  )
}

const ReturnButton = () => (
  <ReturnButtonSection>
    <Link href="/post">
      <ReturnButtonAnchor>
        Return
      </ReturnButtonAnchor>
    </Link>
  </ReturnButtonSection>
)

const ReturnButtonAnchor = styled.a`
  cursor: pointer;
  border: 2px solid ${props => props.theme.secondary};
  border-radius: 12px;
  padding: 1rem 2rem .5rem 2rem;
  transition-duration: .5s;
  :hover {
    background: ${props => props.theme.secondary};
    color: ${props => props.theme.background};
    text-decoration: none;
  };
`

const ReturnButtonSection = styled.div`
  margin-top: 2em;
  width: 100%;
  text-align: center;

`

const Page = styled.div`
  margin: 5vw;
`

const Title = styled.h1`
  text-decoration: underline;
`
