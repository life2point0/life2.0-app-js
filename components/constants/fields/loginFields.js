
import * as Yup from 'yup'

const loginFields = [
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
    }
]

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required')
})

export { loginFields, loginSchema }

