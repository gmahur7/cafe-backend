const {mongoose,Schema}=require('mongoose')

const userSchema=new Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    password:{type:String,required:true,trim:true}
})

const UserModel=mongoose.model('User',userSchema)
module.exports = UserModel;