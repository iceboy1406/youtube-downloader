import React, { useContext, useMemo } from 'react'
import TabContext from './context'

interface Props extends React.ComponentPropsWithoutRef<'button'> {
    value: string
}

const Tab: React.FC<Props> = ({ value, ...restProps }) => {
    const { activeTab, setActiveTab } = useContext(TabContext)

    const isActive = useMemo(() => activeTab == value, [activeTab])

    return (
        <button
            className={`text-white px-4 py-2 grow ${
                isActive ? 'bg-white/[.15]' : 'bg-light hover:brightness-[.85]'
            }`}
            onClick={() => setActiveTab(value)}
            {...restProps}
        />
    )
}

export default Tab
