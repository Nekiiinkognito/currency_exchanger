import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import { atom, useAtom } from 'jotai'
import { useQuery } from '@tanstack/react-query'
import { apiAxiosInstance } from './api/apiSetup'
import CurrencyExchangerHome from './CurrencyExchangerHome/CurrencyExchangerHome'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import CurrencyExchangeRatePage from './CurrencyExchangeRatePage/CurrencyExchangeRatePage'
import GreetingPopup from './GreetingPopup/GreetingPopup'
import { ConstantExchangeRate } from './Constant/ConstantExchangeRate'


// If API (for some reason) fail to fetch fresh data
// this app will use this data instead
const tempExchangeRates: ExchangeRate = ConstantExchangeRate

// Global state management
export const exchangeRatesAtom = atom<ExchangeRate>(tempExchangeRates)
export const favoriteCurrenciesAtom = atomWithStorage<string[]>('favorite_currencies', [], createJSONStorage(), {getOnInit: true})
export const defaultCurrencyAtom = atomWithStorage<string>('default_currency', "", createJSONStorage(), {getOnInit: true})

function App() {
  const [exchangeRates, setExchangeRates] = useAtom(exchangeRatesAtom)
  const [favoriteCurrencies] = useAtom(favoriteCurrenciesAtom)
  const [defaultCurrency, setDefaultCurrency] = useAtom(defaultCurrencyAtom)

  const [isGreetingPopup, setIsGreetingPopup] = useState(false)

  // console.log(defaultCurrency);
  useQuery({
    queryKey: ['exchangeRates', 'main'],
    queryFn: async () => {
      apiAxiosInstance.get('')
      .then( response => {
        // Get rates for USD
        const exchangeRatesList = response.data.rates
        const tempObjectWithRates: ExchangeRate = {}

        // Convert this to dictionary
        Object.keys(exchangeRatesList).map((key) => {
            tempObjectWithRates[key] = exchangeRatesList[key]
        })

        // Move favorite currencies to the top
        var temp: ExchangeRate = {}
        for (let i = 0; i < favoriteCurrencies.length; i++){
          let currencyCurrent = favoriteCurrencies[i]
          temp[currencyCurrent] = exchangeRatesList[currencyCurrent]
        }
        temp = {...temp, ...exchangeRatesList}

        setExchangeRates(temp)
        // console.log(exchangeRates)
      })


      
      // If there no default currency, probably user is new, and we set 
      // currency according to his location
      if(!defaultCurrency || defaultCurrency === null) {

        // API to get information about user (Like city, currency etc.)
        fetch('https://api.ipdata.co?api-key=342aa2d827e9e7af82376a927f3dcafb684d0fed3bf4d8847a98789a&fields=currency')
        .then(response => {

            return response.json()

        }).then( response => {

            setDefaultCurrency(response.currency.code)
            setIsGreetingPopup(true)

          }
        )
      }

      return {}
    },
    enabled: false,
    refetchOnWindowFocus: false,
    refetchInterval: 10 * 60 * 1000,
    refetchIntervalInBackground: false
  })

  useEffect(() => {
    setExchangeRates(_prev => {
      var temp: ExchangeRate = {}
      for (let i = 0; i < favoriteCurrencies.length; i++){
        let currencyCurrent = favoriteCurrencies[i]
        temp[currencyCurrent] = exchangeRates[currencyCurrent]
      }
      temp = {...temp, ...exchangeRates}
      return temp
    })
  }, [favoriteCurrencies, defaultCurrency])
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<CurrencyExchangerHome />} />
            <Route path='/exchange_rates' element={<CurrencyExchangeRatePage />} />
          </Route>
        </Routes>


      {isGreetingPopup && <GreetingPopup isGreetingPopup={setIsGreetingPopup} />}
      </BrowserRouter>

    </>
  )
}

export default App
