import React from 'react'
interface Props {
    errorMessage: string
}
const AlertError: React.FC<Props> = ({ errorMessage }) => {
    return (
        <div className="bg-red-400/[.15] w-full px-3 py-3 rounded-md">
            <p className="text-red-500 text-center text-lg">{errorMessage}</p>
        </div>
    )
}

export default AlertError
