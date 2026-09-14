require('dotenv').config();
const express = require('express');
const cors = require('express-cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// TODO: Import and use routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/supporters', require('./routes/supporters'));
// app.use('/api/volunteers', require('./routes/volunteers'));
// app.use('/api/targets', require('./routes/targets'));
// app.use('/api/budget', require('./routes/budget'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    status: err.status || 500
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Mi Win Yu Win Campaign API running on port ${PORT}`);
});

module.exports = app;
