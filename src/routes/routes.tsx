import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { authenticationService } from '../utils/auth.service'

// Purpose of this component is to restrict access to secured routes/pages if user not logged in
const Routes = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            console.log("Routes")
            console.log(props)
            // console.log(authenticationService.currentUserValue && Object.keys(authenticationService.currentUserValue).length)
            const isLoggedIn = authenticationService.currentUserValue ? Object.keys(authenticationService.currentUserValue).length > 1 : false;
            // console.log(isLoggedIn)
            if (!isLoggedIn) {
                console.log("to login")
                return (
                    <Redirect to={'/auth/login'}
                    // to={{
                    //     pathname: '/auth/login',
                    //     state: { from: props.location },
                    // }}
                    />
                )
            } else {
                console.log(Component)
                return <Component {...rest} {...props} />
            }
        }}
    />
)

export default Routes
