
import * as Yup from 'yup'

const updateProfileFields = [
    {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'First Name',
      type: 'input',
      variant: 'text',
      hidden: true
    },
    {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Last Name',
      type: 'input',
      variant: 'text',
      hidden: true
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
      name: 'currentPlace',
      label: 'Where am I now',
      placeholder: 'Select where you are now',
      type: 'location'
    },
    {
      name: 'occupations',
      label: 'What I do for a living?',
      type: 'chip',
      options: []
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

