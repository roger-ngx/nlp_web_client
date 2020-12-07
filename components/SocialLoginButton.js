import React from 'react'
import SocialLogin from 'react-social-login';
import { Button } from '@material-ui/core';

class SocialButton extends React.Component {

    render() {
        console.log(this.props);
        return (
            <Button
                variant='outlined'
                onClick={this.props.triggerLogin}
                {...this.props}
            >
              { this.props.children }
            </Button>
        );
    }
}

export default SocialLogin(SocialButton);