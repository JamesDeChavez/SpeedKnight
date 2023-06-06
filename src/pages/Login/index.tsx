import LoginForm from "../../components/LoginForm"
import './styles.css'

const Login = () => {
    const className = 'Login'
    return (
        <div className={className}>
            <LoginForm />
        </div>
    )
}

export default Login