// controllers/weatherController.js
const axios = require('axios');

exports.getWeather = async (req, res) => {
  const { location } = req.params;
  const apiKey = process.env.WEATHER_API_KEY;
  
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    );
    
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
};
