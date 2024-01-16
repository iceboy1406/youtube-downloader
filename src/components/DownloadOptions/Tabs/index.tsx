import React, { useState } from 'react'
import TabContext from './context'
import TabList from './TabList'
import Tab from './Tab'
import TabPanel from './TabPanel'

interface Props {
    children: React.ReactNode
    defaultValue: string
}

const Tabs = ({ children, defaultValue }: Props) => {
    const [activeTab, setActiveTab] = useState(defaultValue)
    return (
        <TabContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </TabContext.Provider>
    )
}

Tabs.List = TabList
Tabs.Tab = Tab
Tabs.Panel = TabPanel
export default Tabs
