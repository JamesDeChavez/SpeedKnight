import './styles.css'

const LoginForm = () => {
    const className = 'LoginForm'
    return (
        <form className={className}>
            <h2 className={`${className}_title`}>Log in</h2>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`} htmlFor="email">Email</label>
                <input className={`${className}_input`} type="email" id="email" />
            </div>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`} htmlFor="password">Password</label>
                <input className={`${className}_input`} type="password" id="password" />
            </div>
            <div className={`${className}_buttonContainer`}>
                <input className={`${className}_submitButton`} type="submit" value="Log in" />
            </div>
        </form>
    )
}

export default LoginForm