



import React, { createContext, useContext, useEffect, useState } from 'react'
import { USER_SERVICE_BASE_URL } from '../components/constants'
import axios from 'axios'
import { useAuth } from './AuthContext'

const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [focusedCommunities, setFocusedCommunities] = useState([])
  const [filteredCommunities, setFilteredCommunities] = useState([])
  const [filterQuery, setFilterQuery] = useState('')
  const { isAuthenticated, authCall} = useAuth([])

  const getCommunities = async () => {
    try {
        const res = (await axios.get(`${USER_SERVICE_BASE_URL}/communities?perPage=5`)).data
        setFilteredCommunities(res.data)
        if(!isAuthenticated) {
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

  useEffect(() => {
    getCommunities()
    getFocusedCommunities()
  }, [isAuthenticated])

  return (
    <DataContext.Provider value={{ focusedCommunities, filterCommunities, filteredCommunities, filterQuery }}>
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
