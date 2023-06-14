import axios from "axios"

const ScoreAPI = {
    postUserScore: async (userId: string, userScore: number) => {
        const userScoreData = await axios.post('http://localhost:3000/api/score/user', {
            userId, userScore
        })
        return userScoreData.data
    },
    getGlobalScores: async () => {
        const globalScoresData = await axios.get('http://localhost:3000/api/score/global')
        return globalScoresData.data
    }
}

export default ScoreAPI