import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../../firebase';
import { useHistory } from 'react-router-dom';
import Logo from '../../assets/full-logo.png';

const Login = () => {
	//const API_CREATE_URL =
	//		'https://atackmarketingapi.azurewebsites.net/api/User/create';
	const API_GET_URL = 'https://atackmarketingapi.azurewebsites.net/api/User';
	const history = useHistory();
	async function handleSubmit(values) {
		return new Promise(async (resolve, reject) => {
			if (values.email.length > 0 && values.password.length > 0) {
				await setTimeout(() => {
					firebase
						.auth()
						.signInWithEmailAndPassword(values.email, values.password)
						.then(() => {
							if (firebase.auth().currentUser.emailVerified === false) {
								reject(
									'please verify your email address from the verification email sent to your inbox'
								);
							}
							firebase
								.auth()
								.currentUser.getIdTokenResult()
								.then((tokenResponse) => {
									console.log(tokenResponse);
									fetch(API_GET_URL, {
										method: 'GET',
										headers: {
											Authorization: `Bearer ${tokenResponse.token}`
										}
										//	})
										// fetch(API_CREATE_URL, {
										// 	method: 'POST',
										// 	headers: {
										// 		Authorization: `Bearer ${tokenResponse.token}`,
										// 	},
									}).then((response) => {
										if (response.status === 200) {
											resolve(response.status);
										} else {
											reject('API ERROR: ' + JSON.stringify(response));
										}
									});

									resolve();
								})
								.catch((error) => reject('Firebase ' + error));
						})
						.catch((error) => reject('Firebase ' + error));
				}, 1000);
			}
		});
	}

	return (
		<div className="auth-container">
			<img className="logo" src={Logo} alt="logo" />
			<div className="auth-wrapper">
				<h1>Login</h1>
				<Formik
					initialValues={{ email: '', password: '' }}
					onSubmit={async (values, { setSubmitting, resetForm }) => {
						try {
							await handleSubmit(values);
							resetForm();
							history.push('/Home');
						} catch (error) {
							alert(error);
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
							.min(6, 'Password is too short - should be 6 chars minimum.')
							.matches(/(?=.*[0-9])/, 'Password must contain a number.')
					})}
				>
					{(props) => {
						const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props;

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
									className={errors.email && touched.email && 'error'}
								/>
								{errors.email && touched.email && <div className="input-feedback">{errors.email}</div>}

								<label htmlFor="email">Password</label>
								<input
									name="password"
									type="password"
									placeholder="Enter your password"
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
									className={errors.password && touched.password && 'error'}
								/>
								{errors.password &&
								touched.password && <div className="input-feedback">{errors.password}</div>}
								<button type="submit" disabled={isSubmitting}>
									Login
								</button>
							</form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};
export default Login;
