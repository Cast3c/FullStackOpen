import { useState } from 'react'

export const useForm = initialValues => {
  const [values, setValues] = useState(initialValues)

  const handleChange = event => {
    const { name, value } = event.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const reset = () => {
    setValues(initialValues)
  }

  return {
    values,
    handleChange,
    reset
  }
}
