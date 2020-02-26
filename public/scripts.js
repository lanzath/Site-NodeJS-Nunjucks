// pega todos os elementos classe = .card
const cards = document.querySelectorAll('.card')

// loop para percorrer elementos com a classe card e manda para seus respectivos id
for (let card of cards) {
    card.addEventListener('click', () => {
        //Pega os atributos id dos elementos a partir do .card
        const videoId = card.getAttribute('id')
        window.location.href = `/video?id=${videoId}`
    })
}