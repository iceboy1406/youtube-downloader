import React from 'react'
interface Props extends React.ComponentPropsWithoutRef<'div'> {}
const TabList: React.FC<Props> = ({ className = '', ...restProps }) => {
    return (
        <div
            className={`w-full flex items-center rounded-md overflow-hidden ${className}`}
            {...restProps}
        />
    )
}

export default TabList
