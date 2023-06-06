import './styles.css'

const RegisterForm = () => {
    const className = 'RegisterForm'
    return (
        <form className={className}>
            <h2 className={`${className}_title`}>Create Account</h2>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`} htmlFor="email">Email</label>
                <input className={`${className}_input`} type="email" id="email" />
            </div>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`} htmlFor="password">Password</label>
                <input className={`${className}_input`} type="password" id="password" />
            </div>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`} htmlFor="repeatPassword">Repeat Password</label>
                <input className={`${className}_input`} type="password" id="password" />
            </div>
            <div className={`${className}_buttonContainer`}>
                <input className={`${className}_submitButton`} type="submit" value="Register" />
            </div>
        </form>
    )
}

export default RegisterForm