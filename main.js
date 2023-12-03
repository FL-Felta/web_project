const express = require('express')
const fs = require('fs')
const app = express()
const port = 80
const template = require('./lib/template.js')

app.use(express.static(__dirname+'/'));

app.get("/", function(req, res){
    res.sendfile("about.html");
});

app.get('/aaa', (req, res)=>{
    let {name} = req.query
    fs.readdir('page', (err, files)=>{ //files가 메뉴
        let list = template.list(files)
        fs.readFile(`page/${name}`, 'utf8', (err,data)=>{
            let control = `<a href="/create">create</a> <a href="/update?name=${name}">update</a>
            <form action="/delete_process" method="post">
                <input type="hidden" name="id" value="${name}">
                <button type="submit">delete</button>
            </form>
            `
            if(name === undefined){ //루트 페이지
                name = 'RANKINGBOARD'
                data = '자신의 수익률을 적어주세요! (양심적이게 써주세요 ㅎㅎ)'
                control = `<a href="/create">create</a>`
            }
            const html = template.HTML(name, list, `<h2>${name}</h2><p>${data}</p>`, control)
        res.send(html)
        })
    })
})
app.get('/create', (req, res)=>{
    fs.readdir('page', (err, files)=>{
        const name = 'create'
        const list = template.list(files)
        const data = template.create()
        const html = template.HTML(name, list, data,'')
        res.send(html)
    })
})
app.get('/update', (req, res)=>{
    let {name} = req.query
    fs.readdir('page', (err, files)=>{ //files가 메뉴
        let list = template.list(files)
        fs.readFile(`page/${name}`, 'utf8', (err,content)=>{
            let control = `<a href="/create>create</a> <a href="/update?name=${name}">update</a>
            <form action="/delete_process" method="post">
                <input type="hidden" name="id" value="${name}">
                <button type="submit">delete</button>
            </form>
            `
            const data = template.update(name, content)
            const html = template.HTML(name, list, `<h2>${name}</h2><p>${data}</p>`, control)
        res.send(html)
        })
    })
})
const qs = require('querystring')
app.post('/create_process',(req, res)=>{
    let body = ''
    req.on('data', (data)=>{
        body = body + data
    })
    req.on('end', ()=>{
        const post = qs.parse(body)
        const title = post.title
        const description = post.description
        fs.writeFile(`page/${title}`, description, 'utf8', (err)=>{
            res.redirect(302, `/aaa/?name=${title}`) //처리 후에 다른 곳으로 보냄
        })
    })
})
app.post('/update_process',(req, res)=>{
    let body = ''
    req.on('data', (data)=>{
        body = body + data
    })
    req.on('end', ()=>{
        const post = qs.parse(body)
        const id = post.id 
        const title = post.title
        const description = post.description
        fs.rename(`page/${id}`, `page/${title}`, (err)=>{
            fs.writeFile(`page/${title}`, description, 'utf8', (err)=>{
                res.redirect(302, `/aaa/?name=${title}`)
            })
        })
    })
})
app.post('/delete_process',(req, res)=>{
    let body = ''
    req.on('data', (data)=>{
        body = body + data
    })
    req.on('end', ()=>{
        const post = qs.parse(body)
        const id = post.id
        fs.unlink(`page/${id}`, (err)=>{    
            res.redirect(302, `/aaa`) //처리 후에 홈으로 보냄
        })
    })
})
app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})