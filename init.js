const mongoose=require('mongoose')

const chat=require('./models/chat')

main()
.then(()=>{
    console.log("Connected succesfully ")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats=[
    {
        from:'sweety',
        to:'bujii',
        msg:'Send me DBMS Question paper',
        created_at:new Date()
    },
    {
        from:'kalyan',
        to:'papa',
        msg:'Good Luck!',
        created_at:new Date()
    },
    {
        from:'dev',
        to:'vijaya',
        msg:'All the best good luck',
        created_at:new Date()
    }
]

chat.insertMany(allChats)
.then((res)=>{
    console.log(res)
})

