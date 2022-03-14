import { TinaMarkdown } from 'tinacms/dist/rich-text'
import styled from 'styled-components'
import { GallerySchema, Gallery } from './gallery'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTurnDownLeft } from '@fortawesome/pro-thin-svg-icons'

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
      <ReturnButtonSection>
        <Link href="/post">
          <ReturnButtonAnchor><FontAwesomeIcon icon={faTurnDownLeft} /></ReturnButtonAnchor>
        </Link>
      </ReturnButtonSection>
      <h1 data-tinafield={'title'}>
        {content.title}
      </h1>
      <div data-tinafield={'body'} ><TinaMarkdown components={components} content={content.body} /></div>
      <ReturnButtonSection>
        <Link href="/post">
          <ReturnButtonAnchor><FontAwesomeIcon icon={faTurnDownLeft} /></ReturnButtonAnchor>
        </Link>
      </ReturnButtonSection>
    </Page>
  )
}

const ReturnButtonAnchor = styled.a`
  cursor: pointer;
  border: 2px solid ${props => props.theme.secondary};
  border-radius: 12px;
  padding: 1rem 2rem .5rem 2rem;
  transition-duration: .5s;
  :hover {
    background: ${props => props.theme.secondary};
    color: ${props => props.theme.background};
  }
`

const ReturnButtonSection = styled.div`
  width: 100%;
  text-align: center;
`

const Page = styled.div`
  margin: 5vw;
`
