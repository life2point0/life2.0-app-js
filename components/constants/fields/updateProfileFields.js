
import * as Yup from 'yup'

const occupations = [
    'Tourist', 'Student', 'Entrepreneur', 'C-suite', 'Doctor', 'Lawyer', 'Entertainer',
    'Artist', 'Nurse', 'Tutor', 'Teacher', 'Chef', 'Baker', 'Engineer', 'Hairdresser',
    'Masseuse', 'Banker', 'Bartender', 'Handyman', 'Technician'
]

const updateProfileFields = [
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
      name: 'placeOfOrigin',
      label: 'Where am I from',
      type: 'location',
      placeholder: 'Select where you are from'
    },
    {
      name: 'pastLocations',
      label: 'Places I have lived in',
      type: 'location',
      multiple: true,
      placeholder: 'Select where you have been'
    },
    {
      name: 'currentLocation',
      label: 'Where am I now',
      placeholder: 'Select where you are now',
      type: 'location'
    },
    {
      name: 'occupations',
      label: 'What I do for a living?',
      type: 'chip',
      options: occupations
    },
    {
      name: 'description',
      label: 'Bio',
      placeholder: 'Anything about you',
      type: 'input',
      multiline: true,
      maxCharCount: 600,
    }
]

const updateProfileSchema = Yup.object().shape({
  description: Yup.string().required('Required')
})

export { updateProfileFields, updateProfileSchema }

