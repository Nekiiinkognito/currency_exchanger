import { useAtom } from 'jotai'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { exchangeRatesAtom } from '../App'
import { Input, Option, Select } from '@mui/joy'
import { InnerInput } from '../CustomCurrencyInput/CustomCurrencyInput'


export default function CurrencyExchangeCalculator() {
    const [exchangeRates] = useAtom(exchangeRatesAtom)

    const [fromCurrency, setFromCurrency] = useState<string>("USD")
    const [toCurrency, setToCurrency] = useState<string>("RUB")

    const [firstCurrencyAmount, setFirstCurrencyAmount] = useState<number>(1)
    const [secondCurrencyAmount, setSecondCurrencyAmount] = useState<number>(0)


    useEffect(() => {
        convertCurrencies(1)
    }, [fromCurrency, toCurrency])

    function handleChange(newValue: string | null, setCurrency: React.Dispatch<React.SetStateAction<string>>) {
        if(newValue === null) return
        setCurrency(newValue)
    }

    function handleChangeAmount(e: ChangeEvent<HTMLInputElement>, setCurrencyAmount: React.Dispatch<React.SetStateAction<number>>, currencyNumber: number) {
        // convertCurrencies(currencyNumber, Number(e.target.value))
        if(isNaN(Number(e.target.value))) return
        setCurrencyAmount(Number(e.target.value))
        if(currencyNumber === 1) {
            setSecondCurrencyAmount(Number(e.target.value) / exchangeRates[fromCurrency] * exchangeRates[toCurrency])
        } else {
            setFirstCurrencyAmount(Number(e.target.value) / exchangeRates[toCurrency] * exchangeRates[fromCurrency])
        }
    }
    
    function convertCurrencies(n: number, amount?: number) {
        if(n === 1) {
            setSecondCurrencyAmount(amount ? amount : firstCurrencyAmount / exchangeRates[fromCurrency] * exchangeRates[toCurrency])
        }
    }


    if(Object.keys(exchangeRates).length === 0){
        return <div>Some things went wrong...</div>
    }

  return (
    <div>
        <div className='currencyBox'>
            <Input
            slots={{input: InnerInput}}
            slotProps={ {input: {type: "text", placeholder: "Amount", label: "From"}} }
            value={firstCurrencyAmount}
            onChange={(e) => handleChangeAmount(e, setFirstCurrencyAmount, 1)}/>

            <Select 
            value={fromCurrency} 
            onChange={(e, value) => handleChange(value, setFromCurrency)}>

                {Object.keys(exchangeRates).map(key => {
                    return <Option key={key} value={key}>{key}</Option>
                })}

            </Select>
        </div>

        <div className='currencyBox'>
            <Input type='string' 
            slots={{input: InnerInput}}
            slotProps={ {input: {type: "text", placeholder: "Amount", label: "To"}}}
            value={secondCurrencyAmount}
            onChange={(e) => handleChangeAmount(e, setSecondCurrencyAmount, 2)}/>
            
            <Select 
            value={toCurrency} 
            onChange={(e, value) => handleChange(value, setToCurrency)}>

                {Object.keys(exchangeRates).map(key => {
                    return <Option key={key} value={key}>{key}</Option>
                })}

            </Select>
        </div>
    </div>
  )
}
