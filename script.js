let menuBtn = document.querySelector('.menu')
let aside = document.querySelector('aside')
let nav = document.querySelector('nav')
let main = document.querySelector('main')
let settingP = document.querySelector('.settingP')
let HelpP = document.querySelector('.HelpP')
let ActivityP = document.querySelector('.ActivityP')
let asideFooter = document.querySelector('.asideFooter')
let section = document.querySelector('section')
let inputVal = document.querySelector('.inputVal')
let serBtn = document.querySelector('.serBtn')
let h2 = document.querySelector('h2')
let pGemini = document.querySelector('.pGemini')
let help = document.querySelector('.help')
let activity = document.querySelector('.activity')
let setting = document.querySelector('.setting')
let list = document.querySelector('.list')
let recent = document.querySelector('.recent')
let referessh = document.querySelector('.referessh')



let flag = true;
menuBtn.addEventListener('click',()=>{
    if(flag){
        aside.style.width="140px";
        aside.style.zIndex="9999"
        main.style.width="calc(100%-140px)";
        settingP.style.display="flex"
        ActivityP.style.display="flex"
        recent.style.display="flex"
        HelpP.style.display="flex"
        asideFooter.style.alignItems ="start"
        pGemini.style.paddingLeft ='100px'
        help.style.paddingLeft ='20px'
        activity.style.paddingLeft ='20px'
        setting.style.paddingLeft ='20px'
        list.style.display="flex"
        flag = false;
    }else {
        aside.style.width="70px";
        aside.style.zIndex="0"
        
        recent.style.display="none"
        list.style.display="none"
        pGemini.style.paddingLeft ='0px'
        main.style.width="calc(100%-70px)";
        settingP.style.display="none"
        ActivityP.style.display="none"
        HelpP.style.display="none"
        asideFooter.style.alignItems ="center"
        help.style.paddingLeft ='0px'
        activity.style.paddingLeft ='0px'
        setting.style.paddingLeft ='0px'
        flag = true;
    }

})

const API_KEY = "AIzaSyCcXIoehlfCn6RrhB2BgcGMPRwS7IkmxU8";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

function displayMessage(mess,ques){
    section.innerHTML = ""
    let li = document.createElement('li');
    li.innerText = ques;
    list.appendChild(li);
    let item=`
        <img class="carry" src="./img/download.jpeg" alt="">
            <div class="containt">
                <h4>${ques}</h4>
                <div class="content-Text">
                    <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" alt="">
                    <p>${mess}</p>
                </div>
            </div>
    `
    h2.style.display="none"
    section.innerHTML = item;
    inputVal.value = "";
}

const fetchAPIResponse = async (attempt = 1) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: inputVal.value}]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        return data;
        

    } catch (error) {
        console.log(`Attempt ${attempt} failed:`, error);

    };
}




const generateAPIresponse = async (incomingMessageDiv) => {
    if(inputVal.value === ""|| inputVal.value === undefined){
        return;
    }
    try {
        const data = await fetchAPIResponse();

        console.log('API Response:', data); 

       
        if (data?.candidates && data.candidates.length > 0 && data.candidates[0]?.content?.parts?.[0]?.text) {
            let apiResponse = data.candidates[0].content.parts[0].text;

            // Clean up the response text to remove Markdown formatting
            const cleanedResponse = apiResponse
                .replace(/^(\*\*\*|\s+)/g, '') // Remove leading ***
                .replace(/(\*\*\*|\s+)$/g, '') // Remove trailing ***
                .replace(/\*\*/g, '')          // Remove bold markdown (optional)
                .replace(/\_/g, '')            // Remove underscore markdown (optional)
                .replace(/\n/g, '<br>');       // Replace line breaks with <br> (optional)
            
                displayMessage(cleanedResponse , inputVal.value)
            
        } else {
            console.error("No valid candidates found in the API response");
            textElement.innerHTML = "Sorry, no response from API. Please try again later."; // Handle missing candidates
        }
    } catch (error) {
        console.log(error);
    } 
};

serBtn.addEventListener('click',generateAPIresponse);

referessh.addEventListener('click',()=>{
    section.innerHTML="";
   let item1= `
    <h2 class="name">Hello Sanni...</h2>
   `
   section.innerHTML=item1
   list.innerHTML="";
})