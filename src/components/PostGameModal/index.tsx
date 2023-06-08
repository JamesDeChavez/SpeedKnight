import './styles.css'

interface Props {
    score: number,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const PostGameModal: React.FC<Props> = ({ score, setModalVisible }) => {
    
    const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setModalVisible(false)
    }
    
    const className = 'PostGameModal'
    return (
        <div className={className}>
            <div className={`${className}_container`}>
                <div className={`${className}_closeContainer`}>
                    <button className={`${className}_closeButton`} onClick={handleCloseClick}>X</button>
                </div>
                <h2>Post Game Menu</h2>
                <p>{`Your score was ${score}`}</p>
            </div>
        </div>
    )
}

export default PostGameModal