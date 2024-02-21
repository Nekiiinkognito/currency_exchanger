import { useAtom } from 'jotai'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { defaultCurrencyAtom, exchangeRatesAtom } from '../App'
import { Input, Option, Select, Tooltip } from '@mui/joy'
import { InnerInput } from '../CustomCurrencyInput/CustomCurrencyInput'
import './CurrencyExchangeCalculator.css'
import FavoriteButton from '../FavoriteButton/FavoriteButton'
import { CurrencyInfo } from '../Constant/CurrencyInfo'
import { sxFont } from '../Constant/SxFont'


export default function CurrencyExchangeCalculator() {
    const [exchangeRates] = useAtom(exchangeRatesAtom)
    const [defaultCurrency] = useAtom(defaultCurrencyAtom)

    const [fromCurrency, setFromCurrency] = useState<string>("USD")
    const [toCurrency, setToCurrency] = useState<string>(defaultCurrency ? defaultCurrency : "RUB")

    // We store only two needed to us rates for optimization
    const [rate, setRate] = useState<number[]>([exchangeRates[fromCurrency], exchangeRates[toCurrency]])

    const [firstCurrencyAmount, setFirstCurrencyAmount] = useState<number>(1)
    const [secondCurrencyAmount, setSecondCurrencyAmount] = useState<number>(0)

    // When we change one of two currencies
    // We recalculate amount of currency we converting to   
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

    
    const currencyBoxlist =  useMemo(() => {
        return Object.keys(exchangeRates).map(key => {
            return <Option sx={{
                fontFamily: "'Ubuntu', sans-serif",
                fontWeight: 300,
                fontStyle: 'normal',
                userSelect: 'none'
            }} key={key} value={key}>
                <Tooltip
                enterDelay={500}
                enterNextDelay={500}
                placement='left' variant='soft' title={CurrencyInfo[key] ? CurrencyInfo[key].name : "No data"}>
                    <div className='listboxCurrencyWrapper'>
                        {key}
                        <FavoriteButton currency={key} />
                    </div>
                </Tooltip>
            </Option>
        })
    }, [exchangeRates])

  return (
    <div>
        
    <div className='currencyBoxWrapper'>
        <div className='currencyBox'>
            <div style={{width: '15rem'}}>
                <Input
                slots={{input: InnerInput}}
                slotProps={ {input: {sx: {...sxFont, minWidth: '7.5rem'}, type: "text", placeholder: "Amount", label: "From"}} }
                value={firstCurrencyAmount}
                // endDecorator={CurrencyInfo[fromCurrency] ? CurrencyInfo[fromCurrency].symbol : ""}
                onChange={(e) => handleChangeAmount(e, setFirstCurrencyAmount, 1)}/>
            </div>

            <Select 
            value={fromCurrency} 
            slotProps={ { button: {sx: {minWidth: "4rem", ...sxFont}}, listbox: { sx: {maxWidth: 150} } } }
            onChange={(_e, value) => handleChange(value, setFromCurrency, 0)}>

                {currencyBoxlist}

            </Select>
        </div>

        <div className='currencyBox'>
            <div style={{width: '15rem'}}>
                <Input type='string' 
                slots={{input: InnerInput}}
                slotProps={ {input: {sx: {minWidth: "7.5rem", ...sxFont}, type: "text", placeholder: "Amount", label: "To"}}}
                value={secondCurrencyAmount}
                // endDecorator={CurrencyInfo[toCurrency] ? CurrencyInfo[toCurrency].symbol : ""}
                onChange={(e) => handleChangeAmount(e, setSecondCurrencyAmount, 2)}/>
            </div>
            
            <Select
            slotProps={ { button: {sx: {minWidth: "4rem", ...sxFont}}, listbox: { sx: {maxWidth: 150} } } }
            value={toCurrency} 
            onChange={(_e, value) => handleChange(value, setToCurrency, 1)}
            >

                {currencyBoxlist}

            </Select>
        </div>
    </div>
                </div>
  )
}
