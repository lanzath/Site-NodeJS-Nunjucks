const express = require('express')
const nunjucks = require('nunjucks')
const videos = require('./data')

const server = express()

//Utilização de arquivo estáticos para a estilização e scripts
server.use(express.static('public'))

//Definição de qual tipo de view será utilizado -> njk (nunjucks extension)
server.set('view engine', 'njk')

//Pasta que será utilizada -> views, opção (objeto) -> express
nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

//Retorna no caminho / a renderização da view index.html
server.get('/', (req, res) => {
    const about = {
        avatar_url: 'https://avatars0.githubusercontent.com/u/39680004?s=400&v=4',
        name: 'Thiago Lanza',
        role: 'Estudante - Rocketseat',
        description: 'Programador javascript fullstack em formação, foco em aprender desenvolvimento web e mobile. Aluno da <a href="https://rocketseat.com.br" target="_blank">Rocketseat</a>',
        links: [
            { name: 'Github', url: 'https://github.com/lanzath' },
            { name: 'Facebook', url: 'https://www.facebook.com/lanza.mthiago' },
            { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mt-lanza/' }
        ]
    }
    return res.render("about", { about })
})

//retorna no caminho /portfolio a página portfolio.html
server.get('/portfolio', (req, res) => {
    return res.render("portfolio", { items: videos })
})

//rota video, passa a query string para a url e renderiza o conteúdo
server.get('/video', (req, res) => {
    const id = req.query.id

    const video = videos.find((video) => {
        return video.id == id //return true or false
    })

    if (!video) {
        return res.send('Video not found!')
    }

    return res.render('video', { item: video })
})

//server rodando na port 5000
server.listen(5000, () => {
    console.log('server is running')
})