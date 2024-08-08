const express=require('express')
const app=express()
const port=8080;
const mongoose=require('mongoose')
const methodOverride=require('method-override')

const path=require('path');
const Chat = require('./models/chat');
const chat = require('./models/chat');


app.use(express.static(path.join(__dirname,'/public/css')))
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))


main()
.then(()=>{
    console.log("Connected succesfully ")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get('/',(req,res)=>{
    res.send('Working Root directory')
})

app.get('/chats', async (req,res)=>{
    try{
    let chatData=await Chat.find()
    // console.log(chatData)
    res.render('chat.ejs',{chats:chatData})
    
    }
    catch(err){
        console.log("chats are not found");
        
    }
} )

app.get('/chats/new',(req,res)=>{
    res.render('new.ejs')
})
app.post('/chats',(req,res)=>{
    let{from,msg,to}=req.body;
    let newchat= new chat({
        from:from,
        msg:msg,
        to:to,
        created_at:new Date()
    })
    newchat.save()
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })
    res.redirect('/chats')
})

// update route
app.get('/chats/:id/edit',async (req,res)=>{
    let {id} =req.params
    let newchats= await chat.findById(id)
    res.render('edit.ejs',{newchats})
})

// made changes
app.put('/chats/:id', async (req,res)=>{
    let {id}=req.params;
    let { msg:newMsg }=req.body
    let updatedChat= await chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true}, {new:true})
    console.log(updatedChat)
    res.redirect('/chats')
})

// deleting a chat

app.delete('/chats/:id', async (req,res)=>{
    let {id}=req.params
    let deleteChat= await chat.findByIdAndDelete(id)
    console.log("deleted",deleteChat)
    res.redirect('/chats')
})

app.listen(port,()=>{
    console.log(`App is listening to port ${port}`)
})