import React from 'react'

const Link = ({to, children}) =>
    <a href={to} target='_blank' className='link'>{children}</a>;

export default Link
