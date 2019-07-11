const User = require('./../models/user.js');
const authCodeFunc = require('./../utils/authcode.js');

const authController = {

    login: async function(req,res,next){
        let phone = req.body.phone;
        let password = req.body.password;

        if (!phone || !password) {
            res.json({
                code:0,
                data:'不能为空'
            })
            return
        }

        try {
            const users = await User.select({phone:phone,password:password});
            const user = users[0];

            if (user) {
                let auth_Code = phone +'\t'+ password +'\t'+ user.id +'\t';
                auth_Code = authCodeFunc(auth_Code,'ENCODE');

                res.json({
                    code:200,
                    message:'成功',
                    token:auth_Code
                })
            }else{
                res.json({
                    code:0,
                    message:'没有这个用户'
                })
            }

        } catch (error) {
            console.log(error);
            
            res.json({
                code:0,
                message:'系统问题'
            })
        }
    }
}

module.exports = authController ;