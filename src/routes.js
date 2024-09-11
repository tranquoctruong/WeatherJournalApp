const express = require('express');
const axios = require('axios');
const { data } = require('./data');

const router = express.Router();

router.post('/weather', async (req, res) => {
  const { city } = req.body;
  const apiKey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const weatherResponse = await axios.get(url);
    const weatherData = weatherResponse.data;

    const entry = {
      date: new Date().toLocaleDateString(),
      city: weatherData.name,
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description
    };

    data.push(entry);
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

router.get('/journal', (req, res) => {
  res.status(200).json(data);
});

module.exports = router;