import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Card from './Card';

const DataUserCardSchema = Yup.object().shape({
	userCardNumber: Yup.string()
		.matches(/^[0-9]+$/, 'Solo se permiten números')
		.min(16, 'El número de tarjeta debe tener 16 dígitos')
		.max(16, 'El número de tarjeta debe tener 16 dígitos')
		.required('Por favor ingresa tu número de tarjeta'),
	userCardName: Yup.string()
		.matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi, 'No se permiten caracteres especiales')
		.required('Por favor ingresa tu nombre'),
	userCardMonth: Yup.string()
		.matches(/^[0-9]+$/, 'Solo se permiten números')
		.max(2, 'El mes de vencimiento debe tener mínimo 2 digitos')
		.max(2, 'El mes de vencimiento debe tener máximo 2 digitos')
		.required('Por favor ingresa la fecha de expiración'),
	userCardYear: Yup.string()
		.matches(/^[0-9]+$/, 'Solo se permiten números')
		.max(2, 'El año de vencimiento debe tener mínimo 2 digitos')
		.max(2, 'El año de vencimiento debe tener máximo 2 digitos')
		.required('Por favor ingresa la fecha de expiración'),
	userCardCVV: Yup.string()
		.matches(/^[0-9]+$/, 'Solo se permiten números')
		.min(3, 'Tu código CVC debe tener 3 3 digitos')
		.max(3, 'Tu código CVC debe tener 3 digitos')
		.required('Por favor ingresa tu codigo CVC')
});

export default function SubmitForm() {

	const [formComplete, setFormComplete] = useState(false)
	const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardMonth, setCardMonth] = useState('');
	const [cardYear, setCardYear] = useState('');
    const [cardCVC, setCardCVC] = useState('');

	return (
		<div className='form-container columns is-gapless'>
			<div className='column is-6'>
				<div className='card-container'>
					<Card cvc={cardCVC}/>
					<Card
						type='front-card'
						name={cardName}
						number={cardNumber}
						month={cardMonth}
						year={cardYear}
					/>
				</div>
			</div>
			<div className='column is-6'>
				<div className='form'>
					{
						formComplete === false ?
						<Formik
							initialValues={{ userCardNumber: '', userCardName: '', userCardMonth: '', userCardYear: '', userCardCVV: ''}}
							validationSchema={DataUserCardSchema}
							onSubmit={values => {
								setFormComplete(true);
								console.log(values);
								setTimeout(() => {
									setFormComplete(false)
								}, 5000)
							}}
						>
							{({ errors, touched }) => (		
								<Form>
									<div className='field'>
										<label className='label'>CARDHOLDER NAME</label>
										<div className='control'>
											<Field
												className="input"
												name="userCardName"
												placeholder="e.g. Jane Applessed"
												onKeyUp={(e) => setCardName(e.target.value)}
											/>
										</div>
										{errors.userCardName && touched.userCardName ? ( <p className="help is-danger mb-0">{errors.userCardName}</p> ) : null}
									</div>
									<div className='field'>
										<label className='label'>CARD NUMBER</label>
										<div className='control'>
											<Field
												className="input"
												name="userCardNumber"
												placeholder="e.g. 1234 5678 9123 0000"
												maxLength='16'
												onKeyUp={(e) => setCardNumber(e.target.value)}
											/>
										</div>
										{errors.userCardNumber && touched.userCardNumber ? ( <p className="help is-danger mb-0">{errors.userCardNumber}</p> ) : null}
									</div>
									<div className='columns my-3 mx-0'>
										<div className='column is-6 field p-0'>
											<label className='label'>EXP. DATE (MM/YY)</label>
											<div className='columns m-0'>
												<div className='column is-6 control pt-0 pb-0 pl-0 pr-3'>
													<Field 
														className="input"
														name="userCardMonth"
														placeholder="MM"
														maxLength='2'
														onKeyUp={(e) => setCardMonth(e.target.value)}
													/>
												</div>
												<div className='column is-6 control pt-0 pb-0 pl-0 pr-3'>
													<Field 
														className="input"
														name="userCardYear"
														placeholder="YY"
														maxLength='2'
														onKeyUp={(e) => setCardYear(e.target.value)}
													/>
												</div>
											</div>
											{errors.userCardMonth && errors.userCardYear || touched.userCardMonth && touched.userCardYear ? ( <p className="help is-danger mb-0">{errors.userCardMonth}</p> ) : null}
										</div>
										<div className='column is-6 field p-0'>
											<label className='label'>CVC</label>
											<div className='control'>
												<Field
													className="input"
													name="userCardCVV"
													placeholder="E.G. 123"
													maxLength='3'
													onKeyUp={(e) => setCardCVC(e.target.value)}
												/>
											</div>
											{errors.userCardCVV && touched.userCardCVV ? ( <p className="help is-danger mb-0">{errors.userCardCVV}</p> ) : null}
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
						:
						<div className='form-message'>
							<figure className="image is-96x96">
								<img src="/assets/icon-complete.svg" />
							</figure>
							<h2>THANK YOU!</h2>
							<p>We've added your card details</p>
							<button className='button' onClick={() => setFormComplete(false)}>Continue</button>
						</div>
					}
				</div>
			</div>
        </div>
	)
}