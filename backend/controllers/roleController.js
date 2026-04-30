import Role from '../models/roleModel.js';
import Permission from '../models/permissionModel.js';


export const createRole = async(req,res)=>{
    try{
        const {name,permissions} = req.body;

        if(!name || !permissions || !Array.isArray(permissions) || permissions.length === 0){
            return res.status(400).json({
                success:false,
                message:"Please fill the require fileds"
            })
        }

        //validate ids 
        const permissionDocs = await Permission.find({
            _id:{$in:permissions}
        });

        if(permissionDocs.length !== permissions.length){
            return res.status(400).json({
                success:false,
                message:"Invalid permissions are provided"
            });
        }

        const existingRole = await Role.findOne({name})
        if(existingRole){
            return res.status(400).json({
                success:false,
                message:"This role is alredy existed"
            });
        }

        const role = new Role({
            name,
            permissions
        });

        await role.save();

        return res.status(201).json({
            success:true,
            message:"Role created Successfully",
            data:role
        });
        
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
            
        });
    }
}

export const getAllRoles = async(req,res)=>{
    try{
        const roles = await Role.find().populate("permissions", "name");


        const formattedRoles = roles.map(role => ({
            _id: role._id,
            name: role.name,
            permissions: role.permissions.map(p => p.name)
        }));

        return res.status(200).json({
           success:true,
           message:"Roles Data Fetched successfully",
            data:formattedRoles
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
}