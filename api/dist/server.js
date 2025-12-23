import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config({ path: './api/.env' });
const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
// Middleware
app.use(helmet());
app.use(cors({ origin: CORS_ORIGIN }));
app.use(morgan('combined'));
app.use(express.json());
// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Site Checker API'
    });
});
// Basic route
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the Site Checker API' });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong" });
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(` Health check: http://localhost:${PORT}/api/health`);
});
export default app;
