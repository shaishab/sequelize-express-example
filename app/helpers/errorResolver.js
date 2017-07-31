var _ = require('lodash');

exports.resolve = function(err) {

  var errors = [];

  if(err.name === 'ValidationError') {
    errors = _.flatten(_.map(err.errors, function(items) {
      if(items.name === 'CastError'){
        return getCastErrorMessage(items);
      }else{
        return {message: items.message };  
      }      
    }));
  }else if(err.name === 'CastError'){
    errors.push(getCastErrorMessage(err));    
  }else if(err.name === 'MongoError') {
    if(err.code === 11000) {
      errors.push({message: 'Duplicate index error happened.'});
    }
  }else{
    errors.push({message: err.message});
  }
  return errors;
};

function getCastErrorMessage(item){
  var value = item.value;
  var path = item.path;
  return {message: 'The id value of ' +value+ ' provided for field ' +path+ ' is invalid'};  
}