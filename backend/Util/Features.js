class Features{
    constructor(query,querystr){
        // this mean property both of this class
        this.query = query;
        this.querystr = querystr; //we can access value using same this.querystr anytime 
    }
    search(){
        const keyword = this.querystr.keyword 
        ? {
                // if keyword get then 
                name : {
                    $regex : this.querystr.keyword,
                    $options : "i", //mean caseSensitive
                },
        }:{};
        console.log(`KeyWord : ${keyword}`);
// above we will get keyword
// now  find data from DB no different just used keyword
this.query = this.query.find({ ...keyword });
return this;  //mean retrn same class 
    }
}

module.exports  = Features;