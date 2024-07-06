const express = require('express');
const app = express();
const port = 3001;

app.get('/api/data', (req, res) => {
    const data = { message: "SxC Intersummit 2024!"};
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});