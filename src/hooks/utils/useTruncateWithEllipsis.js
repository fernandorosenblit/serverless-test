import React, { useState, useMemo, useEffect } from 'react'
import { truncate } from 'lodash'

import ReadMoreComponent from 'components/common/ReadMore/ReadMore'

let truncatedText = ''

export default (text = '', maxAmountOfCharacters = 220) => {
  const [isTextExpanded, setIsTextExpanded] = useState(false)
  const [textToShow, setTextToShow] = useState(truncatedText)

  useMemo(() => {
    truncatedText = truncate(text, { length: maxAmountOfCharacters })
  }, [text, maxAmountOfCharacters])

  useEffect(() => {
    if (isTextExpanded) setTextToShow(text)
    else setTextToShow(truncatedText)
  }, [isTextExpanded, text])

  const switchReadMore = () => setIsTextExpanded(prevText => !prevText)

  const ReadMore = () => (
    <ReadMoreComponent onClick={switchReadMore} isTextExpanded={isTextExpanded} />
  )

  return { textToShow, ReadMore }
}
