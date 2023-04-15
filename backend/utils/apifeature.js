class Apifeature{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    };
    search(){
        const keyword=this.queryStr.keyword?{
            city:{
                $regex:this.queryStr.keyword,
                $options:"i",
            }
        }:{};
        this.query=this.query.find({...keyword});
        return this;
    };

    filter(){
        const querycopy={...this.queryStr};
        const removefield=["keyword","page","limit"];
        removefield.forEach((key)=>delete querycopy[key]);
        let queryStr=JSON.stringify(querycopy);

        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);

        this.query=this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultperpage){
        const currentpage=Number(this.queryStr.page)||1;
        const skip=resultperpage*(currentpage-1);
        this.query=this.query.limit(resultperpage).skip(skip);
        return this;
    }
};

export default Apifeature;