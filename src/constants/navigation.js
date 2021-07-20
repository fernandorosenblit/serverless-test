import { ReactComponent as Facebook } from 'assets/icons/facebook.svg'
import { ReactComponent as Twitter } from 'assets/icons/twitter.svg'
import { ReactComponent as Instagram } from 'assets/icons/instagram.svg'

import routes from './routesPaths'

export const TOP_NAV = [
  {
    intlId: 'header.browse',
    link: routes.index,
    exact: true,
  },
  {
    intlId: 'header.concierge',
    link: routes.concierge,
  },
  {
    intlId: 'header.news',
    link: routes.news,
  },
]

export const BOTTOM_NAV = [
  {
    intlId: 'header.browse',
    link: routes.index,
  },
  {
    intlId: 'header.concierge',
    link: routes.concierge,
  },
  {
    intlId: 'header.news',
    link: routes.news,
  },
]

export const SOCIAL_NAV = [
  {
    icon: Facebook,
    link: 'https://www.facebook.com/hollywoodcom/',
  },
  {
    icon: Twitter,
    link: 'https://twitter.com/hollywood_com',
  },
  {
    icon: Instagram,
    link: 'https://www.instagram.com/hollywood_com/',
  },
]
