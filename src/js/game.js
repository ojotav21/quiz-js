const questao = document.querySelector('#questao') //Questão
const escolhas = Array.from(document.querySelectorAll('.escolha-text')); //Faça um array de todas as alternativas
const progressText = document.querySelector('#progressText') //Numêro da Questão
const placarText = document.querySelector('#placar') //Placar
const progressBarFull = document.querySelector('#progressBarFull') //Bara cheia

let questaoAtual = {}  //Questão atual
let aceitandoRespostas = true //Aceitando questões
let placar = 0 //placar
let contadorDeQuestoes = 0 //contador de questões
let  questoesDisponiveis = [] //questões disponiveis

let questoes = [
    {
        questao:'Quanto é 2+2?',
        escolha1: '4',
        escolha2: '6',
        escolha3: '17',
        escolha4: '10',
        resposta: 1, 
        //colocaremos a posição da resposta
    },
    {
        questao:'Qual o Jogo que leva a abreviação de LOL?',
        escolha1: 'Call of Duty',
        escolha2: 'Fifa',
        escolha3: 'League of Legends',
        escolha4: 'Valorant',
        resposta: 3,
    },
    {
        questao:'Qual o nome do doce feito com chocolate ao leite e creme de leite misturados?',
        escolha1: 'Beijinho',
        escolha2: 'Brigadeiro',
        escolha3: 'Petit Gâteau',
        escolha4: 'Ganache',
        resposta: 4,
    },
    {
        questao:'O Sri Lanka é um país de qual continente?',
        escolha1: 'América',
        escolha2: 'Europa',
        escolha3: 'África',
        escolha4: 'Ásia',
        resposta: 4,
    },
    {
        questao:'Você não está sozinho quando está com?',
        escolha1: 'Um irmão gêmeo',
        escolha2: 'Um cachorro',
        escolha3: 'Um(a) Namorado(a)',
        escolha4: 'Jesus Cristo',
        resposta: 4,
    },
    {
        questao:'Quantos oceanos tem o planeta Terra?',
        escolha1: '5',
        escolha2: '3',
        escolha3: '4',
        escolha4: '6',
        resposta: 1,
    },
    {
        questao:'Quantos filmes a Marvel lançou até concluir a Saga do Infinito nos cinemas?',
        escolha1: '20',
        escolha2: '21',
        escolha3: '23',
        escolha4: '22',
        resposta: 4,
    },
    {
        questao:'Qual é o nome do apresentador dos Donos da Bola?',
        escolha1: 'Thiago Leifert',
        escolha2: 'Everaldo Marques',
        escolha3: 'Filipe Cury',
        escolha4: 'Craque Neto',
        resposta: 4,
    },
    {
        questao:'Quem é o criador do famigerado bordão;"ih, meteu essa?" ?',
        escolha1: 'Pedro Álvares Cabral',
        escolha2: 'Vasco da Gama',
        escolha3: 'Bartolomeu Dias',
        escolha4: 'Casimiro Míguel',
        resposta: 4,
    },
    {
        questao:'Qual curso venceu a SPF2k19??',
        escolha1: 'Informática',
        escolha2: 'Recursos Humanos',
        escolha3: 'Administração',
        escolha4: 'Ensino Médio',
        resposta: 1,
    }

]

const PONTUACAO_POR_QUESTAO = 1 //Quanto vale cada questão
const TOTAL_DE_QUESTOES = 10 // Alterar para o numero de questões totais,

//Startar o jogo
comecarJogo = ()=>{
    contadorDeQuestoes = 0
    placar = 0
    questoesDisponiveis = [...questoes]
    pegarNovasQuestoes()
}

//Pegar nova questão
pegarNovasQuestoes = () => {
    if(questoesDisponiveis.length === 0 || contadorDeQuestoes > TOTAL_DE_QUESTOES){
        localStorage.setItem('pontuacaoMaisRecente', placar) //Salva o item no banco de dados local. "nome da chave", valor
       
        return window.location.assign('../telas/end.html') //faz com que o navegador carregue o documento na URL especificada e a exiba na janela atual.
    }
    contadorDeQuestoes++
    progressText.innerText = `Questão ${contadorDeQuestoes} de ${TOTAL_DE_QUESTOES}` //innerText -> Retorna somente o texto, sem formatações ou elementos html
    progressBarFull.style.width = `${(contadorDeQuestoes/TOTAL_DE_QUESTOES) *100}%`

    const questaoIndex = Math.floor(Math.random()*questoesDisponiveis.length)
    questaoAtual = questoesDisponiveis[questaoIndex]
    questao.innerText= questaoAtual.questao

    escolhas.forEach(escolha => {
        const numero = escolha.dataset['numero']
        escolha.innerText = questaoAtual['escolha'+ numero]
    })

    questoesDisponiveis.splice(questaoIndex, 1)

    aceitandoRespostas = true
}

escolhas.forEach(escolha => {
    escolha.addEventListener('click', e => {
        if(!aceitandoRespostas) return

        aceitandoRespostas=false
        const escolhaSelecionada = e.target
        const respostaSelecionada = escolhaSelecionada.dataset['numero']

        let classToApply = respostaSelecionada == questaoAtual.resposta ? 'correct': 'incorrect'
        
        if(classToApply === 'correct'){
            incrementScore(PONTUACAO_POR_QUESTAO);
        }

        escolhaSelecionada.parentElement.classList.add(classToApply)

        setTimeout(()=>{
            escolhaSelecionada.parentElement.classList.remove(classToApply)
            pegarNovasQuestoes()
        },1000)
    })
})

incrementScore = num =>{
    placar += num
    placarText.innerText = placar
}

comecarJogo()
