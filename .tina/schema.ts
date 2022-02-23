import { defineSchema } from '@tinacms/cli'

const ThemeCollection = {
  label: 'Theme',
  name: 'theme',
  path: 'content/theme',
  fields: [
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
    {
      label: 'Font Size',
      type: 'string',
      name: 'fontSize',
    }
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
    {
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
            {
              name: 'Gallery',
              label: 'Gallery', 
              fields: [
                {
                  label: 'Images',
                  name: 'images',
                  type: 'object',
                  list: true,
                  fields: [
                    {
                      type: 'image',
                      name: 'src',
                      label: 'Source',
                    },
                    {
                      type: 'string',
                      name: 'width',
                      label: 'Width'
                    },
                    {
                      type: 'string',
                      name: 'height',
                      label: 'Height'
                    },
                  ]
                },
                {
                  type: 'string',
                  name: 'alignment',
                  label: 'Alignment',
                  options: ['left','center', 'right']
                },
                {
                  type: 'string',
                  name: 'gap',
                  label: 'Gap'
                }
              ]
            }
          ]
        },
      ],
    }
  ],
})
