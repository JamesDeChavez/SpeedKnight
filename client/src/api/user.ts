import axios from "axios"

const UserAPI = {
    login: async (username: string, password: string) => {
        const userData = await axios.post('http://localhost:3000/api/user/login', {
            username: username, 
            password: password 
        })
        return userData.data
    },
    register: async (username: string, email: string, password: string) => {
        const userData = await axios.post('http://localhost:3000/api/user/register', {
            username: username,
            email: email, 
            password: password 
        })
        return userData.data
    },
    update: async (username: string, email: string, password: string) => {
        const userData = await axios.put('http://localhost:3000/api/user/update', {
            username: username,
            email: email, 
            password: password 
        })
        return userData.data
    }
}

export default UserAPI