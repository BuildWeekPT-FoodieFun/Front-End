import React, { useState } from 'react';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import '../../src/index.css';

const Form1 = (values) => {
	// const Person = {
	// 	name: '',
	// 	email: '',
	// 	password: ''
	// }

	// const [NewProfile, addNewProfile] = useState(Person);

	// const resetForm = () => {
	// 	addNewProfile(Person);
	// };

	return (
		<Form className='form'>
			<h2>Add Your Information Below!</h2>
			{/*values.errors.name && <p className='errors'>{values.errors.name}</p>*/}
			<ErrorMessage name='name' />
			<Field type='text' name='name' placeholder='name' className='field'/>
			<ErrorMessage name='email' />
			{/*values.errors.email && <p className='errors'>{values.errors.email}</p>*/}
			<Field type='text' name='email' placeholder='email' className='field'/>
			<ErrorMessage name='possword' />
			{/*values.errors.password && <p className='errors'>{values.errors.password}</p>*/}
			<Field type='password' name='password' placeholder='password' className='field'/>

			<button type='submit'>Submit</button>
		</Form>
	)
}

export default withFormik({
	mapPropsToValues: (values) => {
		return {
			// This makes the inputs controlled. 
			name: values.name || '',
			email: values.email || '',
			password: values.password || ''
		}
	},

	validationSchema: yup.object().shape({
		name: yup.string().required('Full name is required!'), 
		email: yup.string().email().required('We need an email'),
		password: yup.string().required('password required!')
	}),

	handleSubmit: (values, formik) => {
    axios.post('https://reqres.in/api/animals', values)
    .then((res) => {
      console.log(res)

      formik.resetForm();

    })
    .catch((err) => {
      console.log('error:', err)
    })
  }
})(Form1)