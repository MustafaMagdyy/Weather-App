import { API_KEY } from "./config";
export const state = {
  results: {
    current: {},
    forecast: {},
    location: {},
    page: 0,
    date: new Date(),
  },
};

export const loadInfo = async function (latitude, longitude) {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=7&aqi=no&alerts=no`
    );
    const data = await res.json();
    //  console.log(data);
    const current = data.current;
    const forecast = data.forecast;
    const location = data.location;
    state.results.current = {
      temp: current.temp_c,
      wind: current.wind_kph,
      state: current.condition.text,
      icon: current.condition.icon,
      humidity: current.humidity,
      feel: current.feelslike_c,
      pressure: current.pressure_in,
      wind: current.wind_kph,
      vis: current.vis_km,
    };
    state.results.forecast = {
      data: forecast.forecastday,
    };
    state.results.location = {
      country: location.country,
      lat: location.lat,
      lon: location.lon,
      localtime: location.localtime,
      city: location.name,
    };
    // console.log(state.date);
  } catch (err) {
    console.error(`${err}`);
  }
};
export const info = function (page = state.page) {
  state.results.page = page;
  state.results.date = new Date();
  state.results.date.setDate(state.results.date.getDate() + state.results.page);
  return state.results;
};
export const loadSearchresults = async function (query) {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query},&days=7&aqi=no&alerts=no`
    );
    const data = await res.json();
    state.results.page = 0;
    const current = data.current;
    const forecast = data.forecast;
    const location = data.location;
    state.results.current = {
      temp: current.temp_c,
      wind: current.wind_kph,
      state: current.condition.text,
      icon: current.condition.icon,
      humidity: current.humidity,
      feel: current.feelslike_c,
      pressure: current.pressure_in,
      wind: current.wind_kph,
      vis: current.vis_km,
    };
    state.results.forecast = {
      data: forecast.forecastday,
    };
    state.results.location = {
      country: location.country,
      lat: location.lat,
      lon: location.lon,
      localtime: location.localtime,
      city: location.name,
    };

    console.log(state.results);
  } catch (err) {
    console.log(`${err}`);
  }
};
//loadSearchresults("London");
