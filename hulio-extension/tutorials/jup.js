let step = 1;

let popup = document.createElement("div");

const increment = () => {
    step++
    checkStep()
};

const checkStep = () =>{
    //step 1
    if(step === 1){

        popup.innerHTML = 
            '<div class="popup-safe popup-1">\n' +
                '<p id = "paragraph123456">This website is a dex aggregator, put more simply, it finds you the best rates for trading crypto on Solana. Click here to learn more.</p>\n' +
                '<button id="button-1">Next</button>\n' +
            '</div>'

        document.body.prepend(popup);
        document.getElementById("button-1").onclick = increment
    }


    //step 2
    else if(step === 2){
        popup.innerHTML = 
            '<div class="popup-safe popup-2">\n' +
                '<p id = "paragraph123456">Click the connect wallet button to get started. What does this mean?</p>\n' +
                '<button id="button-1">Next</button>\n' +
            '</div>'
            document.getElementById("button-1").onclick = increment
            const walletButton = document.querySelector('div.px-4.py-3.text-sm.font-semibold.h-full.w-full.leading-none');
            walletButton.style.border = "red 1px solid";
    }

   
    //step 3
    else if(step === 3){
        
    }
}

checkStep()