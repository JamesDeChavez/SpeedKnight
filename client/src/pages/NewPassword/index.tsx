import NewPasswordForm from "../../components/NewPasswordForm"
import './styles.css'

const NewPassword = () => {
    const className = 'NewPassword'
    return (
        <div className={className}>
            <NewPasswordForm />
        </div>
    )
}

export default NewPassword