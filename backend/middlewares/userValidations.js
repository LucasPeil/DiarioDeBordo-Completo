const {body} = require("express-validator")

const createUserValidations = ()=>{
    return [
        body("name"). isString().withMessage("O nome é obrigatorio").isLength({min:2}).withMessage("O nome  precisa ter, no mínimo, 2 caracteres"),
        body("username"). isString().withMessage("O nome do usuário é obrigatorio").isLength({min:4}).withMessage("O nome do usuario precisa ter, no mínimo, 4 caracteres"),
        body("email").isString().withMessage("O email é obirgatório").isEmail().withMessage("Digite um email válido"),
        body("password").isString().withMessage("A senha é um campo obirgatório").isLength({min:6}).withMessage("A senha precisa ter, no mínimo, 6 caracteres"),
        body("confirmPassword").isString().withMessage("A confirmação da senha é obirgatória")
        .custom((value, {req})=>{ 
            if(value != req.body.password){
                throw new Error("As senhas tem de ser iguais")
            }
            return true
        })
    ]
}

const loginValidation = ()=>{
    return [
        body("email").isString().withMessage("O email é obrigatório").isEmail().withMessage("Digite um email válido"),
        body("password").isString().withMessage("A senha é um campo obirgatório")
    ]
}
const userUpdateValidation= ()=>{
    return [
        body("name").optional().isString().isLength({min:2}).withMessage("O nome do usuario precisa ter, no mínimo, 3 caracteres"),
        body("username").optional().isString().isLength({min:4}).withMessage("O nome do usuario precisa ter, no mínimo, 4 caracteres"),
        
      
        

    ]
}
module.exports = {createUserValidations, loginValidation, userUpdateValidation}