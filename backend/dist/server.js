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
const cors_1 = __importDefault(require("cors"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const buffer_1 = require("buffer");
const dotenv_1 = __importDefault(require("dotenv"));
// Configure dotenv at the very beginning
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3001;
// Add some debug logging
console.log('Environment variables loaded:', {
    username: process.env.SCRAPING_BOT_USERNAME ? 'Present' : 'Missing',
    apiKey: process.env.SCRAPING_BOT_API_KEY ? 'Present' : 'Missing'
});
app.use((0, cors_1.default)({
    origin: [
        'https://scraperpro.vercel.app',
        'http://localhost:3000' // for local development
    ],
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express_1.default.json());
app.post('/scrape', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { url, options } = req.body;
    console.log('Received request:', { url, options });
    const username = process.env.SCRAPING_BOT_USERNAME;
    const apiKey = process.env.SCRAPING_BOT_API_KEY;
    if (!username || !apiKey) {
        console.error('Missing credentials:', {
            hasUsername: !!username,
            hasApiKey: !!apiKey
        });
        return res.status(400).json({
            error: 'Missing API credentials',
            details: {
                username: !!username,
                apiKey: !!apiKey
            }
        });
    }
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    const auth = buffer_1.Buffer.from(`${username}:${apiKey}`).toString('base64');
    try {
        console.log('Making request to scraping-bot.io with URL:', url);
        const response = yield (0, node_fetch_1.default)('http://api.scraping-bot.io/scrape/retail', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: url,
                options: {
                    useChrome: (_a = options === null || options === void 0 ? void 0 : options.useChrome) !== null && _a !== void 0 ? _a : false,
                    premiumProxy: (_b = options === null || options === void 0 ? void 0 : options.premiumProxy) !== null && _b !== void 0 ? _b : true,
                    proxyCountry: "MY",
                    waitForNetworkRequests: (_c = options === null || options === void 0 ? void 0 : options.waitForNetworkRequests) !== null && _c !== void 0 ? _c : false,
                },
            }),
        });
        const data = yield response.json();
        console.log('Response from scraping-bot.io:', data);
        res.json(data);
    }
    catch (error) {
        const err = error;
        console.error('Scraping error:', err);
        res.status(500).json({ error: 'Scraping error', details: err.message });
    }
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
