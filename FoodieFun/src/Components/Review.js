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

			<ErrorMessage name='item_name' />
			<Field 
				type='text' 
				name='item_name' 
				placeholder='Name of food item' 
				className='field'
			/>

			<ErrorMessage name='restaurant_type' />
			<Field 
				type='text' 
				name='restaurant_type' 
				placeholder='Type of restaurant' 
				className='field'
			/>

			<ErrorMessage name='restaurant_name' />
			<Field 
				type='text' 
				name='restaurant_name' 
				placeholder='Restaurant name' 
				className='field'
			/>

			<ErrorMessage name='rating' />
			<Field 
				type='number' 
				name='rating' 
				min='0'
				max='5'
				placeholder='Rate 0 to 5. 5 is best' 
				className='field'
			/>

			<ErrorMessage name='comments' />
			<Field 
				component='textarea'
				type='text' 
				name='comments' 
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
			item_name: values.item_name || '',
			restaurant_type: values.restaurant_type || '',
			restaurant_name: values.restaurant_name || '',
			rating: values.rating || '',
			comments: values.comments || '',
			// user_id: values.id || '4'
		}
	},

	validationSchema: yup.object().shape({
		item_name: yup.string().required('What is the name of the item you are reviewing?'),
		restaurant_type: yup.string().required('What kind of restaurant did you eat at?'),
		restaurant_name: yup.string().required('What is the name of the restaurant?'),
		rating: yup.string().required('Please leave a rating from 0 to 5'),
		comments: yup.string().required('You must leave a review before you submit this form.') 
	}),

	handleSubmit: (values, formik) => {
    axios
    .post('https://reqres.in/api/animals', values)
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

// https://foodiefunbackend.herokuapp.com/api/app