const path = require('path');
const dbModel = function (path1, path2) {
  var funObj = {};
  const model = path.join(path1, path2)
  //增删改查
  funObj.add = (data, cb) => {
      const result = new model(data);
      result.save(cb);
  };
  funObj.addList = (data, cb) => {
      model.create(data, cb);
  };
  funObj.del = (data, cb) => {
      model
          .remove(data)
          .exec(cb);
  };
  funObj.edit = (data, cb) => {
      data.save(cb);
  };
  funObj.getOne = (data, cb) => {
      model
          .findOne(data.find)
          .select(data.select || {})
          .exec(cb);
  };
  //扩展
  funObj.getCount = (data, cb) => {
      model
          .count(data)
          .exec(cb);
  };
  funObj.getById = (data, cb) => {
      model
          .findById(data.find)
          .select(data.select || {})
          .exec(cb);
  };
  funObj.getList = (data, cb) => {
      model
          .find(data.find)
          .select(data.select || {})
          .sort(data.sort || {})
          .skip(data.skip)
          .limit(data.limit)
          .exec(cb);
  };
  //批量更新
  funObj.update = (data, cb) => {
      model
          .update(data.find, data.set, data.options || {multi: true})
          .exec(cb);
  };
  funObj.group = (data, cb) => {
      model
          .aggregate()
          .match(data.match)
          .group(data.group)
          .exec(cb);
  };

  return funObj;
};

module.exports = dbModel;