import ExampleBoardData from '../../utils/ExampleBoardData'
import ExampleSpace from '../ExampleSpace'
import './styles.css'

const ExampleBoard = () => {
    const className = 'ExampleBoard'
    return (
        <div className={className}>
            {ExampleBoardData.map((space, i) => {
                return <ExampleSpace space={space} key={i} />
            })}
        </div>
    )
}

export default ExampleBoard