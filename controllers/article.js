const Article = require('./../models/article.js');
const { formatTime } = require('./../utils/date.js');

const articleController = {
    insert: async function(req,res,next){
        let title = req.body.title;
        let classify_id = Number(req.body.classify_id);
        let content = req.body.content;
        let created_time = new Date();
 
        

        if(!title || !classify_id || !content){
            res.json({
                code:0,
                message:'缺少参数'
            })
            return 
        }


        try {
            const article = await Article.insert({title:title,classify_id:classify_id,content:content,created_time})
            const id = article[0]
            res.json({
                code:200,
                data: { id }
            })
        } catch (error) {
            console.log(error);
            res.json({
                code:0,
                message:'内部错误'
            })
        }
    },
    list: async function(req,res,next){
        try {
            let params = {};

            let classify_id = req.query.classify_id;
     
            if(classify_id){
                params.classify_id = classify_id
            }

            const articles = await Article.joinClassify(params);

            
            const articleDisplay = await articles.map(data=>{

                data.created_time_display = formatTime(data.created_time);
                return data
            })
            console.log(articleDisplay)
            res.json({
                code:200,
                data: articleDisplay
            })
        } catch (error) {
            console.log(error)
            res.json({
                code:0,
                message:'内部错误'
            })
        }
    },
    show: async function(req,res,next){
        try {
            const id = req.params.id;
            const articles = await Article.select({ id });
            const article = articles[0];

            console.log(articles);
            

            res.json({
                code:200,
                data:article
            })
        } catch (error) {
            res.json({
                code:0,
                message:"内部错误哦"
            })
        }
    },
    updata: async function(req,res,next){

        let title = req.body.title;
        console.log(title);
        
        let classify_id = req.body.classify_id;
        let content = req.body.content;
        let id = req.params.id;

        if (!title || !classify_id ||!content) {
            res.json({
                code:0,
                message:'缺少参数'
            })
        }

        try {
            const article = await Article.updata(id,{title,classify_id,content})
            res.json({
                code:200,
                data: article
            })
        } catch (error) {
            res.json({
                code:0,
                message:'内部错误'
            })
        }
    },
    delete: async function(req,res,next){
        let id = req.params.id
        try {
            await Article.delete(id);
            res.json({
                code:200,
                message:'删除成功'
            })
        } catch (error) {
            res.json({
                code:0,
                message:'内部错误'
            })
        }
    }

}

module.exports = articleController;