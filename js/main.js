const APIkey=`e2ef74651000426ab5120039241412`;
const baseURL=`https://api.weatherapi.com/v1/`;

const container=document.querySelector("#container");
const searchinput=document.querySelector("#serachInput");
const searchButton = document.querySelector(".btn");



let weatherData={};
const getWeatherData = async(city="Alexandria")=>{
    if(city===0) getWeatherData()
    if(city.length < 3)return;
     
    try{
        let response = await fetch(`${baseURL}forecast.json?key=${APIkey}&q=${city}&days=3`);
        response = await response.json()
        weatherData=response;
        displayWeatherData(weatherData.forecast.forecastday);
         
    }
    catch(error){
        console.log(error)
    }

    //  fetch(`${baseURL}/forecast.json?key=${APIkey}&q=${city}&days=3`).then((response)=>{
    //     return response.json(); 
    //  }).then((response)=>{console.log(response)}).catch((error));


}

getWeatherData()

const getDateDetails = (dates)=>{

    const dateDetails = new Date(dates);

const weakDay = dateDetails.toLocaleDateString("en-US",{weekday:"long"});
const day=dateDetails.toLocaleDateString("en-US",{day:"2-digit"});
const month=dateDetails.toLocaleDateString("en-US",{month:"long"});
        
    return {weakDay, day, month};//objc

}


//array=forcast
const displayWeatherData = (array) => {
    let cartona = '<div class="weather d-flex flex-row flex-wrap col-12">';
    for(let i = 0; i < array.length; i++) {
     const {weakDay, day, month}= getDateDetails(array[i].date)
        if(i === 0) {
            cartona += `
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="item d-flex flex-column flex-wrap">
                        <div class="fo-ho d-flex justify-content-between flex-row w-100">
                         
                            <div class="">${weakDay}</div>
                            <div>${day} ${month}</div>
                        </div>
                        <div class="gr-clr">
                            <div class="city-name">${weatherData.location.name}</div>
                            <div class="grade d-flex justify-content-center align-items-center">${weatherData.current.temp_c}<sup>o</sup>C</div>
                            <div>
                                    <img src="${weatherData.current.condition.icon}" class="w-25 p-2" alt="">
                            </div>
                            <div class="clear">${weatherData.current.condition.text}</div>
                        </div>
                        <div class="weather-icon">
                            <i><img src="img/icon-umberella.png" alt="">${array[i].day.daily_will_it_rain}</i>
                            <i><img src="img/icon-wind.png" alt="">${array[i].day.maxwind_kph}</i>
                            <i><img src="img/icon-compass.png" alt="">${weatherData.current.wind_kph}</i>
                        </div>
                    </div>
                </div>`;
        } 
        else if(i === 1) {
            cartona += `
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="item2 d-flex flex-column flex-wrap">
                        <div class="fo d-flex justify-content-center">
                            <div class="">${weakDay}</div>
                        </div>
                        <i></i>
                        <div class="gr d-flex justify-content-center align-items-center flex-column flex-wrap pt-5">
                            <div>
                              <img src="${array[i].day.condition.icon}" alt="">
                            </div>
                            <div class="grade-max d-flex justify-content-center align-items-center pt-3">${array[i].day.maxtemp_c}<sup>o</sup>C</div>
                            <div class="grade-min d-flex justify-content-center align-items-center pt-3">${array[i].day.mintemp_c}<sup>o</sup>C</div>
                            <div class="Sunny d-flex justify-content-center align-items-center pt-5">${array[i].day.condition.text}</div>
                        </div>
                    </div>
                </div>`;
        }
        else if(i === 2) {
            cartona += `
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="item3 d-flex flex-column flex-wrap">
                        <div class="fo2 d-flex justify-content-center">
                            <div class="">${weakDay}</div>
                        </div>
                        <div class="gr d-flex justify-content-center align-items-center flex-column pt-5">
                            <div>
                              <img src="${array[i].day.condition.icon}" alt="">
                            </div>
                            <div class="grade-max d-flex justify-content-center align-items-center pt-3">${array[i].day.maxtemp_c}<sup>o</sup>C</div>
                            <div class="grade-min d-flex justify-content-center align-items-center pt-3">${array[i].day.maxtemp_c}<sup>o</sup>C</div>
                            <div class="Sunny d-flex justify-content-center align-items-center pt-5">${array[i].day.condition.text}</div>
                        </div>
                    </div>
                </div>`;
        }
    }
    
    cartona += '</div>';
    container.innerHTML = cartona;
}


searchinput.addEventListener('input', function(e) {
    if(e.target.value.length >= 3) {
        getWeatherData(e.target.value);
    }
});

document.querySelector('.btn').addEventListener('click', function() {
    if(searchinput.value.length >= 3) {
        getWeatherData(searchinput.value);
    }
});

window.navigator.geolocation.getCurrentPosition((data)=>{

    getWeatherData(`${data.coords.latitude},${data.coords.longitude}`)
},()=>{
    getWeatherData();
 });    
