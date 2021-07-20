import { small, medium, large, xlarge } from 'styles/common/_constants.scss'

import { SCREEN_SIZES } from 'constants/constants'
import useMediaQuery from './useMediaQuery'

export default () => {
  const [isSmall, isMedium, isLarge, isXLarge] = useMediaQuery([
    `(min-width: ${small})`,
    `(min-width: ${medium})`,
    `(min-width: ${large})`,
    `(min-width: ${xlarge})`,
  ])

  let size = SCREEN_SIZES.s
  if (isMedium) size = SCREEN_SIZES.m
  if (isLarge) size = SCREEN_SIZES.l
  if (isXLarge) size = SCREEN_SIZES.xl

  return { isSmall, isMedium, isLarge, isXLarge, size }
}
