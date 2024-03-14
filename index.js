console.log("Hi !")

// counting the parameter
let count = 0;

// Utility Function :
// Utility:01
function getDivOneByOne(string){
    let div= document.createElement('div')
    div.innerHTML=string;
    return div.firstElementChild;
}

// Hide the parameter box initially
let parametersBox=document.getElementById('parametersBox')
parametersBox.style.display = 'none';

// When User choose parameter saw Json hide JsonBox
let paramsRadio=document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', ()=>{
    document.getElementById('requestJsonBox').style.display = 'none'
    document.getElementById('parametersBox').style.display = 'block'
})
// When User choose json saw Json hide parameterBox
let jsonRadio=document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', ()=>{
    document.getElementById('parametersBox').style.display = 'none'
    document.getElementById('requestJsonBox').style.display = 'block'
})

// when user add + button 
let addParam = document.getElementById('addParam')
addParam.addEventListener('click', ()=>{
   let params=document.getElementById('params')
    let string = `  <div class="form-row my-2">
                    <label class="col-form-label col-sm-2 " for="inputEmail4">Parameter ${count+2}</label>
                    <div class=" col-md-4 p-1">
                        <input type="text" class="form-control" id="parameterKey${count+2}" placeholder="Parameter ${count+2} Key">
                    </div>
                    <div class="col-md-4 p-1">
                        <input type="text" class="form-control" id="parameterValue${count+2}" placeholder="Parameter ${count+2} Value">
                    </div>
                    <button class="deleteParam my-4 btn btn-primary">Delete</button>
                </div>`

    let paramsElement = getDivOneByOne(string);
    params.appendChild(paramsElement)     
    
    // deleting the parameter when clicking the - buttom
    let deleteParam = document.getElementsByClassName('deleteParam')
    for(item of deleteParam){
        item.addEventListener('click', (e)=>{
            e.target.parentElement.remove();
        })
    }
    
    count++;

})

// when user 'click' the submit button
let submit = document.getElementById('submit')
submit.addEventListener('click', ()=>{
    document.getElementById('responseTextBox').value = 'Please Wait... Fetching Response ...';

    // fetching all the value users has entered------
    let url = document.getElementById('urlField').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    if (contentType == 'params') {
        data = {};
       for (i = 0; i < count+1; i++) {

           if (document.getElementById(`parameterKey${i+1}`) != undefined) {
               let key=document.getElementById(`parameterKey${i+1}`).value
               let value=document.getElementById(`parameterValue${i+1}`).value
               data[key]=value;
             
            }
            Data = JSON.stringify(data);
        

       }
        
    }
     else{
         Data = document.getElementById('requestJsonText').value
     }

     
    // log on the value in console for debuging
    // console.log(url)
    // console.log(requestType)
    // console.log(contentType)
    // console.log(Data)

    // using fetch api for testing get request
     if (requestType == 'GET') {
         fetch(url,{
             method: 'GET'
         })
         .then(response=>response.text())
         .then((text)=>{
             document.getElementById('responseTextBox').value = text;
         })
     }
     else{
        fetch(url,{
            method: 'POST',
            body: Data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then(response=>response.text())
        .then((text)=>{
            document.getElementById('responseTextBox').value = text;
        })
     }



})



