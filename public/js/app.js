




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent ='from javascript'
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location = search.value
    messageOne.textContent='loading..'
    messageTwo.textContent=''
        fetch('http://13.58.5.96:8081/weather?address='+location).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                     messageOne.textContent=data.error
                } else {
        
                     messageOne.textContent=data.location
                     messageTwo.textContent=data.forecast
            }
        })
    })
    
})