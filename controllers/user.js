const User = require('./../models/user.js');
const { formatTime } = require('./../utils/date.js');

const userController = {
    insert: async function(req,res,next){
        // let name = req.body.name;
        let phone = req.body.phone;
        let password = req.body.password;
        let created_time = new Date();
        
        if ( !phone || !password) {
            res.json({ code:0,message:'缺少参数'});
            return
        }

        try{
            const user = await User.insert({
                phone,password,created_time
            });
            let id = user[0];
            res.json({
                code:200,
                data:{id}
            })
        }catch(e){
            console.log(e)
            res.json({
                code:0,
                message:'内部错误'
            })
        }
    },
    list: async function(req,res,next){
        try{
            const users = await User.all();
            // console.log(users);
            
            const userDisplay = users.map((data)=>{
                // data.phone_display = formatTime(data.phone);
                return data
            });
            
            res.json({
                code:200,
                data:userDisplay
            })
        }catch(e){
            console.log(e);
            
            res.json({
                code:0,
                message:'内部错误'
            })
        }
    },
    update: async function(req,res,next){
        let name = req.body.name;
        let phone = req.body.phone;
        let password = req.body.password;
        let id = req.body.id;

        if (!name || !phone || !password) {
            res.json({code:0,message:'缺少参数'});
            return
        }

        try{
            const user = await User.updata(id,{
                name,phone,password
            });
            res.json({
                code:200,
                data:user
            })
        }catch{

        }
    },
    delete: async function(req,res,next){
        let id = req.params.id;
        console.log(id)
        try{
            await User.delete(id);
            res.json({
                code:200,
                message:'delete succeed!'
            })

        }catch(e){
            res.json({
                code:0,
                message:'内部错误'
            })
        }
    }
}

module.exports = userController;