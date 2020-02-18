
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(
    publicDirectoryPath
    ))

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Jeff Hansen'
    })
})
app.get('/help',(req, res)=>{
    res.render('help',{
        help: 'This is my help message',
        title: 'Help',
        name: 'Jeff Hansen'
    })
})


app.get('',(req, res)=>{
   res.render('index',{
       title: 'Weather',
       name: 'Jeff Hansen'
   }) 
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "must provide an address"
        })
    }
    
    geocode( req.query.address,(error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
             error: error
           
        })
        } 
  
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                error: error
            })
            }
            //console.log(location)
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
 })
    
    

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    
    console.log(req.query.search)
    
    res.send({
        products:[]
    })
})

app.get('/help/*',(req, res)=>{
    res.render('error',{
        title: '404',
        errorText: 'Help Article Not found',
        name: 'Jeff Hansen'
    })
})

app.get('*',(req, res)=>{
    res.render('error',{
        title:"404",
        errorText:"Page Not found",
        name:'Jeff Hansen'
    })
})
app.listen(8081, ()=>{
    console.log("server started on port 8081")
})

//set up about
//set up a weather route