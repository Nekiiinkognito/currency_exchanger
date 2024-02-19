import React from 'react'
import { useAtom } from 'jotai'
import { exchangeRatesAtom } from '../App'
import CurrencyExchangeCalculator from '../CurrencyExchangeCalculator/CurrencyExchangeCalculator'

export default function CurrencyExchangerHome() {
    const [exchangeRates] = useAtom(exchangeRatesAtom)


  return (
    <div>
        <CurrencyExchangeCalculator />
        {Object.keys(exchangeRates).map(key => {
            return <div key={key}>1 USD = {exchangeRates[key]} {key}</div>
        })}
    </div>
  )
}
