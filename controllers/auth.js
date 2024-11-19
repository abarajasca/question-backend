import { request, response } from 'express'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { generateJWT } from '../helpers/jwt.js'

const createUser = async (req = request,res = response)=>{
    const { email, password } = req.body;
    
    try {
        let user = await User.findOne({ email });

        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'Credentials are not valid..'
            });
        }

        user = new User( req.body );
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password,salt);

        await user.save();

        const token = await generateJWT( user.id,user.name);
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Internal Error , please contact administrator"
        })
    }
    
}

const loginUser = async (req,res = response)=>{
    const { email, password } = req.body;
    
    try {
        let user = await User.findOne({ email });

        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'Credential are not valid.'
            });
        }

        // Validate password.
        const validPassword = bcrypt.compareSync(password,user.password);
        if (!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Credential is not valid'
            });
        }

        // Generate JWT Token
        const token = await generateJWT( user.id,user.name );

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token 
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Internal Error , please contact administrator"
        })
    }
    
}


const renewToken = async (req,res = response)=>{
    const { uid, name } = req;

    // Generate JWT Token
    const token = await generateJWT( uid, name );

    res.status(200).json({
        ok: true,        
        token
    })
}


export  {
    createUser,
    loginUser,
    renewToken
};