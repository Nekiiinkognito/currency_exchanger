import { useAtom } from 'jotai'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { exchangeRatesAtom } from '../App'

export default function CurrencyExchangeCalculator() {
    const [exchangeRates] = useAtom(exchangeRatesAtom)

    const [fromCurrency, setFromCurrency] = useState<string>("USD")
    const [toCurrency, setToCurrency] = useState<string>("RUB")

    const [firstCurrencyAmount, setFirstCurrencyAmount] = useState<number>(1)
    const [secondCurrencyAmount, setSecondCurrencyAmount] = useState<number>(0)


    useEffect(() => {
        convertCurrencies(1)
    }, [fromCurrency])

    useEffect(() => {
        convertCurrencies(2)
    }, [toCurrency])

    function handleChange(e: ChangeEvent<HTMLSelectElement>, setCurrency: React.Dispatch<React.SetStateAction<string>>) {
        setCurrency(e.target.value)
    }

    function handleChangeAmount(e: ChangeEvent<HTMLInputElement>, setCurrencyAmount: React.Dispatch<React.SetStateAction<number>>, currencyNumber: number) {
        setCurrencyAmount(Number(e.target.value))
        // convertCurrencies(currencyNumber, Number(e.target.value))
        if(currencyNumber === 1) {
            setSecondCurrencyAmount(Number(e.target.value) / exchangeRates[fromCurrency] * exchangeRates[toCurrency])
        } else {
            setFirstCurrencyAmount(Number(e.target.value) / exchangeRates[toCurrency] * exchangeRates[fromCurrency])
        }
    }
    
    function convertCurrencies(n: number, amount?: number) {
        if(n === 1) {
            setSecondCurrencyAmount(amount ? amount : firstCurrencyAmount / exchangeRates[fromCurrency] * exchangeRates[toCurrency])
        } else {
            setFirstCurrencyAmount(amount ? amount : secondCurrencyAmount / exchangeRates[toCurrency] * exchangeRates[fromCurrency])
        }
    }


    if(Object.keys(exchangeRates).length === 0){
        return <div>Some things went wrong...</div>
    }

  return (
    <div>
        <div className='currencyBox'>
            <input type='number' 
            value={firstCurrencyAmount}
            onChange={(e) => handleChangeAmount(e, setFirstCurrencyAmount, 1)}/>

            <select 
            value={fromCurrency} 
            onChange={(e) => handleChange(e, setFromCurrency)}>

                {Object.keys(exchangeRates).map(key => {
                    return <option value={key}>{key}</option>
                })}
                
            </select>
        </div>

        <div className='currencyBox'>
            <input type='number' 
            value={secondCurrencyAmount}
            onChange={(e) => handleChangeAmount(e, setSecondCurrencyAmount, 2)}/>
            
            <select 
            value={toCurrency} 
            onChange={(e) => handleChange(e, setToCurrency)}>

                {Object.keys(exchangeRates).map(key => {
                    return <option value={key}>{key}</option>
                })}

            </select>
        </div>
    </div>
  )
}
