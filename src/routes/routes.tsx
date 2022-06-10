import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { authenticationService } from '../utils/auth.service'

// Purpose of this component is to restrict access to secured routes/pages if user not logged in
const Routes = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (!authenticationService.currentUserValue) {
                return (
                    <Redirect
                        to={{
                            pathname: '/auth/login',
                            state: { from: props.location },
                        }}
                    />
                )
            } else {
                return <Component {...rest} {...props} />
            }
        }}
    />
)

export default Routes
