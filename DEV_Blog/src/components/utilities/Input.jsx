import { forwardRef, useId } from "react"
import PropTypes from 'prop-types'

const Input = forwardRef(function Input({
    label,
    type = 'text',
    placeholder,
    className = '',
    ...props

}, ref) {

    const id = useId()

       console.log('INPUT CLICKED ') // REVIEW 
    return (
        <div>
            {label && <label
                className='inline-block mb-1 pl-1'
                htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                id={id}
                placeholder={placeholder}
                {...props}
            />
        </div>
    )
})

Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string
}

export default Input