let images;
let contadorImagem = 0;
let totalElements = 0;

const imgElement = document.querySelector("img")
imgElement.addEventListener("click", function () {
    if (totalElements == contadorImagem) {
        contadorImagem = 0
        const index = contadorImagem
        imgElement.src = images[index]
    } else {
        const index = contadorImagem
        imgElement.src = images[index]
        contadorImagem++
    }
})

function changePageTitle(title) {
    document.title = title
}

function generateInfoSection(src, pokemonName) {
    const h2 = document.createElement('h2')
    h2.id = "info-pokemon-label"
    h2.textContent = `Informações sobre ${pokemonName}`

    const img = document.querySelector('img')
    img.src = src
    img.alt = `Imagem do pokemon ${pokemonName}`

    const section = document.querySelector('#info-pokemon')

    section.appendChild(h2)
    section.appendChild(img)
}

async function getPokemonData(name) {
    // fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    //   .then((fetchData) => {
    //     return fetchData.json()
    //   })
    //   .then((jsonData) => generateInfoSection(jsonData.sprites.front_default, name))
    //   .catch((error) => console.error(error))

    try {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

        const jsonData = await data.json()

        generateInfoSection(jsonData.sprites.front_default, name)

        const sprites = Object.values(jsonData.sprites)
        const validUrls = sprites.filter(url => url !== null && typeof url === 'string')
        images = validUrls
        totalElements = validUrls.length
    } catch (error) {
        console.error(error)
    }
}

function getSearchParams() {
    // Early return -> Caso location search, não faz nada.
    if (!location.search) {
        return
    }

    // URLSearchParams é uma classe que facilita a manipulação de query strings
    const urlSearchParams = new URLSearchParams(location.search)

    // Pegando o valor do parâmetro name
    const pokemonName = urlSearchParams.get('name')

    changePageTitle(`Pagina do ${pokemonName}`)
    getPokemonData(pokemonName)
}

document.addEventListener('DOMContentLoaded', function () {
    getSearchParams()
})
