import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Card from './Card';

const DataUserCardSchema = Yup.object().shape({
	userCardNumber: Yup.string()
		.matches(/^[0-9]+$/, 'Solo se permiten números')
		.max(16, 'La fecha debe tener maximo 2 digitos')
		.required('Por favor ingresa tu numero de tarjeta'),
	userCardName: Yup.string()
		.matches(/^[0-9]+$/, 'Solo se permiten números')
		.required('Por favor ingresa tu nombre'),
	userCardMonth: Yup.string()
		.matches(/^[0-9]+$/, 'Solo se permiten números')
		.max(2, 'La fecha debe tener maximo 2 digitos')
		.required('Por favor ingresa un mes'),
	userCardYear: Yup.string()
		.matches(/^[0-9]+$/, 'Solo se permiten números')
		.min(4, 'La fecha debe tener 4 digitos')
		.max(4, 'La fecha debe tener 4 digitos')
		.required('Por favor ingresa un año'),
	userCardCVV: Yup.string()
		.matches(/^[0-9]+$/, 'Solo se permiten números')
		.min(3, 'La fecha debe tener 3 digitos')
		.max(3, 'La fecha debe tener 3 digitos')
		.required('Por favor ingresa un año')
});

export default function SubmitForm() {

	const [cardNumber, setCardNumber] = useState('0000000000000000');
    const [cardName, setCardName] = useState('Nombre ApellidoP ApellidoM');
    const [cardMonth, setCardMonth] = useState('00');
	const [cardYear, setCardYear] = useState('00');
    const [cardCVV, setCardCVV] = useState('000');

	return (
		<div className='form-container columns is-gapless'>
			<div className='column'>
				<Card
					type='front-card'
					number={cardNumber}
					name={cardName}
					month={cardMonth}
					year={cardYear}
				/>
				<Card cvv={cardCVV}/>
			</div>
			<div className='column'>
				<div className='form'>
					<Formik
						initialValues={{ userCardNumber: '', userCardName: '', userCardMonth: '', userCardYear: '', userCardCVV: ''}}
						validationSchema={DataUserCardSchema}
						onSubmit={values => {
							console.log(values);
						}}
					>
						{({ errors, touched }) => (		
							<Form>
								<div className='field'>
									<label className='label'>CARDHOLDER NAME</label>
									<div className='control'>
										<Field className="input" name="userCardName" placeholder="e.g. Jane Applessed" />
									</div>
									{errors.userCardName && touched.userCardName ? ( <p className="help is-danger">{errors.userCardName}</p> ) : null}
								</div>
								<div className='field'>
									<label className='label'>CARD NUMBER</label>
									<div className='control'>
										<Field className="input" name="userCardNumber" placeholder="e.g. 1234 5678 9123 0000" />
									</div>
									{errors.userCardNumber && touched.userCardNumber ? ( <p className="help is-danger">{errors.userCardNumber}</p> ) : null}
								</div>
								<div className='columns mt-3'>
									<div className='column is-6 field'>
										<label className='label'>EXP. DATE (MM/YY)</label>
										<div className='columns'>
											<div className='column is-6 control'>
												<Field className="input" name="userCardMonth" placeholder="MM" />
											</div>
											<div className='column is-6 control'>
												<Field className="input" name="userCardYear" placeholder="YY" />
											</div>
										</div>
										{errors.userCardMonth && touched.userCardMonth ? ( <p className="help is-danger">{errors.userCardMonth}</p> ) : null}
										{errors.userCardYear && touched.userCardYear ? ( <p className="help is-danger">{errors.userCardYear}</p> ) : null}
									</div>
									<div className='column is-6 field'>
										<label className='label'>CVC</label>
										<div className='control'>
											<Field className="input" name="userCardCVV" placeholder="	E.G. 123" />
										</div>
										{errors.userCardCVV && touched.userCardCVV ? ( <p className="help is-danger">{errors.userCardCVV}</p> ) : null}
									</div>
								</div>
								<div className='field submit-field m-0'>
									<div className='control'>
										<button className='button' type="submit">Confirm</button>
									</div>
								</div>
							</Form>
						)}
					</Formik>
					{/* <div className='form-results'>
						<h2><span>{yearValue ? yearValue : '--'}</span> years</h2>
						<h2><span>{monthValue ? monthValue : '--'}</span> months</h2>
						<h2><span>{dayValue ? dayValue : '--'}</span> days</h2>
					</div> */}
				</div>
			</div>
        </div>
	)
}