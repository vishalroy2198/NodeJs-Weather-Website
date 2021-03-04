const request=require('request')
const forecast=(latitude,longitude,callback)=>
{
    const url='https://api.darksky.net/forecast/a77b37008af2f36c82f64763d020d981/'+latitude+','+longitude+'?units=si&lang=en'
    request({url:url,json:true},(error,response)=>
    {
        if(error)
        {
            callback('unable to connect weather services',undefined)
        }
        else if(response.body.error)
        {
            callback('unable to find weather services',undefined)
        }
        else
        {
            callback(undefined,{
                 temperature:response.body.currently.temperature,
                 summary:response.body.daily.data[0].summary
            })
        }
    })
}
module.exports=forecast