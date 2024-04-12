function setVisitas() {
    const visitasSalvas = localStorage.getItem("visitas")
    let visitas = {
        count: 0,
        lastVisit: ""
    }
    if (visitasSalvas) {
        visitas = JSON.parse(visitasSalvas)
    }
    visitas.count++
    visitas.lastVisit = getDataAtual();
    localStorage.setItem("visitas", JSON.stringify(visitas))
}


function getDataAtual() {
    var date = new Date()

    const data = new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
    }).format(date);

    return data;
}

function displayVisit() {
    const visitasSalvas = localStorage.getItem("visitas")
    const quantidadeVezes = JSON.parse(visitasSalvas).count
    const dataAcesso = JSON.parse(visitasSalvas).lastVisit
    const infoVisit = document.createElement("p")
    infoVisit.textContent = `Esta página foi visitada ${quantidadeVezes} vezes. A última visita foi: ${dataAcesso}`
    const rodape = document.getElementsByClassName("rodape")[0]
    const rodape2 = document.getElementsByClassName("rodape")[1]
    rodape.appendChild(infoVisit)
    rodape2.appendChild(infoVisit)
}

document.addEventListener('DOMContentLoaded', function () {
    setVisitas()
    displayVisit()
})
