let seuVotoPara = document.querySelector(".d1-title span")
let cargo = document.querySelector(".d1-cargo span")
numeros = document.querySelector(".d1-number")
let desc = document.querySelector(".d1-infos")
let aviso = document.querySelector(".d2")
let lateral = document.querySelector(".d1-right")



let etapaAtual = 0
let numero = ""
let votoBranco = false
let votos = []

function comecarEtapa() {
    let etapa = etapas[etapaAtual]

    let numeroHtml = " "
    numero = ""
    votoBranco = false

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>'
        } else {
            numeroHtml += '<div class="numero"></div>'
        }
    }

    seuVotoPara.style.display = "none"
    cargo.innerHTML = etapa.titulo
    desc.innerHTML = " "
    aviso.style.display = "none"
    lateral.innerHTML = " "
    numeros.innerHTML = numeroHtml
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true
        } else {
            return false
        }
    })

    console.log(candidato)

    if (candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = "block"
        aviso.style.display = "block"
        desc.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`

        let fotosHtml = " "
        // mudando para o map, só besteira mesmo pra ganhar uma camisa
        candidato.map((item) => {
            if (item.small) {
                fotosHtml += `<div class="d1-image small"><img src="images/${item.url}" alt="">${item.legenda}</div>`
            } else {
                fotosHtml += `<div class="d1-image"><img src="images/${item.url}" alt="">${item.legenda}</div>`
            }
        })
        //for (let i in candidato.fotos) {
          //  if (candidato.fotos[i].small) {
            //    fotosHtml += `<div class="d1-image small"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
           // } else {
            //    fotosHtml += `<div class="d1-image"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
           // }
        //}
        lateral.innerHTML = fotosHtml
    } else {
        seuVotoPara.style.display = "block"
        aviso.style.display = "block"
        desc.style.marginTop = "50px";
        desc.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>'
        lateral.style.display = "none"
    }

}

function clicou(tecla) {
    let elementoNumero = document.querySelector(".numero.pisca")
    if (elementoNumero !== null) {
        elementoNumero.innerHTML = tecla
        numero = `${numero}${tecla}`

        elementoNumero.classList.remove("pisca")
        if (elementoNumero.nextElementSibling !== null) {
            elementoNumero.nextElementSibling.classList.add("pisca")
        } else {
            atualizaInterface()
        }
    }
}

function branco() {
    if (numero === "") {
        votoBranco = true
        seuVotoPara.style.display = "block"
        aviso.style.display = "block"
        numeros.innerHTML = ""
        desc.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>'
        desc.style.textAlign = "center"
        lateral.style.display = "none"
    } else {
        alert("para votar em branco não pode ter digitado nenhum número. Aperte CORRIGIR para votar em branco.")
    }
}

function corrige() {
    comecarEtapa()
}

function confirma() {
    let etapa = etapas[etapaAtual]
    let = votoConfirmado = false

    if (votoBranco === true) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })
    }

    if (votoConfirmado) {
        etapaAtual++
        if (etapas[etapaAtual] != undefined) {
            comecarEtapa()
        } else {
            document.querySelector(".tela").innerHTML = '<div class="aviso-gigante">FIM</div>'
            console.log(votos)
        }
    }
}

comecarEtapa()
