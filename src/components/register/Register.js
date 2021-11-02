import axios from 'axios';

import { Formik, Form, Field } from 'formik';
import * as yup from "yup";



const Register = (props) => {
    const SignupSchema = yup.object({
        first_name: yup.string().max(20).required('Please enter your name'),
        last_name: yup.string().max(20).required('Please enter your name'),
        email: yup.string().email('Email is invaild').required('Required'),
        password: yup.string().min(6, 'Password must be at least 6 charachters').required('Required'),
        age: yup.number().required('Required'),
    })


    // sending the data of the users
    const submitForm = (values, options) => {
        axios.post("https://route-egypt-api.herokuapp.com/signup", values).then(({ data }) => {
            const errors = data.errors;
            const success = data.message;
            if (success == 'success') {
                options.resetForm()
                props.history.replace("/login")
            } else {
                for (const error in errors) {
                    options.setErrors({ [error]: errors[error].message })
                }
            }
        });
    };

    return (
        <div className="container mt-5">
            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    age: '',
                }}

                validationSchema={SignupSchema}
                onSubmit={submitForm}
            >
                {({ errors, touched }) => (
                    <Form className="w-50 m-auto">
                        <Field name="first_name" className="form-control mt-2" placeholder="First name" />
                        {errors.first_name && touched.first_name ? (
                            <div className="bg-danger mb-2">{errors.first_name}</div>
                        ) : null}
                        <Field name="last_name" className="form-control mt-2" placeholder="Last name" />
                        {errors.last_name && touched.last_name ? (
                            <div className="bg-danger">{errors.last_name}</div>
                        ) : null}
                        <Field name="email" type="email" className="form-control mt-2" placeholder="Email" />
                        {errors.email && touched.email ? <div className="bg-danger">{errors.email}</div> : null}
                        <Field name="password" type="password" className="form-control mt-2" placeholder="Password" />
                        {errors.password && touched.password ? <div className="bg-danger">{errors.password}</div> : null}
                        <Field name="age" type="number" className="form-control mt-2" placeholder="age" />
                        {errors.age && touched.age ? <div className="bg-danger">{errors.age}</div> : null}
                        <button type="submit" className="btn btn-info w-100 mt-2">Submit</button>
                    </Form>

                )}
            </Formik>
        </div>

    )
}

export default Register



