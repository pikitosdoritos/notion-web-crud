import { Notion } from "./notion.js";

const token = process.env.NOTION_TOKEN
const sourceId = process.env.NOTION_DATA_SOURCE_ID;

async function main() {
    const notion = new Notion({ token, sourceId })
    const content = 'Write API'
    const status = 'Done'
    const date = new Date

    // create
    const created = await notion.create(content, status, date)

    console.log('Body', created)

    // read
    const page = await notion.getData(created.id)
    console.log(page)

    // update
    const result = await notion.update(created.id, 'updated)', 'In progress', new Date)
    console.log(result)

    // delete
    const deleted = await notion.delete(created.id)
    console.log(deleted)
}

main()


setInterval(() => '', 1e9)