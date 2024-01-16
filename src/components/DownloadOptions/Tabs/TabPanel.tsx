import React, { useContext, useMemo } from 'react'
import TabContext from './context'
interface Props extends React.ComponentPropsWithoutRef<'div'> {
    value: string
}
const TabPanel: React.FC<Props> = ({ value, className = '', ...restProps }) => {
    const { activeTab } = useContext(TabContext)

    const isActive = useMemo(() => activeTab == value, [activeTab])
    return (
        <div
            className={`${isActive ? '' : 'hidden'} ${className}`}
            {...restProps}
        />
    )
}

export default TabPanel
