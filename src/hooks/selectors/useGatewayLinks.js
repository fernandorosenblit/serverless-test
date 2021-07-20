import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import build from 'redux-object'

import { HOME, SERVICE_LOCALES } from 'constants/serviceAccessors'
import { toStoreLocaleFormat } from 'utils/localeFormatters'
import useMeta from './useMeta'

export default (service = null) => {
  const intl = useIntl()

  const localizedHome = useSelector(({ api }) =>
    build(api, HOME, toStoreLocaleFormat(SERVICE_LOCALES[intl.locale])),
  )

  const meta = useMeta(localizedHome?.links.self)

  return [service ? localizedHome?.links[service] : localizedHome?.links, meta]
}
