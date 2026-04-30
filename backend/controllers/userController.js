import User from '../models/userModel.js'

export const createUser = async(req,res)=>{

   try{
        const {name,email} = req.body;

        if(!name || !email){
            return res.status(400).json({
                message:"Please fill all the fields"
            })
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message:"User alredy existed with this email"
            });
        }
        
        const user = new User({
            name,
            email
        });

        await user.save();

        return res.status(201).json({
            message:"User Created Successfully",
            user
        });

   }catch(err){
    return res.status(500).json({
        message:err.message
    })
   }

    
}

export const getAllUsers = async(req,res)=>{
    try{
        const users = await User.find();
        
        return res.status(200).json({
            message:"All Users Data",
            users
        })

    }catch(err){
        return res.status(500).json({
            message:`Internal Server Error`
        })
    }
}

export const deleteUser = async(req,res)=>{
    try{
        const user_id = req.params.id;
        
        const existingUser = await User.findById(user_id);
        if(!existingUser){
            return res.status(404).json({
                success:false,
                message:"User Not Fund"
            })
        }
        await User.findByIdAndDelete(user_id);

        return res.status(200).json({
            success:true,
            message:"User deleted successfully"
        });

    }
    catch(err){
        return res.status(500).json({
                success:false,
                message:err.message
            })
    }
}