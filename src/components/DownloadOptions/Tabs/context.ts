import { createContext } from 'react'

interface TabContextType {
    activeTab: string
    setActiveTab: (value: string) => void
}

const TabContext = createContext<TabContextType>({
    activeTab: '',
    setActiveTab: () => {},
})

export default TabContext
export type { TabContextType }
