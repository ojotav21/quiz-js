const highScoreList = document.querySelector('#highScoreList')
const highScore =  JSON.parse(window.localStorage.getItem('ranking')) || []

highScoreList.innerHTML= highScore.map((score)=>{
    return `<li class="high-score">${score.nome} - ${score.placar}</li>`
}).join('')

function LimparHighScore(){
    let resp = confirm("Deseja realmente apagar o Ranking? Essa operção não terá volta")
    if(resp === true){
        localStorage.clear()
        alert("O Ranking foi apagado!")
        window.location.reload()
    }else{
        alert("Agradecemos a sua decisão")
    }
    
}


