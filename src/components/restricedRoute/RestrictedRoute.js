import React from 'react'
import { Route, Redirect } from 'react-router'

const RestrictedRoute = (props) => {
    let token = localStorage.getItem("userToken");
    return (
        <div>
            {token ? <Route path={props.path} component={props.component}></Route> :
                <Redirect to="/login" />}
        </div>
    )
}

export default RestrictedRoute;
