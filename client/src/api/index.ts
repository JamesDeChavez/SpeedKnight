import UserAPI from "./user"
import ScoreAPI from "./score"

//this is currently not in use, as I chose to utilize a serverless AWS structure; but I will leave this here for future reference, in case
const API = {
    User: UserAPI,
    Score: ScoreAPI
}

export default API