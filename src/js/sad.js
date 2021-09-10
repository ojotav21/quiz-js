function triste (){
    const audio = document.querySelector('audio')
    audio.volume = 0.3
    audio.play()
}

window.addEventListener("keypress", checkKeyPress, false)
function checkKeyPress(key){
        if(key.keyCode == "102"){
            triste()
        }else{
            alert("Pressione a Tecla certa para o Easter-Egg")
        }
}