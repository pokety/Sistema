export default function auth(req,res,next){
    const user=req.body.user
    const password=req.body.password
    if(user=="admin" && password=="admin"){
        res.sendFile(path.join(__dirname,'./public/admin.html'))
    }
    else if(user=="user" && password=="user"){
        res.sendFile(path.join(__dirname,'public/normal.html'))
    }
    else res.sendFile(path.join(__dirname,'public/login_failed.html'))
}
