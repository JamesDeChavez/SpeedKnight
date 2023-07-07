import { useContext, useState, useEffect } from 'react'
import GlobalContext from '../../utils/GlobalContext'
import classNames from 'classnames'
import './styles.css'
import { API, Auth } from 'aws-amplify'
import Spinner from '../Spinner'

const UserMetrics = () => {
    const { darkMode, userData } = useContext(GlobalContext)
    const [userBest, setUserBest] = useState(0)
    const [userScoresTotal, setUserScoresTotal] = useState(0)
    const [userScoresCount, setUserScoresCount] = useState(1)
    const [usersLastScore, setUserLastScore] = useState(0)
    const [spinnersVisible, setSpinnersVisible] = useState(false)

    useEffect(() => {
        const getUserMetrics = async () => {
            setSpinnersVisible(true)
            const apiName = 'SpeedKnightChallenge'
            const path = '/score/user'            
            const currentUserId = userData.attributes ? userData.attributes.sub : userData.signInUserSession.idToken.payload.sub
            const myInit: any = {
                queryStringParameters: {
                    userId: currentUserId
                },
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json",
                    Authorization: `${(await Auth.currentSession()).getIdToken().getJwtToken()}`
                }
            }
            try {
                const response = await API.get(apiName, path, myInit)
                setUserBest(response.scoreMax)
                setUserScoresTotal(response.scoresTotal)
                setUserScoresCount(response.scoresCount > 0 ? response.scoresCount : 1)
                setUserLastScore(response.lastGameScore)
                setSpinnersVisible(false)
            } catch (error) {
                console.log('error', error)
                setSpinnersVisible(false)
            }
        }
        getUserMetrics()
    }, [])
    const className = 'UserMetrics'
    return (
        <div className={classNames(className, darkMode && className + '_darkMode')}>
            <h3 className={`${className}_title`} >Your Metrics</h3>            
            <div className={`${className}_metricsContainer`}>
                    <div className={`${className}_metric`}>
                        {spinnersVisible ?
                            <Spinner />
                        :
                            <p className={`${className}_metricNumber`}>{usersLastScore}</p>
                        }
                        <p className={`${className}_metricText`}>Last Game</p>
                    </div>
                    <div className={`${className}_metric`}>
                        {spinnersVisible ?
                            <Spinner />
                        :
                            <p className={`${className}_metricNumber`}>{Math.floor(userScoresTotal / userScoresCount)}</p>
                        }
                        <p className={`${className}_metricText`}>Average</p>
                    </div>
                    <div className={`${className}_metric`}>
                        {spinnersVisible ?
                            <Spinner />
                        :
                            <p className={`${className}_metricNumber`}>{userBest}</p>
                        }
                        <p className={`${className}_metricText`}>Best</p>
                    </div>
                </div>
        </div>
    )
}

export default UserMetrics