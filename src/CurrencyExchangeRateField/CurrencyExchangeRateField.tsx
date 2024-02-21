import { useAtom } from 'jotai'
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
    <div style={{display: 'flex', justifyContent: 'center'}}>

        <div className='mainCurrencyExchangeWrapper'>

            <div className='currencyExchangeWrapper'>

                <div className='currencyToConvertWrapper' >
                    <Tooltip variant='soft' title={CurrencyInfo[currencyToConvert] ? CurrencyInfo[currencyToConvert].name : "No info"}>
                        <div>
                            {"1 "}
                            <b>
                                {currencyToConvert}
                            </b> 
                        </div>
                    </Tooltip>
                </div>
                <div> = </div>
                <div className='defaultCurrencyWrapper'>
                    <Tooltip enterDelay={500} variant='soft' title={CurrencyInfo[defaultCurrency] ? CurrencyInfo[defaultCurrency].name : "No info"}>
                        <div>
                            {1 / exchangeRate[currencyToConvert] * exchangeRate[defaultCurrency]} 
                            {" "}
                            <b>
                                {defaultCurrency}
                            </b>
                        </div>
                    </Tooltip>
                </div>

            </div>

         <div style={{marginRight: '2rem'}}>
            <FavoriteButton currency={currencyToConvert} />
        </div>

        </div>
    </div>
  )
}
