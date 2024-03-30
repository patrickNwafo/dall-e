import express from "express";
import * as dotenv from "dotenv"
import { OpenAI } from "openai";

dotenv.config();

const router = express.Router();

const config = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAI(config);

router.route('/').get((req, res) => {
    res.send('Hello from DALL-E! dear');
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        });

        const image = aiResponse.data[0].b64_json;
        res.status(200).json({ photo: image });
    } catch (error) {
        console.log(error)
        res.status(500).send(error?.response.data.error.message);
    }
})

export default router;