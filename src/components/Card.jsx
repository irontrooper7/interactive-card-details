import { useEffect, useState } from "react"

export default function Card({name, number, month, year, cvc, type}) {
    if(type === 'front-card') {

        const [formatNumber, setFormatNumber] = useState()

        useEffect(() => {
            // Definir el string de 16 números
            var numberString = number.toString();
            var result = ""
            for (var i = 0; i < numberString.length; i += 4) {
                result += numberString.substring(i, i + 4) + " ";
            }
            // Eliminar el espacio adicional al final
            setFormatNumber(result.trim())
        })

        return (
            <div className='card card-front'>
                <figure className="image is-96x96">
                    <img src="/assets/card-logo.svg" />
                </figure>
                <h3>{formatNumber ? formatNumber : '0000 0000 0000 0000'}</h3>
                <div className='is-flex is-align-items-center is-justify-content-space-between'>
                    <p>{name ? name : 'Nombre ApellidoP ApellidoM'}</p>
                    <p>{month ? month.slice(0, 2) : '00'} / {year ? year.slice(0, 2) : '00'}</p>
                </div>
            </div>
        )
    }else {
        return (
            <div className='card card-back'>
                <p>{cvc ? cvc.slice(0, 3) : '000'}</p>
            </div>
        )
    }
}