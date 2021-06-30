export class Cache {

    static async setCache(local, json) {
        let datas = []

        for (let j in json) {
            datas[json[j].id] = (json[j])
        }
        localStorage.setItem(local, JSON.stringify(datas))
    
    }


}
