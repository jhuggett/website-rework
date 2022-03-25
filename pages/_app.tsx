import dynamic from 'next/dynamic'
import { TinaEditProvider } from 'tinacms/dist/edit-state'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { TinaCloudCloudinaryMediaStore } from 'next-tinacms-cloudinary'
import { useEffect, useState } from 'react'
import { Theme } from '../.tina/__generated__/types'
import Head from 'next/head'

// @ts-ignore FIXME: default export needs to be 'ComponentType<{}>
const TinaCMS = dynamic(() => import('tinacms'), { ssr: false })

const NEXT_PUBLIC_TINA_CLIENT_ID = process.env.NEXT_PUBLIC_TINA_CLIENT_ID
const NEXT_PUBLIC_USE_LOCAL_CLIENT =
  process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT || true

const GlobalStyle = createGlobalStyle`
  body {
    background: ${props => props.theme.background};
    color: ${props => props.theme.primary};
    font-size: clamp(1rem, 10vw, 5rem);
    word-wrap: break-word;
    font-family: Montserrat;
  }


  h1 {
    font-family: Cinzel;
    width: 100%;
    text-align: center;
    margin-top: .5em;
    margin-bottom: .5em;
  }

  h2, h3, h4, h5, h6 {
    font-family: 'Times New Roman', Times, serif;
    width: 100%;
    text-align: center;
    margin-top: .25em;
    margin-bottom: .25em;
  }

  a {
    color: ${props => props.theme.secondary};

    text-decoration: none;


    &:hover {
      text-decoration: underline;
    }

  }

  p {
    font-size: .5em;
    text-indent: 1em;
    
  }

  html, body, #__next {
    margin: 0;
    padding: 0;
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
  }


  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 1px ${props => props.theme.background};
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.secondary};
    
    border-radius: 1em;

  }
`

const App = ({ Component, pageProps }) => {
  const themeDocuments: Theme[] = pageProps.themes?.data.getThemeList.edges.map(i => i.node.data) || []
  const [currentTheme, setCurrentTheme] = useState<Theme>({})

  const themes = {
    set: (theme: Theme) => {
      localStorage.setItem('theme', theme.name)
      setCurrentTheme(theme)
    },
    get: () => {
      return themeDocuments
    },
    find: (name: string) => {
      return themes.get().filter(theme => theme.name === name)[0]
    },
    current: () => currentTheme
  }

  useEffect(() => {
      if (themeDocuments.length > 0) {
        if (!localStorage.getItem('theme')) {
          themes.set(themes.find("Default"))
        } else {
          const possibleTheme = themes.find(localStorage.getItem('theme'))
          if (possibleTheme) {
            themes.set(possibleTheme)
          } else {
            themes.set(themes.find("Default"))
          }
        }
      }
  }, [])

  const ThemeWrappedComponent = (props) => {
    return (
      <ThemeProvider theme={currentTheme}>
        <Head>
         <link href="/fonts/style.css" rel="stylesheet" />
        </Head>
        <GlobalStyle />
          <Component themeInteractor={themes} {...props} />
      </ThemeProvider>
    )
  }

  return (
      <TinaEditProvider
        showEditButton={false}
        editMode={
          <TinaCMS
            branch="master"
            clientId={NEXT_PUBLIC_TINA_CLIENT_ID}
            isLocalClient={Boolean(Number(NEXT_PUBLIC_USE_LOCAL_CLIENT))}
            mediaStore={TinaCloudCloudinaryMediaStore}
            cmsCallback={cms => {
              import("tinacms").then(({ RouteMappingPlugin }) => {
                const RouteMapping = new RouteMappingPlugin(
                  (collection, document) => {
                    if (["theme"].includes(collection.name)) {
                      return undefined;
                    }
                    if (["page"].includes(collection.name)) {
                      if (document.sys.filename === "home") {
                        return `/`;
                      }
                      return undefined;
                    }
                    return `/${collection.name}/${document.sys.filename}`;
                  }
                );
                cms.plugins.add(RouteMapping);
              })
              cms.flags.set("tina-admin", true)
              cms.flags.set("branch-switcher", true)
              return cms
            }}
            >
            <ThemeWrappedComponent {...pageProps} />
          </TinaCMS>
        }
        >
        <ThemeWrappedComponent {...pageProps} />
      </TinaEditProvider>
  )
}

export default App