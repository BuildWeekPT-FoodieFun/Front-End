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
	}, [status, NewProfile])

	return (
		<Form className='form'>
			<h2>Leave your review below.</h2>

			<ErrorMessage name='itemName' />
			<Field 
				type='text' 
				name='itemName' 
				placeholder='Name of food item' 
				className='field'
			/>

			<ErrorMessage name='restType' />
			<Field 
				type='text' 
				name='restType' 
				placeholder='Type of restaurant' 
				className='field'
			/>

			<ErrorMessage name='restName' />
			<Field 
				type='text' 
				name='restName' 
				placeholder='Restaurant name' 
				className='field'
			/>

			<ErrorMessage name='rating' />
			<Field 
				type='number' 
				name='rating' 
				placeholder='Rate your meal' 
				className='field'
			/>

			<ErrorMessage name='textarea' />
			<Field 
				component='textarea'
				type='text' 
				name='textarea' 
				placeholder='Place your review here.' 
				className='textarea'
			/>

			<button type='submit' id='textAreaButton'>Submit Review</button>
		</Form>
	)
}

export default withFormik({
	mapPropsToValues: (values) => { // Values are mapped to the name prop in Field.
		return {
			// This makes the inputs controlled. 
			textarea: values.textarea || '',
			// email: values.email || '',
			password: values.password || ''
		}
	},

	validationSchema: yup.object().shape({
		textarea: yup.string().required('You must leave a review before you submit this form.'), 
	}),

	handleSubmit: (values, formik) => {
    axios
    .post('https://foodiefunbackend.herokuapp.com/api/app', values)
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

// https://foodiefunbackend.herokuapp.com/api/auth/register