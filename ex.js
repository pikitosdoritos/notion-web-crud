const token = process.env.NOTION_API_KEY;
const sourceId = process.env.NOTION_DATA_SOURCE_ID;

const headers = {
    Authorization: `Bearer ${token}`,
    "Notion-Version": "2026-03-11",
    "Content-Type": "application/json"
};

// CREATE
const createResponse = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers,
    body: JSON.stringify({
        parent: {
            type: "data_source_id",
            data_source_id: sourceId
        },
        properties: {
            Name: {
                title: [{ text: { content: "Тестовая запись" } }]
            }
        }
    })
});

const created = await createResponse.json();

console.log("Status:", createResponse.status);
console.log("Response:", created);

if (!createResponse.ok) {
  throw new Error(created.message);
}

console.log("Created:", created.id);

// READ
const getResponse = await fetch(`https://api.notion.com/v1/pages/${created.id}`, {
    headers
});

const page = await getResponse.json();
console.log("Read:", page.properties.Name.title[0].plain_text);

// UPDATE
const updateResponse = await fetch(`https://api.notion.com/v1/pages/${created.id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
        properties: {
            Name: {
                title: [{ text: { content: "Изменено через JS" } }]
            }
        }
    })
});

const updated = await updateResponse.json();
console.log("Updated:", updated.url);

// DELETE (перемещение в корзину)
// await fetch(`https://api.notion.com/v1/pages/${created.id}`, {
//   method: "PATCH",
//   headers,
//   body: JSON.stringify({ in_trash: true })
// });