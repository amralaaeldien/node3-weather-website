

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = "Loading...."
    const location = search.value
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            console.log(data)

            if (data.error || data.Error){
                messageOne.textContent = ""
                messageTwo.textContent = data.error || data.Error
            } else {
                messageOne.textContent = data.forecast
                messageTwo.textContent = data.full_address
        }})
    })
})