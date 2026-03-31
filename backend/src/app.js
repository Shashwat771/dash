const express = require('express');
const dashboardRoutes = require('./routes/dashboard.route');
const chatRoutes = require('./routes/chat.route');

const app = express();

app.use(express.json());

// Register routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/chat', chatRoutes);

module.exports = app;
