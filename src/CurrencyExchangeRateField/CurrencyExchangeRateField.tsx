import { useAtom } from 'jotai'
import React from 'react'
import { defaultCurrencyAtom, exchangeRatesAtom } from '../App'
import './CurrencyExchangeRateField.css'
import FavoriteButton from '../FavoriteButton/FavoriteButton'

type CurrencyExchangeRateField = {
    currencyToConvert: string
}

export default function CurrencyExchangeRateField( {currencyToConvert}:CurrencyExchangeRateField ) {

    const [exchangeRate] = useAtom(exchangeRatesAtom)
    const [defaultCurrency] = useAtom(defaultCurrencyAtom)

  return (
    <div className='mainCurrencyExchangeWrapper'>

        <div className='currencyExchangeWrapper'>

            <div className='currencyToConvertWrapper' >
                1 {currencyToConvert}
            </div>

            <div className='defaultCurrencyWrapper'>
                {1 / exchangeRate[currencyToConvert] * exchangeRate[defaultCurrency]} {defaultCurrency}
            </div>

        </div>

        <FavoriteButton currency={currencyToConvert} />

    </div>
  )
}
