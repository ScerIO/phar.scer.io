import { css, InterpolationValue, ThemedCssFunction } from 'styled-components'

type devices = {
  [device: string]: number
}

type media = {
  [device: string]: (...args: any[]) => InterpolationValue[]
}

export const sizes: devices = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
}

// Iterate through the sizes and create a media template
export const down = Object.keys(sizes).reduce<media>((acc: media, label: string) => {

  acc[label] = (...args: ThemedCssFunction<any>[]) => css`
    @media (max-width: ${sizes[label]}px) {
      //@ts-ignore
      ${css(...args)}
    }
  `

  return acc
}, {})

export const up = Object.keys(sizes).reduce<media>((acc: media, label: string) => {

  acc[label] = (...args: ThemedCssFunction<any>[]) => css`
    @media (min-width: ${sizes[label]}px) {
      //@ts-ignore
      ${css(...args)}
    }
  `

  return acc
}, {})
