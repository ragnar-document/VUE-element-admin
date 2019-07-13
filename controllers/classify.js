const Classify = require('./../models/classify');

const classifyController ={
    insert: async function(req,res,next){
        let name = req.body.name;
        if(!name){
            res.json({code:0,message:'缺少必要元素'});
            return
        }
        try{
            const classify = await Classify.insert({name}); 
            let id = classify[0];
            res.json({
                code:200,
                data:{id}
            })
        }catch{
            res.json({
                code:0,
                message:'内部错误'
            })
        }
    },
    list: async function(req,res,next){
        
        try{
            const classify = await Classify.all()
            
            res.json({
                code:200,
                data:classify
            })
        }catch{
            res.json({
                code:0,
                message:'内部错误'
            })
        }
    },
    update: async function(req,res,next) {
        let name = req.body.name;
        let id = req.params.id;
        console.log(1213231313123123);
        if(!name){
          res.json({ code: 0, message: '缺少必要参数' });
          return
        }
    
        try{
          const classify = await Classify.updata( id ,{  name });
          res.json({ 
            code: 200, 
            data: classify
          })
        }catch(e){
          console.log(e)
          res.json({ 
            code: 0,
            message: '内部错误'
          })
        }
      },
    delete: async function(req,res,next){
        let id = req.params.id;
        try{
            await Classify.delete(id)
            res.json({
                code:200,
                message:'删除成功'
            })
        }catch{
            res.json({
                code:0,
                message:'内部错误'
            })
        }
    }
}

module.exports = classifyController;