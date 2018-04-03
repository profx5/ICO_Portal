import React from 'react'

const Button = ({
    text,
    danger,
    primary,
    info,
    success,
    ...props
}) => {
    const classes = () => {
        return (danger && 'btn btn-danger') ||
               (info && 'btn btn-info') ||
               (primary && 'btn btn-primary') ||
               (success && 'btn btn-success')
    }

    return (
        <button className={classes()} {...props}>{text}</button>
    )
}

Button.defaultProps = {
    danger: false,
    primary: true,
    info: false,
    success: false
}

export default Button
