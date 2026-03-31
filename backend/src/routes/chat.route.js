const express = require('express');
const { queryData } = require('../controllers/chat.controller');

const router = express.Router();

// POST /api/chat/query - Ask natural language question about data
router.post('/query', queryData);

module.exports = router;
