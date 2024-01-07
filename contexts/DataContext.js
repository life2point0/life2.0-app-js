



import React, { createContext, useContext, useEffect, useState } from 'react'
import { USER_SERVICE_BASE_URL } from '../components/constants'
import axios from 'axios'
import { useAuth } from './AuthContext'

const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [focusedCommunities, setFocusedCommunities] = useState([])
  const [filteredCommunities, setFilteredCommunities] = useState([])
  const [notifications, setNotifications ] = useState([])
  const [unreadNotificationsCount, setUnreadNotificationsCount ] = useState(0)
  const [filterQuery, setFilterQuery] = useState('')
  const { isAuthenticated, authCall} = useAuth()

  const getCommunities = async () => {
    try {
        const res = (await axios.get(`${USER_SERVICE_BASE_URL}/communities?perPage=5`)).data
        setFilteredCommunities(res.data)
        if(isAuthenticated) {
          await getFocusedCommunities()
        } else {
          setFocusedCommunities(res.data)
        }
    } catch (e) {
      setFilteredCommunities([])
    }
  }


  const getFocusedCommunities = async () => {
    try {
       const res = await authCall({
         method: 'GET',
         url: `${USER_SERVICE_BASE_URL}/communities?perPage=5`
       })
       setFocusedCommunities(res.data.data)
    } catch (e) {
       setFocusedCommunities([])
    }
  }

  const filterCommunities = async (query='') => {
    setFilterQuery(query)
    try {
        const res = (await axios.get(`${USER_SERVICE_BASE_URL}/communities?query=${query}`)).data
        setFilteredCommunities(res.data)
    } catch (e) {
        setFilteredCommunities([])
    }
  }

  const getNotifications = async () => {
      try {
        const response = await authCall({
          method: 'GET',
          url: `${USER_SERVICE_BASE_URL}/users/me/notifications`
        })

        const notificationsData = response.data
        const unreadNotifications = notificationsData?.data?.filter(notification => !notification.isRead)
        const unreadNotificationsCount = unreadNotifications?.length;
        setNotifications(notificationsData.data)
        setUnreadNotificationsCount(unreadNotificationsCount)
        await confirmNotificationCheck()
      } catch (e) {
        setNotifications([])
      }
    }

  const confirmNotificationCheck = async () => {
    try {
        await authCall({
          method: 'PUT',
          url: `${USER_SERVICE_BASE_URL}/users/me/notifications/read-status`,
          data: {}
        })
        setUnreadNotificationsCount(0)
      } catch (e) {
        console.log(e)
      }
  }

  useEffect(() => {
    getCommunities()
    if(isAuthenticated) {
      getNotifications()
    }
  }, [isAuthenticated])
  

  return (
    <DataContext.Provider value={{ focusedCommunities, filterCommunities,getFocusedCommunities, filteredCommunities, filterQuery, notifications, unreadNotificationsCount }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
