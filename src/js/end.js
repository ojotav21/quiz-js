const nome = document.querySelector('#nome')
const salvarPlacarBtn = document.querySelector('#salvarPlacarBtn')
const placarFinal = document.querySelector('#placarFinal')
const pontuacaoMaisRecente = localStorage.getItem('pontuacaoMaisRecente')

const highScore = ((JSON.parse(window.localStorage.getItem('ranking'))) || [])

const MAXIMO_DE_RECORDS_PARA_O_RANKING = 5

placarFinal.innerText = pontuacaoMaisRecente

nome.addEventListener('keyup',()=>{
    salvarPlacarBtn.disabled = !nome.value
})

salvarPlacar = (e) =>{
    e.preventDefault()

    const placar = {
        placar: pontuacaoMaisRecente,
        nome: nome.value
    }
    
    highScore.push(placar)
    highScore.sort((a, b) =>{
        return b.placar - a.placar
    })

    highScore.splice(5)

    localStorage.setItem('ranking', JSON.stringify(highScore))

    if(pontuacaoMaisRecente >=7){
        //Levar para a página de aprovado
    window.location.assign('../telas/happy.html')

    } else if(pontuacaoMaisRecente <7){
    window.location.assign('../telas/sad.html')
    }
}
