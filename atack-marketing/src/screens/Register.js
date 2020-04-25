import React from 'react';
import { Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../firebase';

const Register = () => {
	const API_CREATE_URL =
		'https://atackmarketingapi.azurewebsites.net/api/User/create';
	async function handleSubmit(values) {
		return new Promise(async (resolve, reject) => {
			if (values.email.length > 0 && values.password.length > 0) {
				await setTimeout(() => {
          console.log('AAAA');
					firebase.auth().createUserWithEmailAndPassword(
							values.email,
							values.password
            )
           
						.then((response) => {
              console.log(response);
							alert(
								' - ' +
									response.user.email +
									' Please check verification email'
              );
              
							firebase.auth().currentUser.sendEmailVerification();
            
							firebase
								.auth()
								.currentUser.getIdTokenResult()
								.then((tokenResponse) => {
									fetch(API_CREATE_URL, {
										method: 'POST',
										headers: {
											Authorization: `Bearer ${tokenResponse.token}`,
										},
									}).then((response) => {
										if (response.status === 201) {
											resolve(response.status);
										} else {
											reject(
												console.log(
													'API ERROR: ' +
														JSON.stringify(response)
												)
											);
										}
									});
								});
						})
						.catch((e) => {
							console.log(e);
						});
				},3000);
			}
		});
	}

	return (
		<Container>
			<h1>Register</h1>
			<Formik
				initialValues={{ email: '', password: '', confirmPassword: '' }}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					try {
						await handleSubmit(values);
					} catch (error) {
						alert(error);
						resetForm();
						values.password = '';
					}
					//	setTimeout(() => {
					//		console.log('Logging in', values);
					//		setSubmitting(false);
					//	}, 1000);
				}}
				validationSchema={Yup.object().shape({
					email: Yup.string().email().required('Required'),
					password: Yup.string()
						.required('No password provided.')
						.min(
							6,
							'Password is too short - should be 6 chars minimum.'
						)
						.matches(
							/(?=.*[0-9])/,
							'Password must contain a number.'
						),
					confirmPassword: Yup.string()
						.oneOf(
							[Yup.ref('password')],
							'Confirm Password must matched Password'
						)
						.required('Confirm Password is required'),
				})}
			>
				{(props) => {
					const {
						values,
						touched,
						errors,
						isSubmitting,
						handleChange,
						handleBlur,
						handleSubmit,
					} = props;

					return (
						<form onSubmit={handleSubmit}>
							<label htmlFor="email">Email</label>
							<input
								name="email"
								type="text"
								placeholder="Enter your email"
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
								className={
									errors.email && touched.email && 'error'
								}
							/>
							{errors.email && touched.email && (
								<div className="input-feedback">
									{errors.email}
								</div>
							)}

							<label htmlFor="email">Password</label>
							<input
								name="password"
								type="password"
								placeholder="Enter your password"
								value={values.password}
								onChange={handleChange('password')}
								onBlur={handleBlur('password')}
								className={
									errors.password &&
									touched.password &&
									'error'
								}
							/>
							{errors.password && touched.password && (
								<div className="input-feedback">
									{errors.password}
								</div>
							)}
							<label htmlFor="confirmPassword">
								Confirm Password
							</label>
							<input
								name="password"
								type="password"
								placeholder="re-enter your password"
								value={values.confirmPassword}
								onChange={handleChange('confirmPassword')}
								onBlur={handleBlur('confirmPassword')}
								className={
									errors.confirmPassword &&
									touched.confirmPassword &&
									'error'
								}
							/>
							{errors.confirmPassword &&
								touched.confirmPassword && (
									<div className="input-feedback">
										{errors.confirmPassword}
									</div>
								)}

							<button type="submit" disabled={isSubmitting}>
								Login
							</button>
						</form>
					);
				}}
			</Formik>
		</Container>
	);
};
export default Register;
