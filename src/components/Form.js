import { useEffect, useState } from 'react';
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
		.required('Por favor ingresa un mes'),
	userCardYear: Yup.string()
		.matches(/^[0-9]+$/, 'Solo se permiten números')
		.max(2, 'El año de vencimiento debe tener mínimo 2 digitos')
		.max(2, 'El año de vencimiento debe tener máximo 2 digitos')
		.required('Por favor ingresa un año'),
	userCardCVV: Yup.string()
		.matches(/^[0-9]+$/, 'Solo se permiten números')
		.min(3, 'Tu código CVC debe tener 3 3 digitos')
		.max(3, 'Tu código CVC debe tener 3 digitos')
		.required('Por favor ingresa tu codigo CVC')
});

export default function SubmitForm() {

	const [formComplete, setFormComplete] = useState(false)
	const [cardNumber, setCardNumber] = useState('0000000000000000');
    const [cardName, setCardName] = useState('Nombre ApellidoP ApellidoM');
    const [cardMonth, setCardMonth] = useState('00');
	const [cardYear, setCardYear] = useState('00');
    const [cardCVC, setCardCVC] = useState('000');

	// const cardNameHandleChange = (event) => {
	// 	setCardName(event.target.value);
	// };

	// const cardNumberHandleChange = (event) => {
	// 	setCardNumber(event.target.value);
	// };

	// const cardMonthHandleChange = (event) => {
	// 	setCardMonth(event.target.value);
	// };

	// const cardYearHandleChange = (event) => {
	// 	setCardYear(event.target.value);
	// };

	// const cardCVCHandleChange = (event) => {
	// 	setCardCVC(event.target.value);
	// };

	return (
		<div className='form-container columns is-gapless'>
			<div className='column is-6'>
				<div className='card-container'>
					<Card cvc={cardCVC}/>
					<Card
						type='front-card'
						// number={cardNumber}
						// name={cardName}
						// month={cardMonth}
						// year={cardYear}
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
								console.log(values);
								setFormComplete(true);
							}}
						>
							{({ errors, touched }) => (		
								<Form>
									<div className='field'>
										<label className='label'>CARDHOLDER NAME</label>
										<div className='control'>
											<Field className="input" name="userCardName" placeholder="e.g. Jane Applessed"/>
										</div>
										{errors.userCardName && touched.userCardName ? ( <p className="help is-danger">{errors.userCardName}</p> ) : null}
									</div>
									<div className='field'>
										<label className='label'>CARD NUMBER</label>
										<div className='control'>
											<Field className="input" name="userCardNumber" placeholder="e.g. 1234 5678 9123 0000"/>
										</div>
										{errors.userCardNumber && touched.userCardNumber ? ( <p className="help is-danger">{errors.userCardNumber}</p> ) : null}
									</div>
									<div className='columns mt-3'>
										<div className='column is-6 field'>
											<label className='label'>EXP. DATE (MM/YY)</label>
											<div className='columns'>
												<div className='column is-6 control'>
													<Field className="input" name="userCardMonth" placeholder="MM"/>
												</div>
												<div className='column is-6 control'>
													<Field className="input" name="userCardYear" placeholder="YY"/>
												</div>
											</div>
											{errors.userCardMonth && touched.userCardMonth ? ( <p className="help is-danger">{errors.userCardMonth}</p> ) : null}
											{errors.userCardYear && touched.userCardYear ? ( <p className="help is-danger">{errors.userCardYear}</p> ) : null}
										</div>
										<div className='column is-6 field'>
											<label className='label'>CVC</label>
											<div className='control'>
												<Field className="input" name="userCardCVV" placeholder="E.G. 123"/>
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