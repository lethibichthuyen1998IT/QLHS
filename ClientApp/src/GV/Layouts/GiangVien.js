import React, { Component } from 'react';
import { Route } from 'react-router-dom';

const GVLayout = ({ children, ...rest }) => {
    return (
            <div className="main">{children}</div>
      
    )
}  
const GVLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <GVLayout>
                <Component {...matchProps} />
            </GVLayout>
        )} />
    )
};

export default GVLayoutRoute;  