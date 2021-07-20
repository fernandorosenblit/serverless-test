import dayjs from 'dayjs'
import { DATE_FORMAT, IMAGE_EXT } from 'constants/constants'

export const runtimeToHs = runtime => {
  const hours = Math.floor(runtime / 60)
  const minutes = Math.floor(runtime % 60)

  const hoursText = hours > 0 ? `${hours}h ` : ''
  return `${hoursText}${minutes}m`
}

export const imageUrl = imageContent => {
  if (!imageContent) return

  const {
    image: { height, width, url },
  } = imageContent

  return (
    url &&
    url
      .replace('{width}', width)
      .replace('{height}', height)
      .replace('{ext}', IMAGE_EXT)
  )
}

export const imageAlt = imageContent => {
  return imageContent ? imageContent[0].image?.urlAltText : '-'
}

export const releaseYear = date => (date ? dayjs(date).year() : '-')

export const releaseDate = date => (date ? dayjs(date).format(DATE_FORMAT.monthWithDay) : '-')
