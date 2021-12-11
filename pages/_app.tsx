import dynamic from 'next/dynamic'
import { TinaEditProvider } from 'tinacms/dist/edit-state'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { TinaCloudCloudinaryMediaStore } from 'next-tinacms-cloudinary'
import { getStaticPropsForTina } from 'tinacms'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Head from 'next/head'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faSwatchbook, faCheck } from '@fortawesome/free-solid-svg-icons'


// @ts-ignore FIXME: default export needs to be 'ComponentType<{}>
const TinaCMS = dynamic(() => import('tinacms'), { ssr: false })

const NEXT_PUBLIC_TINA_CLIENT_ID = process.env.NEXT_PUBLIC_TINA_CLIENT_ID
const NEXT_PUBLIC_USE_LOCAL_CLIENT =
  process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT || true


const availibleThemes = [
  'dark',
  'light',
  'ouch'
]

const GlobalStyle = createGlobalStyle`
  body {
    background: ${props => props.theme.background};
    color: ${props => props.theme.primary};
    
    font-size: ${props => props.theme.fontSize};

    word-wrap: break-word;

    
  }// triggering redeploy


  h1, h2, h3, h4, h5, h6 {
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    width: 100%;
    text-align: center;
    line-height: 1;
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
    height: 100vh;
    width: 100vw;
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
const ThemeDropdownContent = styled.div`
  
  
  position: absolute;
  right: 0;
  margin-right: -200px;
  
  min-width: 160px;
  z-index: 100;



  transition-duration: .25s;

  background-color: ${props => props.theme.secondary};

  &:hover {
    margin-right: 15px;
    
  }

`

const ThemeDropdownButton = styled.div`

  
  font-size: 3rem;
  
  line-height: 0;
  margin: 25px;


  
  color: ${props => props.theme.secondary};

  &:hover {
    
  
  }
`

const ThemeDropDown = styled.div`
  position: absolute;
  right: 0;
  top: 0;

  display: inline-block;

  cursor: pointer;

  text-align: center;



  font-size: .25em;

  
  &:hover ${ThemeDropdownContent} {

    margin-right: 15px;
  }

`



const ThemeDropdownOptions = styled.div`
  display: block;
  padding: 12px 16px;

  border-style: solid;
  border-width: 6px;
  border-color: ${props => props.theme.background};

  color: ${props => props.theme.background};


  &:hover {
    
    background-color: ${props => props.theme.primary};
  }

`

const Nav = styled.div`
  width: 100%;
  display: flex;
  
  justify-content: center;
  align-items: center;

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
        name: themeName,
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
          <ThemeDropdownButton><FontAwesomeIcon icon={faSwatchbook} /></ThemeDropdownButton>
          <ThemeDropdownContent>
            {availibleThemes.map(i => {
              return (
                <ThemeDropdownOptions onClick={() => updateTheme(i)}>
                  {i} {theme?.['name'] == i && <FontAwesomeIcon icon={faCheck} />}
                </ThemeDropdownOptions>
              )
            })}
          </ThemeDropdownContent>
        </ThemeDropDown>
        <Nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <NavSeperator />
          <Link href="/posts">
            <a>Posts</a>
          </Link>
        </Nav>
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
              cms.flags.set("branch-switcher", true)
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


const NavSeperatorStyle = styled.div`
  font-size: 1em;
  
  height: fit-content;

  line-height: 0;



  margin: 0 .5em 0 .5em;


`

const NavSeperator = () => {
  return (
    <NavSeperatorStyle>
      {'~'}
    </NavSeperatorStyle>
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
        ${availibleThemes.map(i => themeFragment(i))}
      }
    `,
    variables: context.variables
  })
}



export default App