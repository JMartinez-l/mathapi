const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json()); // Middleware para parsear JSON

app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});