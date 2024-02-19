import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import { atom, useAtom } from 'jotai'
import { useQuery } from '@tanstack/react-query'
import { apiAxiosInstance } from './api/apiSetup'
import CurrencyExchangerHome from './CurrencyExchangerHome/CurrencyExchangerHome'
import { queryClient } from './main'



export const exchangeRatesAtom = atom<ExchangeRate>({})

function App() {

  const [exchangeRates, setExchangeRates] = useAtom(exchangeRatesAtom)

  useQuery({
    queryKey: ['exchangeRates', 'main'],
    queryFn: async () => {
      apiAxiosInstance.get('')
      .then( response => {
        // Get rates for USD
        const exchangeRatesList = response.data.rates
        const tempObjectWithRates: ExchangeRate = {}

        //Convert this to 
        Object.keys(exchangeRatesList).map((key) => {
            tempObjectWithRates[key] = exchangeRatesList[key]
        })
        setExchangeRates(tempObjectWithRates)
        console.log(exchangeRates)
      })
      return {}
    },
    enabled: true
  })

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<CurrencyExchangerHome />} />
            <Route path='/favorite' element={<div>Favorite</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
