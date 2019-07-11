const Classify = require('./../models/classify.js');
const Article = require('./../models/article.js');
const { formatTime } = require('./../utils/date.js');

const classifyContoroller = {
    renderIndex: async function(req,res,next){
        let params = {};
        let classify_id = req.query.classify_id;
        
        if(classify_id){
            params.classify_id = classify_id;
        }

        //通过传入params查找到文章的内容
        const articles = await Article.joinClassify(params)
        const articlesDisplay = articles.map(data=>{
            data.created_time_display = formatTime(data,created_time);
            return data
        })

        //获取所有文章分类
        const classifys = await Classify.all();
        res.locals.classifys = classifys;
        res.locals.classify_id = req.query.classify_id || 0;
        res.locals.articles = articlesDisplay;
        res.render('index');
    },
    renderAritcle: async function(req,res,next){
        let id = req.params.id;
        const articles = await Article.select({id});
        const articlesDisplay = articles.mao(data=>{
            data.created_time_display = formatTime(data.created_time);
            return data
        })
        const article = articlesDisplay[0];
        const classifys = await Classify.all();
        res.locals.classifys = classifys;
        res.locals.classify_id = req.query.classify_id || 0;
        res.locals.article = article;
        res.render('article')
    },

}

module.exports = classifyContoroller