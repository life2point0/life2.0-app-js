
import * as Yup from 'yup'

const updatePersonalDetailsFields = [
    {
      name: 'languages',
      label: 'Languages I speak',
      type: 'select',
      multiple: true,
      options: []
    },
    {
      name: 'skills',
      label: 'My Interests',
      type: 'chip',
      options: []
    }
]

export { updatePersonalDetailsFields }

