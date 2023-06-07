import { useContext } from 'react'
import { BoardSpace } from "../../utils/interfaces"
import KnightSVG from "../Knight/KnightSVG"
import PawnSVG from "../Pawn/PawnSVG"
import GlobalContext from '../../utils/GlobalContext'
import './styles.css'

interface Props {
    space: BoardSpace
}

const ExampleSpace: React.FC<Props> = ({ space }) => {
    const { darkMode } = useContext(GlobalContext)
    const className = 'ExampleSpace'
    return (
        <div className={className} style={{ 
            backgroundColor: darkMode && space.backgroundColor === '#b58863' 
                ? '#769656' 
                : space.backgroundColor,

        }}>
            {space.knightVisible && <KnightSVG />}
            {space.pawnVisible && <PawnSVG />}
        </div>
    )
}

export default ExampleSpace