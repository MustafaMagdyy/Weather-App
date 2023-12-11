import * as model from "./model.js";
import weatherView from "./weatherView";
import pagination from "./buttons";
export let dateee = new Date();
dateee =
  "Last Sync: " +
  dateee.getDate() +
  "/" +
  (dateee.getMonth() + 1) +
  "/" +
  dateee.getFullYear() +
  " At " +
  dateee.getHours() +
  ":" +
  dateee.getMinutes();

if (navigator.geolocation) {
  const latitude = navigator.geolocation.getCurrentPosition(async function (
    position
  ) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // loading data
    await model.loadInfo(latitude, longitude);
    const current = model.state.current;
    const forecast = model.state.forecast;
    const location = model.state.location;
    const page = model.state.page;
    // rendering data
    weatherView.render(model.info(0));
    //  console.log(model.state.results);
    //pagination.render(model.state.results);
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}
const contorlPagi = function (goToPage) {
  weatherView.render(model.info(goToPage));
};
const search = async function () {
  try {
    const query = weatherView.getQuery();
    if (!query) return;
    await model.loadSearchresults(query);
    const current = model.state.current;
    const forecast = model.state.forecast;
    const location = model.state.location;
    const page = model.state.page;
    // rendering data
    weatherView.render(model.info(0));
  } catch (err) {
    console.log(`${err}`);
  }
};
const init = function () {
  weatherView.addHandler(contorlPagi);
  weatherView.addHandlerSearch(search);
};
init();
