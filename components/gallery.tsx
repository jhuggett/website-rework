import styled from 'styled-components'
import Image from 'next/image'

export const GallerySchema = {
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
        {
          type: 'string',
          label: 'Border Style',
          name: 'borderStyle',
          options: ['none', 'double']
        },
        {
          type: 'string',
          label: 'Border Radius',
          name: 'borderRadius',
          options: ['0', '12%']
        }
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

export const Gallery = props => {
  const { alignment, images, gap} = props

  return (
    <StyledGallery alignment={alignment || 'center'} gap={gap} >
      {images && images.map( i => {
        const { width, height, src, borderStyle, borderRadius } = i
        return <StyledImage
          borderStyle={borderStyle}
          borderRadius={borderRadius}
        ><Image 
          src={src || 'http://res.cloudinary.com/dza6vysyp/image/upload/w\_1000,h\_1000,c\_fill,q\_auto/v1613580742/sample.jpg'}
          width={width || 100}
          height={height || 100}
        /></StyledImage>
      })}
    </StyledGallery>
  )
}

const StyledImage = styled.div`

  display: flex;
  
  border-radius: ${props => props.borderRadius || '12%'};
  overflow: hidden;
  border-width: 16px;
  border-style: ${props => props.borderStyle || 'double'};
  border-color: ${props => props.theme.primary};
  
`

const StyledGallery = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: ${props => props.alignment};
  justify-content: ${props => props.alignment};
  column-gap: ${props => props.gap};
  row-gap: ${props => props.gap};

`