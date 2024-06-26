const asyncHandler = require('express-async-handler')
var bcrypt = require('bcryptjs');
const UserModel = require('../Database/UserModel');
const {generateToken,} = require('../Helpers/Jwt')

const signup = asyncHandler(async (req, resp) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        resp.status(404).send({ msg: "Please fill all the fields first" })
    }
    try {
        const userAlreadyExist = await UserModel.findOne({ email })
        if (userAlreadyExist) {
            resp.status(401).send({ msg: "Email Already Exist" })
            return;
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let newUser = new UserModel({
            name,
            email,
            password: hash
        })
        newUser = await newUser.save()
        if (newUser._id) {
            resp.status(200).send({ msg: "User Added Successfully" })
        }
    } catch (error) {
        resp.status(400).send({ msg:error.message })

    }
})

const login = asyncHandler(async (req, resp) => {
    const { email, password } = req.body
    if(!email||!password){
        resp.send({msg:"email or password is missing"})
    }
   try {
    const user = await UserModel.findOne({ email })
    if (user) {
        const compare = bcrypt.compareSync(password, user.password);
        if(compare){
            resp.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
            return
        }   
    }
        resp.status(400).send({msg:"Invalid Id or Password"})
   } catch (error) {
        resp.status(500).send({msg:error.message})
   }
})

module.exports = {
    signup,
    login
}