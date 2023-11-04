import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    }
});

const Admin = mongoose.models.admins || mongoose.model('admins',adminSchema);

export default Admin;