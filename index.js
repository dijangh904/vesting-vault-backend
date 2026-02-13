const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({ 
    project: 'Vesting Vault', 
    status: 'Tracking Locked Tokens', 
    contract: 'CD5QF6KBAURVUNZR2EVBJISWSEYGDGEEYVH2XYJJADKT7KFOXTTIXLHU' 
  });
});

app.listen(port, () => console.log('Vesting API running'));
