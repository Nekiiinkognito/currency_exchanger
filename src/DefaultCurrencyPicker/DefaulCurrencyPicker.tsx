import { Option, Select } from '@mui/joy'
import { useAtom } from 'jotai'
import { defaultCurrencyAtom, exchangeRatesAtom } from '../App'

export default function DefaultCurrencyPicker() {
    const [exchangeRates] = useAtom(exchangeRatesAtom)
    const [defaultCurrency, setDefaultCurrency] = useAtom(defaultCurrencyAtom)

  return (
    <div>
        <Select
            value={defaultCurrency} 
            slotProps={ { button: {sx: {minWidth: "4rem", zIndex: 9001}}, listbox: { sx: {maxWidth: 150, zIndex: 9001} } } }
            onChange={(_e, value) => {setDefaultCurrency(value as string)}}>

                {Object.keys(exchangeRates).map(key => {
                    return <Option key={key} value={key}>
                        {key}
                    </Option>
                })}

            </Select>
        </div>
  )
}
