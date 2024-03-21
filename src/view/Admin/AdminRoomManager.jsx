import React from 'react'
import BarAdmin from './BarAdmin/BarAdmin'
import { Outlet } from 'react-router-dom'

export default function AdminRoomManager() {
  return (
    <div>
        <BarAdmin>
          <Outlet/>
        </BarAdmin>
    </div>
  )
}
