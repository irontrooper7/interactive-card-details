export default function Card({name, number, month, year, cvc, type}) {
    if(type === 'front-card') {
        return (
            <div className='card card-front'>
                <figure className="image is-96x96">
                    <img src="/assets/card-logo.svg" />
                </figure>
                <h3>{number ? number.slice(0, 16) : '0000000000000000'}</h3>
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