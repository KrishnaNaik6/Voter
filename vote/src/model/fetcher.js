const endpoint = "http://localhost:3000/"

class fetcher {
    async get(route) {
        console.log(endpoint+route)
        const sports = await fetch(endpoint + route)
        const jsonData = await sports.json()
        console.log(jsonData)
        return await jsonData
    }
}

export default fetcher