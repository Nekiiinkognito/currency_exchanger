import React from 'react'
import { useAtom } from 'jotai'
import { defaultCurrencyAtom, exchangeRatesAtom } from '../App'
import CurrencyExchangeRateField from '../CurrencyExchangeRateField/CurrencyExchangeRateField'

export default function CurrencyExchangeRatePage() {
    const [exchangeRate] = useAtom(exchangeRatesAtom)
    const [defaultCurrency] = useAtom(defaultCurrencyAtom)
        
  return (
    <div>
        {Object.keys(exchangeRate).map(key => {
            if(key !== defaultCurrency) {
                return <CurrencyExchangeRateField key={key} currencyToConvert={key}/>
            }
            return <></>
        })}
    </div>
  )
}
