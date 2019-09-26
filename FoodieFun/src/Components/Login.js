import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import '../../src/index.css';

const Login = ({ values, status }) => {
	const [NewProfile, addNewProfile] = useState([]);
	// console.log(NewProfile)
	useEffect(() => {
		if (status) {
			addNewProfile([...NewProfile, status])
		}
	}, [status, NewProfile])

	return (
		<Form className='form'>
			<h2>Sign In</h2>
			{/*values.errors.name && <p className='errors'>{values.errors.name}</p>*/}

			<ErrorMessage name='username' />
			<Field 
				type='text' 
				name='username' 
				placeholder='Username' 
				className='field'
			/>

			<ErrorMessage name='Password' />
			{/*values.errors.password && <p className='errors'>{values.errors.password}</p>*/}
			<Field 
				type='password' 
				name='password' 
				placeholder='Password' 
				className='field'
			/>

			<button type='submit'>Submit</button>
		</Form>
	)
}

export default withFormik({
	mapPropsToValues: (values) => { // Values are mapped to the name prop in Field.
		return {
			// This makes the inputs controlled. 
			username: values.username || '',
			// email: values.email || '',
			password: values.password || ''
		}
	},

	validationSchema: yup.object().shape({
		username: yup.string().required('Full name is required!'), 
		// email: yup.string().email().required('We need an email address!'),
		password: yup.string().required('password required!')
	}),

	handleSubmit: (values, formik) => {
    axios
    .post('https://foodiefunbackend.herokuapp.com/api/auth/login', values)
    .then((res) => {
      console.log(res, values)
      formik.setStatus(res.data);
      formik.resetForm();

    })
    .catch((err) => {
      console.log('error:', err)
    })
  }
})(Login)

// https://reqres.in/api/animals... This is a testing API. 
// https://reqres.in/api/auth/login