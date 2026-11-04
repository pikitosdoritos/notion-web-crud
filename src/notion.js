

export class Notion {
    constructor({ token, sourceId }) {
        this.token = token
        this.sourceId = sourceId
    }

    async create(content) {
        const response = await fetch("https://api.notion.com/v1/pages", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.token}`,
                "Notion-Version": "2026-03-11",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                parent: {
                    type: "data_source_id",
                    data_source_id: this.sourceId,
                },
                properties: {
                    Name: {
                        title: [{ text: { content } }]
                    }
                }
            })
        })

        return response
    }

    async getData() { }

}

// async request(method, path, body) {
//     const response = await this.fetcher(
//         `https://api.notion.com/v1${path}`, {
//         method,
//         headers: {
//             Authorization: `Bearer ${this.token}`,
//             'Notion-Version': '2026-03-11',
//             'Content-Type': 'application/json',
//         },
//         ...(body)
//     }
//     )
// }

// async connect(databaseID) {
//     const database = await this.request('GET', `/databases/${databaseID}`)
//     const sources = database.data_sources ?? []

//     return sources
// }
// }