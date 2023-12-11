import { dateee } from "./controller";
class WeatherView {
  #parentElement = document.querySelector(".app");
  #search = document.querySelector(".search");
  #searchValue = document.querySelector(".search-bar");
  #currentData;
  #locationData;
  #forecastData;
  #page;
  #date;
  addHandler(handler) {
    this.#parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".c");
      // console.log(btn);
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  getQuery() {
    const query = this.#search.querySelector(".search-in").value;
    // console.log("test");
    this.#clearInput();
    return query;
  }
  addHandlerSearch(handler) {
    this.#search.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
  #clearInput() {
    this.#search.querySelector(".search-in").value = "";
  }
  render(data) {
    this.#currentData = data.current;

    this.#locationData = data.location;

    this.#forecastData = data.forecast;
    this.#date = data.date;

    this.#page = data.page;
    let markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  #clear() {
    this.#parentElement.innerHTML = "";
  }
  #generateMarkup(page) {
    if (this.#page === 0) {
      // console.log(this.#locationData.localtime);

      return ` <button class="yesterday c" disabled="" style="pointer-events: none;>
    <div class="yesterday-btn">
        <div class="btn">
         <p class="yesterday-text">Yesterday</p>
         <div class="sunrise">
           <ion-icon name="sunny-outline"></ion-icon>
           <p></p>
           <p class="time"></p>
         </div>
         <div class="yesterday-tempreature">
           <p> </p>
         </div>
         <ion-icon class="backward" name="caret-back-outline"></ion-icon>
         <div class="sunset">
           <ion-icon name="moon-outline"></ion-icon>
           <p></p>
           <p class="time"></p>
         </div>
         <div class="yesterday-tempreature">
           <p></p>
         </div>
       </div> 
     </div> 
 </button>

 <section class="country">
    <div>
     <p class="country-condition">
       Forecast in <strong class="country-name">${this.#locationData.city}, ${
        this.#locationData.country
      } </strong>
     </p>
     <div class="date">
      ${this.#locationData.localtime}
     </div>
   </div>
   <div class="Days">
       <div class="country-data">
         <div class="tempreature-data">
         <p class="tempreature">${this.#currentData.temp}</p>

         <div class="tempreature-high-low">
           <p class="temp-high">High ${
             this.#forecastData.data[this.#page].day.maxtemp_c
           } C</p>
           <p class="temp-low">Low ${
             this.#forecastData.data[this.#page].day.mintemp_c
           } C</p>
         </div>
       </div> 
       <div class="remaining-data">
         <div class="weather-conditions">
            <p>${this.#currentData.state}</p>
           <p>feels Like ${this.#currentData.feel}</p>
           <p>${this.#forecastData.data[this.#page].day.condition.text}</p> 
         </div>
         <div class="img">
           <img
             src="${this.#currentData.icon}"
             width="80"
             height="80"
             class="sunny-img"
           />
         </div>
       </div>
     </div>
     <div class="conditions">
        <div class="lists">
         <ul class="list">
           <li>
             <div class="list-data">
               <p class="title">Visibility</p>
               <p class="vis">${this.#currentData.vis}</p>
             </div>
           </li>
           <li>
             <div class="list-data">
               <p class="title">Wind</p>
               <p class="vis">${this.#currentData.wind} km/h</p>
             </div>
           </li>
           <li>
             <div class="list-data">
               <p class="title">Humidity</p>
               <p class="vis">${this.#currentData.humidity}%</p>
             </div>
           </li>
           <li>
             <div class="list-data">
               <p class="title">Pressure</p>
               <p class="vis">${this.#currentData.pressure}</p>
             </div>
           </li>
         </ul>
       </div> 
     </div>
     <div class="sun-rise-set">
       <div class="sunrise">
         <ion-icon name="sunny-outline"></ion-icon>
         <p>Sunrise</p>
         <p class="time">${
           this.#forecastData.data[this.#page].astro.sunrise
         }</p>
       </div>
       <div class="sunset">
         <ion-icon name="moon-outline"></ion-icon>
         <p>Sunset</p>
         <p class="time">${this.#forecastData.data[this.#page].astro.sunset}</p>
       </div>
     </div>
   </div>
 </section>

 <button class="tomorrow c"  data-goto= ${this.#page + 1}>
    <div class="tomorrow-btn">
        <div class="btn">
         <p class="tomorrow-text">Tomorrow</p>
         <div class="sunrise">
           <ion-icon name="sunny-outline"></ion-icon>
           <p>Sunrise</p>
           <p class="time">${
             this.#forecastData.data[this.#page + 1].astro.sunrise
           }</p>
         </div>
         <div class="tomorrow-tempreature">
           <p>High ${this.#forecastData.data[this.#page + 1].day.maxtemp_c}</p>
         </div>
         <ion-icon class="forward" name="caret-forward-outline"></ion-icon>
         <div class="sunset">
           <ion-icon name="moon-outline"></ion-icon>
           <p>Sunset</p>
           <p class="time">${
             this.#forecastData.data[this.#page + 1].astro.sunset
           }</p>
         </div>
         <div class="tomorrow-tempreature">
           <p>Low ${this.#forecastData.data[this.#page + 1].day.mintemp_c} C</p>
         </div>
       </div> 
     </div> 
 </button>`;
    } else if (this.#page === 1) {
      //    console.log(this.#date);
      return `<button data-goto= ${this.#page - 1} class="yesterday c">
    <div class="yesterday-btn">
        <div class="btn">
         <p class="yesterday-text">Yesterday</p>
         <div class="sunrise">
           <ion-icon name="sunny-outline"></ion-icon>
           <p>Sunrise</p>
           <p class="time">${
             this.#forecastData.data[this.#page - 1].astro.sunrise
           }</p>
         </div>
         <div class="yesterday-tempreature">
           <p>High ${
             this.#forecastData.data[this.#page - 1].day.maxtemp_c
           } C</p>
         </div>
         <ion-icon class="backward" name="caret-back-outline"></ion-icon>
         <div class="sunset">
           <ion-icon name="moon-outline"></ion-icon>
           <p>Sunset</p>
           <p class="time">${
             this.#forecastData.data[this.#page - 1].astro.sunset
           }</p>
         </div>
         <div class="yesterday-tempreature">
           <p>low ${this.#forecastData.data[this.#page - 1].day.mintemp_c} C</p>
         </div>
       </div> 
     </div> 
 </button>

 <section class="country">
    <div>
     <p class="country-condition">
       Forecast in <strong class="country-name">${this.#locationData.city}, ${
        this.#locationData.country
      } </strong>
     </p>
     <div class="date">
      ${this.#forecastData.data[this.#page].date}
     </div>
   </div>
   <div class="Days">
       <div class="country-data">
         <div class="tempreature-data">
         <p ">Cannot determine the current temp for this day </p>

         <div class="tempreature-high-low">
           <p class="temp-high">High ${
             this.#forecastData.data[this.#page].day.maxtemp_c
           } C</p>
           <p class="temp-low">Low ${
             this.#forecastData.data[this.#page].day.mintemp_c
           } C</p>
         </div>
       </div> 
       <div class="remaining-data">
         <div class="weather-conditions">
            <p>${this.#currentData.state}</p>
           <p>feels Like ${this.#currentData.feel}</p>
           <p>${this.#forecastData.data[this.#page].day.condition.text}</p> 
         </div>
         <div class="img">
           <img
             src="${this.#currentData.icon}"
             width="80"
             height="80"
             class="sunny-img"
           />
         </div>
       </div>
     </div>
     <div class="conditions">
        <div class="lists">
         <ul class="list">
           <li>
             <div class="list-data">
               <p class="title">Visibility</p>
               <p class="vis">${
                 this.#forecastData.data[this.#page].day.avgvis_km
               }</p>
             </div>
           </li>
           <li>
             <div class="list-data">
               <p class="title">Wind</p>
               <p class="vis">${
                 this.#forecastData.data[this.#page].day.maxwind_kph
               } km/h</p>
             </div>
           </li>
           <li>
             <div class="list-data">
               <p class="title">Humidity</p>
               <p class="vis">${
                 this.#forecastData.data[this.#page].day.avghumidity
               }%</p>
             </div>
           </li>
           <li>
             <div class="list-data">
               <p class="title">Pressure</p>
               <p class="vis">${this.#currentData.pressure}</p>
             </div>
           </li>
         </ul>
       </div> 
     </div>
     <div class="sun-rise-set">
       <div class="sunrise">
         <ion-icon name="sunny-outline"></ion-icon>
         <p>Sunrise</p>
         <p class="time">${
           this.#forecastData.data[this.#page].astro.sunrise
         }</p>
       </div>
       <div class="sunset">
         <ion-icon name="moon-outline"></ion-icon>
         <p>Sunset</p>
         <p class="time">${this.#forecastData.data[this.#page].astro.sunset}</p>
       </div>
     </div>
   </div>
 </section>

 <button class="tomorrow c"  data-goto= ${this.#page + 1}>
    <div class="tomorrow-btn">
        <div class="btn">
         <p class="tomorrow-text">Tomorrow</p>
         <div class="sunrise">
           <ion-icon name="sunny-outline"></ion-icon>
           <p>Sunrise</p>
           <p class="time">${
             this.#forecastData.data[this.#page + 1].astro.sunrise
           }</p>
         </div>
         <div class="tomorrow-tempreature">
           <p>High ${this.#forecastData.data[this.#page + 1].day.maxtemp_c}</p>
         </div>
         <ion-icon class="forward" name="caret-forward-outline"></ion-icon>
         <div class="sunset">
           <ion-icon name="moon-outline"></ion-icon>
           <p>Sunset</p>
           <p class="time">${
             this.#forecastData.data[this.#page + 1].astro.sunset
           }</p>
         </div>
         <div class="tomorrow-tempreature">
           <p>Low ${this.#forecastData.data[this.#page + 1].day.mintemp_c} C</p>
         </div>
       </div> 
     </div> 
 </button>`;
    } else if (this.#page === 2) {
      // console.log(this.#date);
      return `<button data-goto= ${this.#page - 1} class="yesterday c">
      <div class="yesterday-btn">
          <div class="btn">
           <p class="yesterday-text">Yesterday</p>
           <div class="sunrise">
             <ion-icon name="sunny-outline"></ion-icon>
             <p>Sunrise</p>
             <p class="time">${
               this.#forecastData.data[this.#page - 1].astro.sunrise
             }</p>
           </div>
           <div class="yesterday-tempreature">
             <p>High ${
               this.#forecastData.data[this.#page - 1].day.maxtemp_c
             } C</p>
           </div>
           <ion-icon class="backward" name="caret-back-outline"></ion-icon>
           <div class="sunset">
             <ion-icon name="moon-outline"></ion-icon>
             <p>Sunset</p>
             <p class="time">${
               this.#forecastData.data[this.#page - 1].astro.sunset
             }</p>
           </div>
           <div class="yesterday-tempreature">
             <p>low ${
               this.#forecastData.data[this.#page - 1].day.mintemp_c
             } C</p>
           </div>
         </div> 
       </div> 
   </button>
  
   <section class="country">
      <div>
       <p class="country-condition">
         Forecast in <strong class="country-name">${this.#locationData.city}, ${
        this.#locationData.country
      } </strong>
       </p>
       <div class="date">
       ${this.#forecastData.data[this.#page].date}
       </div>
     </div>
     <div class="Days">
         <div class="country-data">
           <div class="tempreature-data">
           <p >Cannot determine the current temp for this day </p>
  
           <div class="tempreature-high-low">
             <p class="temp-high"High >${
               this.#forecastData.data[this.#page].day.maxtemp_c
             } C</p>
             <p class="temp-low">Low ${
               this.#forecastData.data[this.#page].day.mintemp_c
             } C</p>
           </div>
         </div> 
         <div class="remaining-data">
           <div class="weather-conditions">
              <p>${this.#currentData.state}</p>
             <p>feels Like ${this.#currentData.feel}</p>
             <p>${this.#forecastData.data[this.#page].day.condition.text}</p> 
           </div>
           <div class="img">
             <img
               src="${this.#currentData.icon}"
               width="80"
               height="80"
               class="sunny-img"
             />
           </div>
         </div>
       </div>
       <div class="conditions">
        <div class="lists">
         <ul class="list">
           <li>
             <div class="list-data">
               <p class="title">Visibility</p>
               <p class="vis">${
                 this.#forecastData.data[this.#page].day.avgvis_km
               }</p>
             </div>
           </li>
           <li>
             <div class="list-data">
               <p class="title">Wind</p>
               <p class="vis">${
                 this.#forecastData.data[this.#page].day.maxwind_kph
               } km/h</p>
             </div>
           </li>
           <li>
             <div class="list-data">
               <p class="title">Humidity</p>
               <p class="vis">${
                 this.#forecastData.data[this.#page].day.avghumidity
               }%</p>
             </div>
           </li>
           <li>
             <div class="list-data">
               <p class="title">Pressure</p>
               <p class="vis">${this.#currentData.pressure}</p>
               </div>
             </li>
           </ul>
         </div> 
       </div>
       <div class="sun-rise-set">
         <div class="sunrise">
           <ion-icon name="sunny-outline"></ion-icon>
           <p>Sunrise</p>
           <p class="time">${
             this.#forecastData.data[this.#page].astro.sunrise
           }</p>
         </div>
         <div class="sunset">
           <ion-icon name="moon-outline"></ion-icon>
           <p>Sunset</p>
           <p class="time">${
             this.#forecastData.data[this.#page].astro.sunset
           }</p>
         </div>
       </div>
     </div>
   </section>
 <button class="tomorrow c" disabled="" style="pointer-events: none;>
    <div class="tomorrow-btn">
        <div class="btn">
         <p class="tomorrow-text">Tomorrow</p>
         <div class="sunrise">
           <ion-icon name="sunny-outline"></ion-icon>
           <p></p>
           <p class="time"></p>
         </div>
         <div class="tomorrow-tempreature">
           <p></p>
         </div>
         <ion-icon class="forward" name="caret-forward-outline"></ion-icon>
         <div class="sunset">
           <ion-icon name="moon-outline"></ion-icon>
           <p></p>
           <p class="time"></p>
         </div>
         <div class="tomorrow-tempreature">
           <p></p>
         </div>
       </div> 
     </div> 
 </button>`;
    }
  }
}
export default new WeatherView();
