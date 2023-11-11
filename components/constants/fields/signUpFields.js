
import * as Yup from 'yup'

const signUpFields = [
    {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'First Name',
      type: 'input',
      variant: 'text'
    },
    {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Last Name',
      type: 'input',
      variant: 'text'
    },
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Email',
      type: 'input',
      variant: 'email'
    },
    {
      name: 'password',
      label: 'Password',
      placeholder: 'Password',
      type: 'input',
      variant: 'password'
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      placeholder: 'Confirm Password',
      type: 'input',
      variant: 'password'
    },
    {
      name: 'terms',
      label: 'I agree to Terms and Conditions',
      type: 'checkbox'
    },
]

const signUpSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password should be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  terms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required')
})

export { signUpFields, signUpSchema }

