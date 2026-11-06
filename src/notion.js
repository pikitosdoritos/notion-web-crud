export class Notion {
    constructor({ token, sourceId }) {
        this.headers = {
            Authorization: `Bearer ${token}`,
            "Notion-Version": "2026-03-11",
            "Content-Type": "application/json"
        }
        this.sourceId = sourceId

    }

    static extract(properties) {
        const {
            Name: { title: [{ plain_text: title }] },
            Status: { status: { name: status } },
            Date: { date: { start: date } }
        } = properties

        return { title, status, date }

    }

    async create(content, status, date) {
        const response = await fetch("https://api.notion.com/v1/pages", {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                parent: {
                    type: "data_source_id",
                    data_source_id: this.sourceId,
                },
                properties: {
                    Name: {
                        title: [{ text: { content } }]
                    },
                    Status: {
                        status: { name: status }
                    },
                    Date: {
                        date: { start: date }
                    }
                }
            })
        })

        return response.json()
    }

    async getData(createdID) {
        const response = await fetch(`https://api.notion.com/v1/pages/${createdID}`, {
            headers: this.headers
        })

        const { title, status, date } = Notion.extract((await response.json()).properties)

        return { title, status, date }

    }

    async update(createdID, content, status, date) {
        const response = await fetch(`https://api.notion.com/v1/pages/${createdID}`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                properties: {
                    Name: {
                        title: [{ text: { content } }]
                    },
                    Status: {
                        status: { name: status }
                    },
                    Date: {
                        date: { start: date }
                    }
                }
            })
        },
        )

        return Notion.extract((await response.json()).properties)

    }
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