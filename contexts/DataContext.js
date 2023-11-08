



import React, { createContext, useContext, useEffect, useState } from 'react'
import { USER_SERVICE_BASE_URL } from '../components/constants'
import axios from 'axios'

const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [communities, setCommunities] = useState([])


  const getCommunities = async () => {
    try {
        const res = (await axios.get(`${USER_SERVICE_BASE_URL}/communities`)).data
        setCommunities(res)
    } catch (e) {
        setCommunities([])
    }
  }
  
  useEffect(() => {
    getCommunities()
  }, [])

  return (
    <DataContext.Provider value={{ communities }}>
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
