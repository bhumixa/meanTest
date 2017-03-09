var userSchema = mongoose.Schema({
    id: { type: String},  // user Id (id of tenant)
    name:{ type: String, default: '' },
    password:{ type: String}
});

userSchema.methods.validPassword = function(password) { 
    if(password != this.password){
    	return false
    }else{
    	return true;
    }
}; //check password

module.exports = mongoose.model('User', userSchema, 'user');