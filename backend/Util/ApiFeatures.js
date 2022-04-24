class ApiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
  
    search() {
      const keyword = this.queryStr.keyword ? {
            name: {
              $regex: this.queryStr.keyword,
              $options: "i",
            },
          }
        : {
            
        };
        console.log(keyword);
      this.query = this.query.find({ ...keyword });
      return this;
    }
    // paginatin done with check apis
    pagination(resultPerPage){
      // if page not them current page 1 and typcasting
      const currPage = Number(this.queryStr.page) || 1;
      // e.g in db = 50 prod per page 5
      const skip = resultPerPage * (currPage - 1);
                            //  query = product , limit = 5 , curr =2nd page 
      this.query = this.query.limit(resultPerPage).skip(skip);
      return this;

    }
    }
  module.exports = ApiFeatures;