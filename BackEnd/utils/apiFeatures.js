class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  customFilter (){
    let match={}
    match.$or = [
      { name: new RegExp(this.queryString.name, 'i') },
      { email: new RegExp(this.queryString.name, 'i') },
      { role: new RegExp(this.queryString.name, 'i') }
  ]
  this.query = this.query.aggregate([{ $match: match }])
  return this
}

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort','orderby', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    let sortBy = this.queryString.sort
    var sortType = (this.queryString.orderby || 'desc').toLowerCase();
    if (sortBy && sortType === 'asc') {
      this.query.sort(sortBy);
    } else if (sortBy && sortType === 'desc') {
      this.query.sort('-' + sortBy);
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIFeatures;