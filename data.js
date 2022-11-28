require("dotenv").config();
const axios = require("axios");

const fetchGoals = async ({ id, season, league }) => {
  const url = `https://v3.football.api-sports.io/players?id=${id}&season=${season}&league=${league}`;
  const customHeaders = {
    "x-rapidapi-host": process.env.HOST,
    "x-rapidapi-key": process.env.API_KEY,
  };

  const res = await axios.get(url, {
    headers: customHeaders,
  });

  let data = res.data.response[0];
  let image = "some url"; // image when no goals scored
  let goals = data.statistics[0]?.goals?.total || 0;

  if (goals === 1) {
    image = "some url";
    return { 
      result: data,
      image: image,
      totalGoals: goals
    };
  } 
  if (goals > 1 && goals <= 5) {
    image = "some url";
    return { 
      result: data,
      image: image,
      totalGoals: goals
    };
  } 

  if (goals > 5) {
    image = "some url"; // image when no goals scored
    return { 
      result: data,
      image: image,
      totalGoals: goals
    };
  }

  return { 
    result: data,
    image: image,
    totalGoals : goals
  };
};

module.exports = {
  fetchGoals,
};
