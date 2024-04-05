const h1Title = document.getElementById("title-evolution")
const pageTitle = document.getElementById("page-title")
const divContent = document.getElementById("content")
const divContentSenior = document.getElementById("div-content")
const header = document.getElementById("header")
const footer = document.getElementById("footer")
const copyright = document.getElementById("copyright")
const img = document.createElement("img")
const description = document.createElement("h2")

const titleSenior = "Página do ";
const evolution = location.search.split('=')[1];
h1Title.textContent = evolution;
pageTitle.textContent = `${titleSenior}${evolution}`;

async function fetchPokemon() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolution.toLowerCase()}`)
    const pokemon = await response.json()
    img.src = pokemon.sprites.front_default
    img.alt = "Evolução do pokemon"
    img.height = 150
    img.width = 150
    description.innerText = `Informações sobre ${evolution}`
    content.appendChild(description)
    content.appendChild(img)
}
fetchPokemon()

function addAccesibilityToElements() {
    header.ariaLabel = "header"
    divContent.ariaLabel = "Main"
    footer.ariaLabel = "Rodapé"
    copyright.ariaLabel = "Copyright"
}