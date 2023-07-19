export default function Card({name, number, month, year, cvv, type}) {    
    if(type === 'front-card') {
        return (
            <div className='card card-front'>
                <figure className="image is-96x96">
                    <img src="/assets/card-logo.svg" />
                </figure>
                <h3>{number}</h3>
                <div className='is-flex is-align-items-center is-justify-content-space-between'>
                    <p>{name}</p>
                    <p>{month} / {year}</p>
                </div>
            </div>
        )
    }else {
        return (
            <div className='card card-back'>
                <p>{cvv}</p>
            </div>
        )
    }
}