import { useState, useEffect } from 'react'
import { check_Image } from '@/libs/api'

export default function ImageLoader({ src }) {
    const [load, setLoad] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoad(false)
        }, 1000)
    }, [])
    return load ? '/empty_state.svg' : check_Image(src)
    // return <>Loading....</>
}