import React from 'react'
import { useField, ErrorMessage } from 'formik'

const TextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props)

    return (
        <div className='mb-2'>
            <label htmlFor={field.name}>{label}</label>
            <textarea rows={5}
                className={`form-control shadow-none ${meta.touched && meta.error && "is-invalid"} `}
                {...field} {...props}
                autoComplete='off'
            />
            <ErrorMessage name={field.name} >
                {(msg) => {
                    return (
                        <div style={{ color: 'red' }} >{msg}</div>
                    )
                }}
            </ErrorMessage >
        </div>
    )
}

export default TextArea