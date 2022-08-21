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
        data.results.forEach(pokemon => {

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

            pokemonCardContainer.append(card)


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