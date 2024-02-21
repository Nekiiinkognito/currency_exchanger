import { useAtom } from 'jotai'
import { defaultCurrencyAtom, exchangeRatesAtom } from '../App'
import { createPortal } from 'react-dom'
import './GreetingPopup.css'
import DefaultCurrencyPicker from '../DefaultCurrencyPicker/DefaulCurrencyPicker'
import { Button } from '@mui/joy'

type GreetingPopup = {
    isGreetingPopup: React.Dispatch<React.SetStateAction<boolean>>
}


export default function GreetingPopup( { isGreetingPopup }:GreetingPopup ) {
    const [defaultCurrency] = useAtom(defaultCurrencyAtom)


  return createPortal((

    <div>
        <div className='popupBackground' onScroll={e => e.stopPropagation()}/>

        <div className='greetingPopupWrapper'>

            <div className='greetingTextWrapper'>
                <h1>Greeting!</h1>
                <p>Do you want this currency as default: 
                    <b> {defaultCurrency}?</b>
                </p>
                <p>You can change it now, or later!</p>
            </div>
        
            <div className='defaultCurrencyPickerWrapper'>
                <DefaultCurrencyPicker />
            </div>

            <div>
                <Button variant='soft'
                 style={{color: 'black', backgroundColor: 'white', border: '1px solid black'}}
                 onClick={() => isGreetingPopup(false)}
                 >Okay</Button>
            </div>
            
        </div>
    </div>

  ), document.getElementById('popupPortal') as HTMLElement)
}
