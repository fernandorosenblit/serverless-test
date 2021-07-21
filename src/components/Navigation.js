import React, { useCallback } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { Footer } from 'components/Footer'

export const Navigation = () => {
  const location = useLocation()

  const isDetailsActive = useCallback(() => {
    return location.pathname.indexOf('details/') > -1
  }, [location.pathname])

  const random = Math.random()
    .toString(36)
    .substring(2, 15)

  return (
    <div>
      <ul>
        <li>
          <NavLink to="/" activeClassName="active" exact>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to={'/details/' + random} activeClassName="active" isActive={isDetailsActive}>
            Dynamic
          </NavLink>
        </li>
      </ul>
      <Footer />
    </div>
  )
}
