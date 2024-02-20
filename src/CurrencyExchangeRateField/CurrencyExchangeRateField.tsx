import { useAtom } from 'jotai'
import React from 'react'
import { defaultCurrencyAtom, exchangeRatesAtom } from '../App'
import './CurrencyExchangeRateField.css'
import FavoriteButton from '../FavoriteButton/FavoriteButton'
import { Tooltip } from '@mui/joy'
import { CurrencyInfo } from '../Constant/CurrencyInfo'

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
                <Tooltip variant='soft' title={CurrencyInfo[currencyToConvert] ? CurrencyInfo[currencyToConvert].name : "No info"}>
                    <div>
                        1 {currencyToConvert}
                    </div>
                </Tooltip>
            </div>

            <div className='defaultCurrencyWrapper'>
            <Tooltip variant='soft' title={CurrencyInfo[defaultCurrency] ? CurrencyInfo[defaultCurrency].name : "No info"}>
                <div>
                    {1 / exchangeRate[currencyToConvert] * exchangeRate[defaultCurrency]} {defaultCurrency}
                </div>
            </Tooltip>

            </div>

        </div>

        <FavoriteButton currency={currencyToConvert} />

    </div>
  )
}
