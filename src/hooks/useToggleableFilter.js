import React, { useState, useCallback } from 'react'
import { string } from 'prop-types'
import cn from 'classnames'
import { useIntl } from 'react-intl'

import { useToggle } from 'hooks'
import { primaryColor, white } from 'styles/common/_constants.scss'

import Dropdown from 'components/common/Dropdown/Dropdown'
import Button from 'components/common/Button/Button'
import { ReactComponent as Sort } from 'assets/icons/sort.svg'
import { ReactComponent as Filter } from 'assets/icons/filter.svg'

export default dropdownOptions => {
  const intl = useIntl()
  const intlOptions = []
  dropdownOptions?.forEach(option => {
    intlOptions.push({ ...option, label: intl.formatMessage({ id: option.label }) })
  })
  const [isAsc, toggleIsAsc, setIsAsc] = useToggle(true)
  const [orderByTerm, setOrderByTerm] = useState(intlOptions[0])

  const ToggleableFilter = useCallback(
    ({ className, dropdownClassname, toggleableClassname }) => {
      return (
        <div className={cn('d-flex', className)}>
          <Dropdown
            icon={
              <Filter
                fill={primaryColor}
                style={{ transform: `rotate(${isAsc ? '0deg' : '180deg'})` }}
              />
            }
            className={dropdownClassname}
            iconPlacement="left"
            options={intlOptions}
            value={orderByTerm}
            onChange={option => {
              setOrderByTerm(option)
              setIsAsc(true)
            }}
          />
          <Button className={toggleableClassname} onClick={toggleIsAsc}>
            <Sort fill={white} />
          </Button>
        </div>
      )
    },
    [intlOptions, isAsc, orderByTerm, setIsAsc, toggleIsAsc],
  )

  ToggleableFilter.propTypes = {
    className: string,
    dropdownClassname: string,
    toggleableClassname: string,
  }

  return { ToggleableFilter, isAsc, orderByTerm }
}
