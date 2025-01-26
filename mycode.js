//API links

let apis = ['https://api.coindesk.com/v1/bpi/currentprice.json',
'https://open.er-api.com/v6/latest/USD',
'https://open.er-api.com/v6/latest/ARS']

//

document.body.onload = loadPage;

 
let fields = document.querySelectorAll(".tc3"); 


// Let`s load initial page with all views and buttons
function loadPage() {
    // Add a logo to the document
    loadImages();
   

    // Initial API call to display data
    updateRates();

    // Set interval to update data every 10 seconds
    setInterval(updateRates, 10000); 
}

function updateRates() {

    let requests = apis.map((element) => {
        return requestAPI(element)
            .then((data) => {
                let ratevalue;

                if (element.includes("latest/USD")) {
                    ratevalue = data.rates.EUR;
                } else if (element.includes("coindesk")) {
                    ratevalue = data.bpi.USD.rate;
                } else if (element.includes("latest/ARS")) {
                    ratevalue = data.rates.USD;
                }

                let num = apis.indexOf(element);

                let paragraph = fields[num]?.querySelector("p");

                if (paragraph) {
                    paragraph.innerHTML = showText(num, ratevalue);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });

    Promise.all(requests).then(() => {
        updateTime();
    });
}

function updateTime() {
    let now = new Date();
    let formattedTime = now.toLocaleTimeString(); 
    let timeElement = document.getElementById("update-time");

    if (timeElement) {
        timeElement.textContent = `Last update: ${formattedTime}`;
    }
}
    


function showText(index, ratevalue){
    
    const textTemplates = {
        0: "Bitcoin price in USD: ",
        1: "1 USD equals (EUR): ",
        2: "1 ARS equals (USD): ",
    };

    return (textTemplates[index] || "Unknown value: ") + ratevalue;
}


function loadImages() {
    
   
    let column1 = document.getElementById("logo");
    let logoimage = document.createElement("img");
    logoimage.setAttribute("src", "exchange.jpg");
    logoimage.setAttribute("class", "img0");
    column1.appendChild(logoimage);

    // Add Title
    let titlecell = document.querySelector("#tittle");
    let h1 = document.createElement("h1");
    h1.innerHTML = "Current exchange rate";
    titlecell.appendChild(h1);

    

    
    fields.forEach((element,index) => {
        let p = document.createElement("p");
        let imag = document.createElement("img");
        p.setAttribute('class','pp')
        p.textContent=`row2 column${index+1}`
        imag.setAttribute('src',`${index+1}.jpg`)
        imag.setAttribute('class','img1')
        element.appendChild(imag);
        element.appendChild(p);
        
    });
}

async function requestAPI(url) {
    let resp = await fetch(url);
    let dataJson = await resp.json();
    return dataJson;
}
 