const AwsConfigAuth = {
    region: import.meta.env.VITE_AWS_REGION,
    userPoolId: import.meta.env.VITE_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_USER_POOL_WEB_CLIENT_ID,
    cookieStorage: {
        domain: import.meta.env.VITE_COOKIE_STORAGE_DOMAIN,
        path: "/",
        expires: 365,
        sameSite: "strict",
        secure: true,
    },
    authenticationFlowType: "USER_SRP_AUTH",
    oauth: {
        domain: import.meta.env.VITE_OAUTH_DOMAIN,
        scope: [
            'phone',
            'email',
            'openid'
        ],
        redirectSignIn: import.meta.env.VITE_OAUTH_REDIRECT_SIGN_IN,
        redirectSignOut: import.meta.env.VITE_OAUTH_REDIRECT_SIGN_OUT,
        responseType: "code"
    }
}

export default AwsConfigAuth