import axios from "axios";

const apiEndpoint = 'http://localhost:3000/'

const headers = {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer your-token-here',
}

// await axios.post(
//     'https://your-api-endpoint.com/submit',
//     { key1: 'value1', key2: 'value2' }, // Your data object
//     {
//         headers: headers,
//     }
// );


class Connecter {
    static async get(endpoint) {
        const data = await axios.get(apiEndpoint + endpoint)
        return await data
    }

    static async add(endpoint, data) {
        try {

            const res = await axios.post(apiEndpoint + endpoint, data, { headers: headers })
            return await res
        } catch (error) {
            return error
        }
    }

    static async update(endpoint, data) {
        try {
            const res = await axios.patch(apiEndpoint + endpoint, data, { headers: headers })
            return await res
        } catch (error) {
            return error
        }
    }

    static async delete(endpoint) {
        console.log("received data", endpoint)
        try {
            const res = await axios.delete(apiEndpoint + endpoint, { headers: headers })
            return res
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

export default Connecter;