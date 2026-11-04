import { Notion } from "./notion.js";

const token = process.env.NOTION_TOKEN
const sourceId = process.env.NOTION_DATA_SOURCE_ID;

async function main() {
    const notion = new Notion({ token, sourceId })

    // create
    const created = await notion.create('hello')

    console.log('Status', created.status)
    console.log('Body', await created.json())
}

main()
