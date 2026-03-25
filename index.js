require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const auditRoutes = require('./routes/audit');
const auditMiddleware = require('./middleware/auditMiddleware');

app.use('/api/audit', auditRoutes);

app.post('/api/vesting/cliff-date', 
    auditMiddleware.auditCliffDateChanges(),
    (req, res) => {
        res.json({ 
            success: true, 
            message: 'Cliff date updated successfully',
            data: req.body
        });
    }
);

app.post('/api/vesting/beneficiary', 
    auditMiddleware.auditBeneficiaryChanges(),
    (req, res) => {
        res.json({ 
            success: true, 
            message: 'Beneficiary updated successfully',
            data: req.body
        });
    }
);

app.post('/api/admin/action', 
    auditMiddleware.auditAdminActions(),
    (req, res) => {
        res.json({ 
            success: true, 
            message: 'Admin action completed successfully',
            data: req.body
        });
    }
);

app.get('/', (req, res) => {
    res.json({ 
        project: 'Vesting Vault', 
        status: 'Tracking Locked Tokens with Audit Trail', 
        contract: 'CD5QF6KBAURVUNZR2EVBJISWSEYGDGEEYVH2XYJJADKT7KFOXTTIXLHU',
        features: [
            'Tamper-proof audit logging',
            'Cryptographic chain integrity',
            'Stellar ledger anchoring',
            'Event sourcing architecture'
        ],
        endpoints: {
            audit: '/api/audit',
            verification: '/api/audit/verify',
            history: '/api/audit/history',
            anchoring: '/api/audit/anchor',
            'stellar-account': '/api/audit/stellar/account',
            'chain-integrity': '/api/audit/chain-integrity',
            'daily-hashes': '/api/audit/daily-hashes'
        }
    });
});

app.listen(port, () => {
    console.log(`Vesting API running on port ${port}`);
    console.log(`Audit trail system initialized`);
    console.log(`Daily anchoring scheduled for 2:00 AM UTC`);
});
