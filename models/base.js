const knex =require('./knex');

class Base {
    constructor(props){
        this.table = props;
    }
//全部
    all(){
        return knex(this.table).select();
    }
//选择
    select(params){
        return knex(this.table).select().where(params)
    }
//创建
    insert(params){
        return knex(this.table).insert(params)
    }

//更改
    updata(id,params){
        return knex(this.table).where('id','=',id).update(params)
    }
//删除
    delete(id){
        return knex(this.table).where('id' , '=' , id).del()
    }
}

module.exports = Base;