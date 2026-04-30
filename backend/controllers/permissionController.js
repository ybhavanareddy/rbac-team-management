import Permission from '../models/permissionModel.js';

export const createPermission = async(req,res)=>{
    try{
        const {name} = req.body;

        if(!name){
            return res.status(400).json({
                success:false,
                message:"Please fill the required fields"
            });
        }

        const existingPermission = await Permission.findOne({name});
        
        if(existingPermission){
            return res.status(400).json({
                success:false,
                message:"Permission already existed"
            });
        }


        const permission = new Permission({
            name
        });

        await permission.save();

        return res.status(201).json({
            success:true,
            message:"Permission Create Successfully",
            data:permission
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const getAllPermissions = async(req,res)=>{
    try{
        const permissions = await Permission.find().sort({createdAt:-1});

        return res.status(200).json({
            success:true,
            message:"All Permissions Data",
            data:permissions
        })
    }catch(err){
         return res.status(500).json({
            success:false,
            message:err.message
            
        })
    }
}