const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 5000; 


app.use(express.json());


app.get('/', (req, res) => {
  res.send('TEST');
});

// Start server
app.listen(port, () => {
  console.log(`✨ Server running on at http://localhost:5000 ✨`);
});
