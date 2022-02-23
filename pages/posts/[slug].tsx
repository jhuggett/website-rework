import { getStaticPropsForTina } from 'tinacms'
import { Layout } from '../../components/Layout'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import styled from 'styled-components'
import Image from 'next/image'
import { customGetStaticPropsForTina } from '../_app'
import { GallerySchema, Gallery } from '../../components/gallery'
import { ExperimentalGetTinaClient } from "../../.tina/__generated__/types";
import { useTina } from 'tinacms/dist/edit-state'

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

export default function Post(props) {
  console.log(props.post);
  
  const { data} : any = useTina({...props.post})

  const content = data.getPostDocument.data

  console.log({content});
  

  return (
    <Page>
      <h1>
        {content.title}
      </h1>
      <TinaMarkdown components={components} content={content.body} />
    </Page>
  )
}

const Page = styled.div`

  margin: 5vw;

`

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
