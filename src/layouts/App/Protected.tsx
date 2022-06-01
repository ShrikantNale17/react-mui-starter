import { Route, Redirect, useLocation } from 'react-router-dom'
import { authenticationService } from '../../utils/auth.service'

export const Protected = () => {
    const location = useLocation();
    const isLoggedIn = authenticationService.currentUserValue ? Object.keys(authenticationService.currentUserValue).length > 1 : false;
    console.log(isLoggedIn)

    if (!isLoggedIn) {
        console.log("to login")
        return (
            <Redirect
                to={{
                    pathname: '/auth/login'
                }}
            />
        )
    } else {
        return (
            <Redirect to={'/home'} />
        )
    }
}