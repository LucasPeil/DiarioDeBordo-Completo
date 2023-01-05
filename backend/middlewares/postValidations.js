const {body} = require("express-validator")

const createPostValidation = ()=>{
    return[
        body("title").not().equals("undefined").withMessage("O título é um campo obrigatório")
        .isLength({min:3})
        .withMessage("O título precisa ter pelo menos 3 caracteres"),
        body("text").not().equals("undefined").withMessage("Por favor, insira um texto para seu post")
       .isString().withMessage("Seu texto precisa conter letras").isLength({min:10}).withMessage("Seu post precisa ter pelo menos 10 caracteres"),
        /*body("postImages").custom((value, {req})=>{
            if(!req.file){
                throw new Error("Insira pelo menos uma imagem")
            }
            return true
       })*/
       body("usersAllowed").optional(),
       body("postImages").optional(),

    ]
}

const updatePostValidation = ()=>{
    return[
        body("title").optional().isString().withMessage("Insira um título com letras").isLength({min:3})
        .withMessage("O título precisa ter pelo menos 3 caracteres"),
        body("text").optional().isString().withMessage("Seu texto deve conter letras").isLength({min:10})
        .withMessage("Seu post precisa ter pelo menos 10 caracteres"),
        body("postImages").optional().custom((value, {req})=>{
            if(!req.file){
                throw new Error("A imagem é obrigatoria")
            }
            return true
        }),
       // body("usersAllowed").optional().isEmail().withMessage("Digite um email válido")
    ]
}

module.exports={createPostValidation, updatePostValidation}