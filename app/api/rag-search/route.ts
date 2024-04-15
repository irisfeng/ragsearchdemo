import axios from 'axios'

export async function POST(req: Request) {
    const { query } = await req.json()

    let data = JSON.stringify({
        q: query,
        location: "United States",
    });

    let config = {
        method: 'post',
        url: 'https://google.serper.dev/search',
        headers: {
            'X-API-KEY': 'efd36fc8abb110c8a3f269740d85b8d7225c8c73',
            'Content-Type': 'application/json'
        },
        data: data
    };

    const res = await axios(config);

    return Response.json(res.data["organic"]);
}