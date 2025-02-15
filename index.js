import express from "express";
import cors from "cors";
// import fetch from "node-fetch";

const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());
app.use(express.json());

// Accept Get Requests
app.get("/", async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send("URL is required");
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `HTTP Error ${response.status}: ${response.statusText}`
            );
        }

        // Clone headers from the original response
        const excludeHeaders = [
            "transfer-encoding",
            "content-encoding",
            "access-control-allow-origin",
            "age",
            "cache-control",
        ];

        for (const [key, value] of response.headers.entries()) {
            if (!excludeHeaders.includes(key.toLowerCase())) {
                res.setHeader(key, value);
            }
        }

        const responseData = await response.text();
        res.status(response.status).send(responseData);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Accept All Requests
app.post("/", async (req, res) => {
    // Get JSON body of the request
    let data = req.body;
    let url = data?.url;
    let options = data?.options ?? {};
    console.log(data);

    if (!url) {
        return res.status(400).send("URL is required");
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(
                `HTTP Error ${response.status}: ${response.statusText}`
            );
        }

        // Clone headers from the original response
        const excludeHeaders = [
            "transfer-encoding",
            "content-encoding",
            "access-control-allow-origin",
            "age",
            "cache-control",
        ];

        for (const [key, value] of response.headers.entries()) {
            if (!excludeHeaders.includes(key.toLowerCase())) {
                res.setHeader(key, value);
            }
        }

        const responseData = await response.text();
        res.status(response.status).send(responseData);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
