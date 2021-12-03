import dynamic from 'next/dynamic'
import { TinaEditProvider } from 'tinacms/dist/edit-state'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { TinaCloudCloudinaryMediaStore } from 'next-tinacms-cloudinary'
import { getStaticPropsForTina } from 'tinacms'
import { useEffect, useState } from 'react'
import styled from 'styled-components'


// @ts-ignore FIXME: default export needs to be 'ComponentType<{}>
const TinaCMS = dynamic(() => import('tinacms'), { ssr: false })

const NEXT_PUBLIC_TINA_CLIENT_ID = process.env.NEXT_PUBLIC_TINA_CLIENT_ID
const NEXT_PUBLIC_USE_LOCAL_CLIENT =
  process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT || true


const availibleThemes = [
  'light',
  'dark'
]

const GlobalStyle = createGlobalStyle`
  body {
    background: ${props => props.theme.background};
    color: ${props => props.theme.primary};
    
    font-size: ${props => props.theme.fontSize};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    
  }

  a {
    color: ${props => props.theme.secondary}
  }

  html, body, #__next {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
`
const ThemeDropdownContent = styled.div`
  display: none;
  position: absolute;
  min-width: 160px;
  z-index: 100;

  background-color: ${props => props.theme.secondary};

  &:hover {
    display: block;
  }

`

const ThemeDropdownButton = styled.div`
  padding: 16px;

  border-radius: 5px;

  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.background};
`

const ThemeDropDown = styled.div`
  position: relative;
  display: inline-block;

  cursor: pointer;


  font-size: .25em;
  
  &:hover ${ThemeDropdownContent} {
    display: block;
  }

`



const ThemeDropdownOptions = styled.div`
  display: block;
  padding: 12px 16px;

`

const App = ({ Component, pageProps }) => {
  console.log({
    appProps: pageProps
  });

  const [theme, setTheme] = useState({})

  const updateTheme = (to: string = null) => {
    if (to) {
      localStorage.setItem('theme', to)
    }

    const themeName = localStorage.getItem('theme')

    if (pageProps.data?.[themeName]) {
      const { background, primary, secondary, fontSize } = pageProps.data[themeName]?.data
      setTheme({
        background, 
        primary,
        secondary,
        fontSize
      })
    }
  }
  
  useEffect(() => {
      if (!localStorage.getItem('theme')) {
        updateTheme('light')
      } else {
        updateTheme()
      }
  }, [])

  console.log({
    appProps: pageProps
  });
  

  const ThemeWrappedComponent = (props) => {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        
        <ThemeDropDown>
          <ThemeDropdownButton>Change Themes</ThemeDropdownButton>
          <ThemeDropdownContent>
            {availibleThemes.map(i => {
              return (
                <ThemeDropdownOptions onClick={() => updateTheme(i)}>
                  {i}
                </ThemeDropdownOptions>
              )
            })}
          </ThemeDropdownContent>
        </ThemeDropDown>
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

export const themeFragment = (name) => `
  ${name}: getThemeDocument(relativePath: "${name}.md") {
    data {
      background
      primary
      secondary
      fontSize
    }
  }
`

export const customGetStaticPropsForTina = (context: {
  firstLine: string | null,
  query: string,
  variables: object
}) => {
  return getStaticPropsForTina({
    query: `
      ${context.firstLine || ''} {
        ${context.query}
        ${themeFragment('light')}
        ${themeFragment('dark')}
      }
    `,
    variables: context.variables
  })
}



export default App