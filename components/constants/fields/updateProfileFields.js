
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
      placeholder: 'Place where I grew up'
    },
    {
      name: 'pastPlaces',
      label: 'Other cities I have lived in',
      type: 'location',
      multiple: true,
      placeholder: 'Select where you have been'
    },
    {
      name: 'currentPlace',
      label: 'Where am I now',
      placeholder: 'Place I call my new home',
      type: 'location'
    },
    {
      name: 'occupations',
      label: 'My current profession',
      type: 'chip',
      options: []
    },
    {
      name: 'description',
      label: 'My life so far...',
      placeholder: 'Talk about who you are, why did you move to this city, what do you do, and if there is something this community can do for you',
      type: 'input',
      multiline: true,
      maxCharCount: 600,
    }
]

const updateProfileSchema = Yup.object().shape({
  description: Yup.string().required('Required')
})

export { updateProfileFields, updateProfileSchema }

