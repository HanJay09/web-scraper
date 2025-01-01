"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Import cors
const node_fetch_1 = __importDefault(require("node-fetch"));
const buffer_1 = require("buffer");
const app = (0, express_1.default)();
const port = 3001;
// Enable CORS for all origins (you can restrict it later to specific domains if needed)
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/scrape', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url, options } = req.body;
    const username = process.env.SCRAPING_BOT_USERNAME;
    const apiKey = process.env.SCRAPING_BOT_API_KEY;
    if (!username || !apiKey) {
        return res.status(400).json({ error: 'Missing API credentials' });
    }
    const auth = buffer_1.Buffer.from(`${username}:${apiKey}`).toString('base64');
    try {
        const response = yield (0, node_fetch_1.default)('http://api.scraping-bot.io/scrape', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url,
                options,
            }),
        });
        const data = yield response.json();
        res.json(data);
    }
    catch (error) {
        // Type assertion
        const err = error;
        res.status(500).json({ error: 'Scraping error', details: err.message });
    }
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
