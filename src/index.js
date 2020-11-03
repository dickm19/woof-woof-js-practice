document.addEventListener("DOMContentLoaded", () =>{
    const dogSumContainer = document.querySelector("#dog-summary-container")
    const dogFilterBtn = document.querySelector("#good-dog-filter")
    const dogBar = document.querySelector("#dog-bar")
    

    
    
    //function to fetch dogs
    function fetchDogs(){
        return fetch("http://localhost:3000/pups")
        .then(resp => resp.json())
        .then(renderPups)
    }

    //function to render a pup
    function renderPup(pup){

        const pupSpan = document.createElement("span")
        pupSpan.textContent = pup.name
        pupSpan.dataset.id = pup.id
        pupSpan.setAttribute("isGoodDog", pup.isGoodDog)
        dogBar.append(pupSpan)

        //add event listener to pup span
        pupSpan.addEventListener("click", function(){
            displayPupCard(pup)

        })
        
    }


    //function to render all pups
    function renderPups(pups){

        pups.forEach(renderPup)
        
    }

    //function to display a pup's card
    function displayPupCard(pup){

        const card = document.createElement("div")
        card.setAttribute("id", "dog-info")

        const img = document.createElement("img")
        img.src = pup.image

        const h2 = document.createElement("h2")
        h2.textContent = pup.name


        const button = document.createElement("button")

        if (pup.isGoodDog){
            button.textContent = "Good Dog!"
        }else {
            button.textContent = "Bad Dog!"
        }

        card.append(img, h2, button)

        dogSumContainer.append(card)

        button.addEventListener("click", function(){
            if (pup.isGoodDog){
                makeBadDog(pup)
                button.textContent = "Bad Dog!"
                pup.isGoodDog = false
            }else{
                makeGoodDog(pup)
                button.textContent = "Good Dog!"
                pup.isGoodDog = true
            }
        })


    }

    function makeBadDog(pup){
        fetch(`http://localhost:3000/pups/${pup.id}`,{
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                isGoodDog: false
            })
        })
        
    }
    function makeGoodDog(pup){
        fetch(`http://localhost:3000/pups/${pup.id}`,{
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                isGoodDog: true
            })
        })
        
    }

    
    fetchDogs()

})