import React, { useEffect, useState } from 'react'
import StarFilled from '../assets/star_filled.svg'
import StarUnfilled from '../assets/star_unfilled.svg'
import { useAtom } from 'jotai'
import { favoriteCurrenciesAtom } from '../App'
import './FavButton.css'
import { Tooltip } from '@mui/joy'

type FavoriteButton = {
    currency: string
}


export default function FavoriteButton( { currency }:FavoriteButton ) {
    const [isFavorite, setIsFavorite] = useState(false)
    const [favoriteCurrencies, setFavoriteCurrencies] = useAtom(favoriteCurrenciesAtom)

    useEffect(() => {
        if(favoriteCurrencies.indexOf(currency) > -1){
            setIsFavorite(true)
        }
    })
    
    

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        e.stopPropagation()
        setIsFavorite(prev => !prev)
        if(isFavorite) {
            setFavoriteCurrencies(prev => {
                return prev.filter(item => item !== currency)
            })
    
            console.log('RENDERED');
        } else {
            setFavoriteCurrencies(prev => {
                return [...prev, currency]
            })
        }

    }

  return (
    <div>
        <Tooltip enterDelay={1000} enterNextDelay={1000} variant='soft' 
        title={isFavorite ? 'Remove from favorite' : 'Add to favorite'}>

            <button className='favButton' onClick={e => handleClick(e)}>
                <img src={isFavorite ? StarFilled : StarUnfilled} />
            </button>
        </Tooltip>
    </div>
  )
}
