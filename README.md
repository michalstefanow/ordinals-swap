# Ordinals Swap

A TypeScript-based platform for swapping Bitcoin Ordinals tokens.

## Features

- Swap Ordinals tokens between users
- Track swap status and history
- Secure transaction handling
- Rate limiting and security features
- MongoDB integration for data persistence
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Web3 provider
- Ordinals API access

## Installation

1. Clone the repository:
```bash
git clone https://github.com/michalstefanow/ordinals-swap.git
cd ordinals-swap
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the environment variables in `.env` with your configuration.

## Development

Start the development server:
```bash
npm run dev
```

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Endpoints

### Swaps

- `POST /api/swaps` - Create a new swap
- `GET /api/swaps/:id` - Get a specific swap
- `GET /api/swaps` - Get all swaps with optional filters
- `PATCH /api/swaps/:id/status` - Update swap status
- `POST /api/swaps/:id/cancel` - Cancel a swap

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── utils/          # Utility functions
├── app.ts          # Express application
└── index.ts        # Application entry point
```

## Security Considerations

- Input validation for all endpoints
- Rate limiting to prevent abuse
- Secure error handling
- MongoDB query sanitization
- CORS configuration

## Monitoring

- Winston logger for application logs
- Error tracking and reporting
- Performance monitoring
- Transaction status tracking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contact
- Telegram [@michalstefanow](https://t.me/mylord1_1)
- Twitter [@michalstefanow](https://x.com/michalstefanow)

