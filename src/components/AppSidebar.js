import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import logo  from 'src/assets/images/arise_court.png'
import sygnet from 'src/assets/images/logo.png'

// sidebar nav config
import navigation from '../_nav'
import { useNavigate } from 'react-router-dom'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const navigate = useNavigate()

  const handleLogOut = () => {
    // dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })
    localStorage.removeItem("logged_user_data")
    localStorage.removeItem("user_access_valid_token")
    navigate("/login")
  }

  return (
    <CSidebar
      className="p-2 sidebar_outer"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="">
        <CSidebarBrand to="/">
        <img src={logo} alt='logo' className="sidebar-brand-full" />
        <img src={sygnet} alt='logo' className="sidebar-brand-narrow" />
          {/* <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} /> */}
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="d-none d-lg-flex" onClick={() => handleLogOut()}>
        <CSidebarToggler          
        />
        <span>Logout</span>
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
