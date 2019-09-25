import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import '../../src/index.css';

const UserCreate = ({ values, status }) => {
	const [NewProfile, addNewProfile] = useState([]);
	// console.log(NewProfile)
	useEffect(() => {
		if (status) {
			addNewProfile([...NewProfile, status])
		}
	}, [status])

	return (
		<Form className='form'>
			<h2>Add Your Information Below!</h2>
			{/*values.errors.name && <p className='errors'>{values.errors.name}</p>*/}

			<ErrorMessage name='name' />
			<Field 
				type='text' name='name' 
				placeholder='Name' 
				className='field'
			/>

			<ErrorMessage name='password' />
			{/*values.errors.password && <p className='errors'>{values.errors.password}</p>*/}
			<Field 
				type='password' 
				name='Password' 
				placeholder='password' 
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
			name: values.name || '',
			// email: values.email || '',
			password: values.password || ''
		}
	},

	validationSchema: yup.object().shape({
		name: yup.string().required('Full name is required!'), 
		// email: yup.string().email().required('We need an email address!'),
		password: yup.string().required('password required!')
	}),

	handleSubmit: (values, formik) => {
    axios.post('https://reqres.in/api/auth/register', values)
    .then((res) => {
      console.log(res, values)
      formik.setStatus(res.data);
      formik.resetForm();

    })
    .catch((err) => {
      console.log('error:', err)
    })
  }
})(UserCreate)

// https://reqres.in/api/animals... This is a testing API. 
// https://reqres.in/api/auth/register