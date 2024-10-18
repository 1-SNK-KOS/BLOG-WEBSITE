import PropTypes from 'prop-types'

function Button({
    children, // or can be called as BtnText then have to explicity mention the text of button just for fancy s it is btw btn that's the reason
    type = 'button',
    className = '',
    textColor = "text-white",
    bgColor = "bg-blue-600",
    ...props

}) {
    console.log('BUTTON CLICKED')  //REVIEW 
    return (
        <button className={`px-4 py-2 rounded-lg  ${textColor} ${bgColor} ${className}`} type={type} {...props}>
            {children}
            {/* {Btntext} */}
        </button>
    )

}

Button.propTypes = {
    // label: PropTypes.string.isRequired,
    // type: PropTypes.string.isRequired,
    className: PropTypes.string,
    textColor: PropTypes.string,
    bgColor: PropTypes.string,
    children: PropTypes.string   //REVIEW 
}

export default Button