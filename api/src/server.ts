  import express, { Request, Response, NextFunction } from 'express';
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

  // Interfaces
  interface HealthCheckResponse {
      status: string;
      timestamp: string;
      service: string;
  }

  interface BasicResponse {
      message: string;
  }

  interface NotFoundResponse {
      error: string;
  }

  // Health check
  app.get('/api/health', (req: Request, res: Response<HealthCheckResponse>) => {
      res.json({
          status: 'OK',
          timestamp: new Date().toISOString(),
          service: 'Site Checker API'
      });
  });

  // Basic route
  app.get('/api', (req: Request, res: Response<BasicResponse>) => {
      res.json({ message: 'Welcome to the Site Checker API' });
  });

  // Error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(500).json({ error: "Something went wrong" });
  });

  // 404 handler
  app.use((req: Request, res: Response<NotFoundResponse>) => {
      res.status(404).json({ error: 'Not Found' });
  });

  app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(` Health check: http://localhost:${PORT}/api/health`);
  });

  export default app;