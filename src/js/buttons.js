class pagination {
  #parentElement = document.querySelector(".tomorrow");
  #parentElementy = document.querySelector(".yesterday");
  #forecastData;
  #page;
  render(F) {
    this.#forecastData = F.forecast.data;
    this.#page = F.page;
    let markup = this.#generaterMarkup();
    this.#clear();
    //this.#parentElementy.insertAdjacentHTML("afterbegin", markup);
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  #clear() {
    this.#parentElement.innerHTML = "";
  }
  #generaterMarkup() {
    if (this.#page === 0) {
      console.log("fe bokra");
      return `<button class="tomorrow">
      <div class="tomorrow-btn">
         <div class="btn">
          <p class="tomorrow-text">Tomorrow</p>
          <div class="sunrise">
            <ion-icon name="sunny-outline"></ion-icon>
            <p>Sunrise</p>
            <p class="time">5:16 AM</p>
          </div>
          <div class="tomorrow-tempreature">
            <p>High 12 C</p>
          </div>
          <ion-icon class="forward" name="caret-forward-outline"></ion-icon>
          <div class="sunset">
            <ion-icon name="moon-outline"></ion-icon>
            <p>Sunset</p>
            <p class="time">7:23 PM</p>
          </div>
          <div class="tomorrow-tempreature">
            <p>low 12 C</p>
          </div>
        </div> 
      </div> 
    </button> `;
    } else if (this.#page === 1) {
      console.log("wara w odam");
      return `
      <div class="yesterday-btn">
         <div class="btn">
          <p class="yesterday-text">Yesterday</p>
          <div class="sunrise">
            <ion-icon name="sunny-outline"></ion-icon>
            <p>Sunrise</p>
            <p class="time">5:16 AM</p>
          </div>
          <div class="yesterday-tempreature">
            <p>High 12 C</p>
          </div>
          <ion-icon class="backward" name="caret-back-outline"></ion-icon>
          <div class="sunset">
            <ion-icon name="moon-outline"></ion-icon>
            <p>Sunset</p>
            <p class="time">7:23 PM</p>
          </div>
          <div class="yesterday-tempreature">
            <p>low 12 C</p>
          </div>
        </div> 
      </div> 
  
            <div class="tomorrow-btn">
               <div class="btn">
                <p class="tomorrow-text">Tomorrow</p>
                <div class="sunrise">
                  <ion-icon name="sunny-outline"></ion-icon>
                  <p>Sunrise</p>
                  <p class="time">5:16 AM</p>
                </div>
                <div class="tomorrow-tempreature">
                  <p>High 12 C</p>
                </div>
                <ion-icon class="forward" name="caret-forward-outline"></ion-icon>
                <div class="sunset">
                  <ion-icon name="moon-outline"></ion-icon>
                  <p>Sunset</p>
                  <p class="time">7:23 PM</p>
                </div>
                <div class="tomorrow-tempreature">
                  <p>low 12 C</p>
                </div>
              </div> 
            </div> 
       
      `;
    } else if (this.#page === 2) {
      console.log("wara");
      return ` <button class="yesterday">
      <div class="yesterday-btn">
         <div class="btn">
          <p class="yesterday-text">Yesterday</p>
          <div class="sunrise">
            <ion-icon name="sunny-outline"></ion-icon>
            <p>Sunrise</p>
            <p class="time">5:16 AM</p>
          </div>
          <div class="yesterday-tempreature">
            <p>High 12 C</p>
          </div>
          <ion-icon class="backward" name="caret-back-outline"></ion-icon>
          <div class="sunset">
            <ion-icon name="moon-outline"></ion-icon>
            <p>Sunset</p>
            <p class="time">7:23 PM</p>
          </div>
          <div class="yesterday-tempreature">
            <p>low 12 C</p>
          </div>
        </div> 
      </div> 
    </button> 
      `;
    }
  }
}
export default new pagination();
