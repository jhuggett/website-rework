import { TinaMarkdown } from 'tinacms/dist/rich-text'
import styled from 'styled-components'
import { ExperimentalGetTinaClient } from '../.tina/__generated__/types'
import { useTina } from 'tinacms/dist/edit-state'


export default function Home(props) {
  const { data }: any = useTina(props.page)
  const content = data.getPageDocument.data
  return (
      <Page>
      <TinaMarkdown data-tinafield="body" content={content.body} />
      </Page>
  )
}

const Page = styled.div`

  margin: 1em;

`

export const getStaticProps = async () => {
  const client = ExperimentalGetTinaClient()
  const page = await client.getPageDocument({relativePath: 'home.mdx'})
  const themes = await client.getThemeList()

  return {
    props: {
      page,
      themes
    },
  }
}
