
const searchInput = document.querySelector("[data-search]")


let pokemons = []
searchInput.addEventListener("input", (e) => {
    const value = e.target.value
    pokemons.forEach(pokemon => {
        const isVisible = pokemon.name.includes(value)
        console.log(isVisible)
        if (!isVisible) {
            pokemon.element.classList.add("d-none")
        }
        else {
            pokemon.element.classList.remove("d-none")
        }
    })


})

const pokemonCardTemplate = document.querySelector("[data-pokemon-template]")
const pokemonCardContainer = document.querySelector("[data-pokemon-cards-container]")

// Fetch all the pokemons
fetch("https://pokeapi.co/api/v2/pokemon/?limit=200")
    .then(res => res.json())
    .then(data => {
        const divRow = document.createElement("div")
        divRow.classList.add("row")
        // For each Pokemon, create a card with Bootstrap classed divs
        pokemons = data.results.map(pokemon => {
            const divCol = document.createElement("div")
            divCol.classList.add("col-12", "col-lg-4", "pb-4")
            const card = pokemonCardTemplate.content.cloneNode(true).children[0]
            // console.log(pokemon)
            const id = card.querySelector("[data-pokemon-id")
            const image = card.querySelector("[data-pokemon-image]")
            const name = card.querySelector("[data-pokemon-name]")
            name.textContent = pokemon.name
            // for each Pokemon, get the pokemon image and the color 
            fetch(`${pokemon.url}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    id.textContent = `#${data.id}`
                    image.src = data.sprites.front_default

                    //Fetch pokemon color by id and set card border color accordingly
                    fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`)
                        .then(res => res.json())
                        .then(data => {
                            color = data.color.name
                            card.style.borderColor = color
                        })
                })

            divCol.append(card)
            divRow.append(divCol)
            pokemonCardContainer.append(divRow)

            return { name: pokemon.name, element: divCol }

        })
    })


