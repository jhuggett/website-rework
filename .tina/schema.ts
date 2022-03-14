import { defineSchema } from '@tinacms/cli'
import { BlogPostSchema } from '../components/post'

const ThemeCollection = {
  label: 'Theme',
  name: 'theme',
  path: 'content/theme',
  fields: [
    {
      label: 'Name',
      type: 'string',
      name: 'name',
    },
    {
      label: 'Background',
      type: 'string',
      name: 'background',
      ui: {
        component: "color",
        colorFormat: 'hex',
        widget: 'sketch',
      }
    },
    {
      label: 'Primary',
      type: 'string',
      name: 'primary',
      ui: {
        component: "color",
        colorFormat: 'hex',
        widget: 'sketch',
      }
    },
    {
      label: 'Secondary',
      type: 'string',
      name: 'secondary',
      ui: {
        component: "color",
        colorFormat: 'hex',
        widget: 'sketch',
      }
    },
  ]
}

export default defineSchema({
  collections: [
    ThemeCollection,
    {
      label: 'Page Content',
      name: 'page',
      path: 'content/page',
      format: 'mdx',
      fields: [
        {
          name: 'body',
          label: 'Main Content',
          type: 'rich-text',
          isBody: true,
          
        },
        {
          name: 'hero',
          type: 'image',
          label: 'Hero Image',
        }
      ],
    },
    BlogPostSchema
  ],
})
