const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#message1');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
    msg1.textContent = "Loading....";
    fetch('http://localhost:3000/weatherAPI?city='+location ).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                msg1.textContent = data.error;
            }
            else
            {
                msg1.innerHTML = "<table class='table table-condensed'> <thead> <tr> <th>Name</th> <th>Values</th> </tr> </thead> <tbody> <tr> <td>Place</td> <td>"+data.place_name+"</td> </tr> <tr> <td>Day/Night</td> <td>"+data.DayStatus+"</td> </tr> <tr> <td>Temperature</td> <td>"+data.temp+"</td> </tr> <tr> <td>Chances of rain</td> <td>"+data.HasPrecipitation+"</td> </tr> <tr> <td>Time</td> <td>"+data.LocalObservationDateTime+"</td> </tr> </tbody> </table>";
            }
        })
    });
});


