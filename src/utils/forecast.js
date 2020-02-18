const request = require('request')

const forecast = (lat, long, callback)=>{
  const url = 'https://api.darksky.net/forecast/9997dd9cfc317d3e00d03b502a145800/'+lat+','+long

    request({url, json: true}, (error, {body}) =>{
    
    if(error){
       callback("unable to connect to weather services", undefined)
       
    } else if ( body.error ){
       callback("unable to find location", undefined)
    }
    else{
        callback(undefined, body.daily.data[0].summary +" It is currently "+ body.currently.temperature +" degress out. There is a " +body.currently.precipProbability +"% Chance of rain")       
   }
    
    
})  
}

module.exports = forecast