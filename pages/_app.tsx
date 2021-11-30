import dynamic from 'next/dynamic'
import { TinaEditProvider } from 'tinacms/dist/edit-state'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { TinaCloudCloudinaryMediaStore } from 'next-tinacms-cloudinary'

// @ts-ignore FIXME: default export needs to be 'ComponentType<{}>
const TinaCMS = dynamic(() => import('tinacms'), { ssr: false })

const NEXT_PUBLIC_TINA_CLIENT_ID = process.env.NEXT_PUBLIC_TINA_CLIENT_ID
const NEXT_PUBLIC_USE_LOCAL_CLIENT =
  process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT || true


const theme = {
  background: 'black',
  primary: 'green',
  secondary: 'white'
}

const GlobalStyle = createGlobalStyle`
  body {
    background: ${props => props.theme.background};
    color: ${props => props.theme.primary};
    
    font-size: 5em;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    
  }

  html, body, #__next {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
`

const App = ({ Component, pageProps }) => {

  const ThemeWrappedComponent = (props) => {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...props} />
      </ThemeProvider>
    )
  }

  return (
      <TinaEditProvider
        showEditButton={true}
        editMode={
          <TinaCMS
            branch="master"
            clientId={NEXT_PUBLIC_TINA_CLIENT_ID}
            isLocalClient={Boolean(Number(NEXT_PUBLIC_USE_LOCAL_CLIENT))}
            mediaStore={TinaCloudCloudinaryMediaStore}
            cmsCallback={cms => {
              cms.flags.set("tina-admin", true)
            }}
            {...pageProps}
          >
            {(livePageProps) => <ThemeWrappedComponent {...livePageProps} />}
          </TinaCMS>
        }
      >
        <ThemeWrappedComponent {...pageProps} />
      </TinaEditProvider>
  )
}

export const themeFragment = `
  getThemeDocument(relativePath: )
`

export default App