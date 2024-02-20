import { useAtom } from 'jotai'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { exchangeRatesAtom } from '../App'
import { Input, Option, Select } from '@mui/joy'
import { InnerInput } from '../CustomCurrencyInput/CustomCurrencyInput'
import './CurrencyExchangeCalculator.css'
import FavoriteButton from '../FavoriteButton/FavoriteButton'


export default function CurrencyExchangeCalculator() {
    const [exchangeRates] = useAtom(exchangeRatesAtom)

    const [fromCurrency, setFromCurrency] = useState<string>("USD")
    const [toCurrency, setToCurrency] = useState<string>("RUB")

    const [rate, setRate] = useState<number[]>([exchangeRates[fromCurrency], exchangeRates[toCurrency]])

    const [firstCurrencyAmount, setFirstCurrencyAmount] = useState<number>(1)
    const [secondCurrencyAmount, setSecondCurrencyAmount] = useState<number>(0)


    useEffect(() => {
        convertCurrencies(1)
    }, [fromCurrency, toCurrency])

    function handleChange(newValue: string | null, setCurrency: React.Dispatch<React.SetStateAction<string>>, changedCurrencyFieldNumber: number) {
        if(newValue === null) return
        setCurrency(newValue)
        setRate(prev => {
            let temp = prev
            temp[changedCurrencyFieldNumber] = exchangeRates[newValue]
            return temp
        })
    }

    function handleChangeAmount(e: ChangeEvent<HTMLInputElement>, setCurrencyAmount: React.Dispatch<React.SetStateAction<number>>, currencyNumber: number) {
        let newValue = Number(e.target.value)
        if(!isFinite(newValue)) return
        

        setCurrencyAmount(newValue)
        if(currencyNumber === 1) {
            setSecondCurrencyAmount(newValue / rate[0] * rate[1])
        } else {
            setFirstCurrencyAmount(newValue / rate[1] * rate[0])
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
    <div className='currencyBoxWrapper'>
        <div className='currencyBox'>
            <Input
            slots={{input: InnerInput}}
            slotProps={ {input: {sx: {minWidth: "25rem"}, type: "text", placeholder: "Amount", label: "From"}} }
            value={firstCurrencyAmount}
            onChange={(e) => handleChangeAmount(e, setFirstCurrencyAmount, 1)}/>

            <Select 
            value={fromCurrency} 
            slotProps={ { button: {sx: {minWidth: "10rem"}}, listbox: { sx: {maxWidth: 150} } } }
            onChange={(_e, value) => handleChange(value, setFromCurrency, 0)}>

                {Object.keys(exchangeRates).map(key => {
                    return <Option key={key} value={key}>
                        <div> {key} </div>
                        <FavoriteButton currency={key} />
                    </Option>
                })}

            </Select>
        </div>

        <div className='currencyBox'>
            <Input type='string' 
            slots={{input: InnerInput}}
            slotProps={ {input: {sx: {minWidth: "25rem"}, type: "text", placeholder: "Amount", label: "To"}}}
            value={secondCurrencyAmount}
            onChange={(e) => handleChangeAmount(e, setSecondCurrencyAmount, 2)}/>
            
            <Select
            slotProps={ { button: {sx: {minWidth: "10rem"}}, listbox: { sx: {maxWidth: 150} } } }
            value={toCurrency} 
            onChange={(_e, value) => handleChange(value, setToCurrency, 1)}
            >

                {Object.keys(exchangeRates).map(key => {
                    return <Option key={key} value={key}>
                        <div className='listboxCurrencyWrapper'>
                            <div>{key}</div>
                            <FavoriteButton currency={key} />
                        </div>
                    </Option>
                })}

            </Select>
        </div>
    </div>
  )
}
