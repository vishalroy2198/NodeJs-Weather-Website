const express=require('express')
const path=require('path')
const hbs=require('hbs')
const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecasts')
const app=express()
const port=process.env.PORT || 3000
//define paths for express configuration
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>
{
    res.render('index',{
        title:'Weather',
        name:'Vishal Roy'
    })
})
app.get('/about',(req,res)=>
{
    res.render('about',{
        title:'about me',
        name:'Vishal Roy'
    })
})
app.get('/help',(req, res)=>
{
    res.render('help',{
        title:'help',
        name:'Vishal Roy'
    })
})
app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,data={})=>{
        if(error)
        {
            return res.send({error})
        }
        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location:req.query.address
            })
        })
    })
})
app.get('/products',(req,res)=>
{
    if(!req.query.search)
    {
           return res.send({
                error:'You must provide a search term'
            })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>
{
    res.render('4O4',{
        title:'4O4',
        name:'Vishal Roy',
        errorMessage:'Help article not found'
    })
})
app.get('*',(req,res)=>
{
    res.render('4O4',{
        title:'4O4',
        name:'Vishal Roy',
        errorMessage:'Page not found'
    })
})
app.listen(port,()=>
{
   console.log('server is up on the port '+port)
})