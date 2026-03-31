const { generateChatResponse } = require('../services/gemini');

/**
 * Handle natural language queries about dashboard data
 */
const queryData = async (req, res) => {
  try {
    const { question, dashboardData, dataPreview } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    if (!dashboardData) {
      return res.status(400).json({ error: 'Dashboard data is required' });
    }

    // Call Gemini to generate response
    const answer = await generateChatResponse(
      question,
      dashboardData,
      dataPreview
    );

    res.json({
      success: true,
      question,
      answer,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat query error:', error);
    res.status(500).json({
      error: 'Failed to process chat query',
      details: error.message,
    });
  }
};

module.exports = {
  queryData,
};
