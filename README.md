# Vesting Vault Backend - Audit Log System

A secure backend API for the Vesting Vault project with tamper-proof audit logging and cryptographic integrity verification.

## Features

- **Tamper-Proof Audit Logging**: Every admin action is cryptographically logged
- **Event Sourcing Architecture**: Logs are chained together using hash linking
- **Stellar Ledger Anchoring**: Daily root hashes are anchored to the Stellar blockchain
- **Chain Integrity Verification**: Verify that no logs have been tampered with
- **Automatic Middleware**: Capture admin actions automatically
- **Comprehensive API**: Full REST API for audit management

## Security Architecture

### Cryptographic Chaining
Each audit log entry contains:
- SHA-256 hash of the current entry
- Reference to the previous entry's hash
- Cryptographic nonce for uniqueness
- Timestamp and metadata

This creates a blockchain-like structure where any modification breaks the chain.

### Stellar Ledger Anchoring
Every 24 hours, the system:
1. Calculates the root hash of all logs for that day
2. Creates a Stellar transaction with the root hash in the memo
3. Anchors the hash permanently on the blockchain
4. Provides indisputable proof of integrity

## Installation

```bash
# Clone the repository
git clone https://github.com/akordavid373/backend.git
cd backend

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Edit .env with your Stellar credentials (optional)
# If not provided, the system will run in simulation mode
```

## Configuration

### Environment Variables

```bash
PORT=3000
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
STELLAR_AUDIT_ACCOUNT_PUBLIC_KEY=your_public_key
STELLAR_AUDIT_ACCOUNT_SECRET_KEY=your_secret_key
DB_PATH=./data/audit.db
```

### Stellar Setup (Optional)

1. Create a Stellar account at [Stellar Laboratory](https://laboratory.stellar.org/)
2. Fund the testnet account with lumens
3. Add credentials to `.env` file
4. If not configured, the system runs in simulation mode

## API Endpoints

### Audit Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/audit/verify` | Verify audit trail integrity |
| GET | `/api/audit/history` | Get audit history with filters |
| POST | `/api/audit/anchor` | Manually anchor daily logs |
| GET | `/api/audit/stellar/account` | Get Stellar account info |
| GET | `/api/audit/chain-integrity` | Check chain integrity |
| GET | `/api/audit/daily-hashes` | Get daily hash records |
| POST | `/api/audit/manual` | Create manual audit entry |

### Vesting Operations (with automatic audit)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/vesting/cliff-date` | Update cliff date (audited) |
| POST | `/api/vesting/beneficiary` | Update beneficiary (audited) |
| POST | `/api/admin/action` | General admin action (audited) |

### System Information

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | System status and features |

## Usage Examples

### Verify Audit Trail
```bash
curl "http://localhost:3000/api/audit/verify?startDate=2024-01-01&endDate=2024-01-31"
```

### Get Audit History
```bash
curl "http://localhost:3000/api/audit/history?actionType=CLIFF_DATE_CHANGE&limit=50"
```

### Update Cliff Date (with audit)
```bash
curl -X POST "http://localhost:3000/api/vesting/cliff-date" \
  -H "Content-Type: application/json" \
  -d '{
    "beneficiaryId": "beneficiary-123",
    "previousCliffDate": "2024-01-01",
    "newCliffDate": "2024-06-01",
    "adminId": "admin-456"
  }'
```

### Manual Daily Anchoring
```bash
curl -X POST "http://localhost:3000/api/audit/anchor" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-01-15"
  }'
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Database Schema

### audit_logs table
- `id`: Primary key
- `timestamp`: Entry timestamp
- `action_type`: Type of action performed
- `actor_id`: Who performed the action
- `target_id`: Target of the action
- `old_data`: Previous state (JSON)
- `new_data`: New state (JSON)
- `hash`: Cryptographic hash of entry
- `previous_hash`: Hash of previous entry
- `nonce`: Cryptographic nonce
- `metadata`: Additional metadata (JSON)

### daily_hashes table
- `id`: Primary key
- `date`: Date of the hash
- `root_hash`: Root hash for the day
- `stellar_transaction_id`: Stellar transaction ID
- `anchored_at`: When anchored
- `created_at`: Creation timestamp

## Security Considerations

1. **Immutable Logs**: Once created, logs cannot be modified
2. **Cryptographic Integrity**: Any tampering breaks the hash chain
3. **Blockchain Anchoring**: Stellar provides permanent, verifiable records
4. **Automatic Capture**: Middleware ensures all admin actions are logged
5. **Verification Tools**: Multiple ways to verify system integrity

## Daily Anchoring Process

The system automatically runs a daily job at 2:00 AM UTC:

1. Calculates root hash for the previous day's logs
2. Creates Stellar transaction with root hash in memo
3. Saves transaction ID to database
4. Provides verifiable proof of integrity

## Compliance and Auditing

This system provides:
- **Indisputable Paper Trail**: Cryptographically proven audit logs
- **Tamper Evidence**: Any modification is immediately detectable
- **Blockchain Proof**: Stellar anchoring provides external verification
- **Regulatory Compliance**: Meets stringent audit requirements

## Development

### Project Structure
```
backend/
├── models/           # Database models
├── services/         # Business logic services
├── middleware/       # Express middleware
├── routes/           # API routes
├── tests/            # Test files
├── data/             # Database files (auto-created)
└── index.js          # Main application file
```

### Adding New Audit Actions

1. Use the middleware in your routes:
```javascript
const auditMiddleware = require('./middleware/auditMiddleware');

app.post('/api/your-endpoint', 
    auditMiddleware.auditAction('YOUR_ACTION_TYPE'),
    (req, res) => {
        // Your logic here
    }
);
```

2. Or create custom middleware:
```javascript
app.post('/api/custom', 
    auditMiddleware.auditAction(
        'CUSTOM_ACTION',
        (req) => req.user.id,
        (req) => req.params.id,
        (req) => req.body.oldData,
        (req) => req.body.newData
    ),
    (req, res) => {
        // Your logic here
    }
);
```

## License

This project is part of the Vesting Vault system and follows the project's licensing terms.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes with tests
4. Ensure all tests pass
5. Submit a pull request

## Support

For issues related to the audit log system, please create an issue in the repository with the tag `audit-log`.
