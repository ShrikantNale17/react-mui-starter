import React from 'react'
import './AppLoader.scss'

export type AppLoaderProps = any

export const AppLoader = (props: AppLoaderProps) => {
    return (
        <div className="application-loading-container">
            <div className="application-loading-box">
                <h2>
                    <img src="/logo192.png" alt="MUI Template" width="70" /> <br />
                    <div></div>
                </h2>
            </div>
        </div>
    )
}
