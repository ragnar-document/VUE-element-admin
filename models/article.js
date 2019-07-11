const Knex = require('./knex');
const Base = require('./base');

class Article extends Base{
    constructor(props = 'article'){
        super(props)
    }

    joinClassify(params={}){
        return Knex('article')
          .leftJoin('classify', 'article.classify_id', '=', 'classify.id')
          .select('article.title',{classify_name: 'classify.name'},'article.created_time','article.id')
          .where(params)
      }
    
}

module.exports = new Article()