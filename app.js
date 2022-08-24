const searchInput = document.querySelector("[data-search]")
searchInput.addEventListener("input", (e) => {
    const value = e.target.value
    console.log(value)
})


const pokemonCardTemplate = document.querySelector("[data-pokemon-template]")
const pokemonCardContainer = document.querySelector("[data-pokemon-cards-container]")



fetch("https://pokeapi.co/api/v2/pokemon")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        console.log(data.results)
        const divRow = document.createElement("div")
        divRow.classList.add("row")
        data.results.forEach(pokemon => {
            const divCol = document.createElement("div")
            divCol.classList.add("col-12", "col-lg-4", "pb-4")
            const card = pokemonCardTemplate.content.cloneNode(true).children[0]
            console.log(pokemon)
            const id = card.querySelector("[data-pokemon-id")
            const image = card.querySelector("[data-pokemon-image]")
            const name = card.querySelector("[data-pokemon-name]")
            name.textContent = pokemon.name

            fetch(`${pokemon.url}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    id.textContent = `#${data.id}`
                    image.src = data.sprites.front_default

                })

            divCol.append(card)
            divRow.append(divCol)
            pokemonCardContainer.append(divRow)


        })


        // console.log(data.sprites)

        // console.log(data.sprites.front_default)

    })


// fetch("https://pokeapi.co/api/v2/pokemon-color/40")
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         console.log(data.name)
//     })