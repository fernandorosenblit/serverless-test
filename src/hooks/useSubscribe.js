import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useWebSocket from 'react-use-websocket'
import { useIdleTimer } from 'react-idle-timer'
import isEmpty from 'lodash/isEmpty'

import { mergeSocketData } from 'state/actions/apiActions'

const idleCountdown = 600000 // 10 minutes - 1000 ms * 60 s * 10 m
const timeUntilCountdownStart = 500

export default (url, idleReconnectionCallback) => {
  const dispatch = useDispatch()
  const [socketUrl, setSocketUrl] = useState(null)
  const [connect, setConnect] = useState(true)

  const onMessage = ({ data }) => {
    !isEmpty(data) && dispatch(mergeSocketData(JSON.parse(data)))
  }

  useWebSocket(
    socketUrl,
    {
      shouldReconnect: () => true,
      retryOnError: true,
      onMessage,
    },
    connect,
  )

  useIdleTimer({
    timeout: idleCountdown,
    onIdle: () => setConnect(false),
    onActive: () => {
      setConnect(true)
      typeof idleReconnectionCallback === 'function' && idleReconnectionCallback()
    },
    debounce: timeUntilCountdownStart,
  })

  useEffect(() => {
    url && setSocketUrl(url)
  }, [url])
}
