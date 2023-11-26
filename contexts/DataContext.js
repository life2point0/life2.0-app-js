



import React, { createContext, useContext, useEffect, useState } from 'react'
import { USER_SERVICE_BASE_URL } from '../components/constants'
import axios from 'axios'

const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [communities, setCommunities] = useState([])
  const [filteredCommunities, setfilteredCommunities] = useState([])
  const [filterQuery, setFilterQuery] = useState('')


  const getCommunities = async () => {
    try {
        const res = (await axios.get(`${USER_SERVICE_BASE_URL}/communities?perPage=100`)).data
        setCommunities(res.data)
        setfilteredCommunities(res.data)
    } catch (e) {
        setCommunities([])
    }
  }

  const filterCommunities = async (query='') => {
    setFilterQuery(query)
    try {
        const res = (await axios.get(`${USER_SERVICE_BASE_URL}/communities?query=${query}`)).data
        setfilteredCommunities(res.data)
    } catch (e) {
        setfilteredCommunities([])
    }
  }
  
  useEffect(() => {
    getCommunities()
  }, [])

  return (
    <DataContext.Provider value={{ communities, filterCommunities, filteredCommunities, filterQuery }}>
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
