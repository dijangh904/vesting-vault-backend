const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    project: 'Vesting Vault', 
    status: 'Tracking Locked Tokens', 
    contract: 'CD5QF6KBAURVUNZR2EVBJISWSEYGDGEEYVH2XYJJADKT7KFOXTTIXLHU' 
  });
});

// Mock vaults data for pagination
const mockAllVaults = Array.from({ length: 1500 }, (_, index) => ({
    id: index + 1,
    type: index % 2 === 0 ? 'advisor' : 'investor',
    locked: Math.floor(Math.random() * 1000) + 100,
    claimable: Math.floor(Math.random() * 100) + 10,
    created_at: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
}));

// Paginated vaults endpoint
app.get('/api/vaults', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    
    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedVaults = mockAllVaults.slice(startIndex, endIndex);
    
    // Calculate pagination metadata
    const totalVaults = mockAllVaults.length;
    const totalPages = Math.ceil(totalVaults / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    
    res.json({
        vaults: paginatedVaults,
        pagination: {
            current_page: page,
            per_page: limit,
            total_vaults: totalVaults,
            total_pages: totalPages,
            has_next_page: hasNextPage,
            has_prev_page: hasPrevPage
        }
    });
});

app.listen(port, () => console.log('Vesting API running'));
