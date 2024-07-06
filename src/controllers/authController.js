//importe de las funciones utilizadas para administrar la db
const db = require('../db/db_connection');

const verifyUser = async(req, res) => {

    //destructuración para poder obtener el usuario y la contraseña
    var {username, password} = req.body;
    
    //obteniendo el usuario de la db en base a la data obtenida en request
    var user =  await db('usr_persons').where({
        username: username,
        password: password,
      })
      .select('id')

      //chequeando si el usuario existe, si no existe se debe controlar el mensaje 
    if(user[0] == undefined || user[0] == [] || user[0] == ''){
        return res.status(404).json({status: 'error', message: 'Usuario no encontrado'})
    }else{        
            //verificando si el usuario encontrado es usuario de sistema
            //en base a estas validaciones se dará una respuesta
            var sysuser = await db('sys_x_persons').where('id', user[0].id)
        
            if(sysuser[0] == undefined || sysuser[0] == [] || sysuser[0] == ''){
                console.log("entra")
                return res.status(201).json({message: `OK, estudiante`, item: 'none'})
            }else{
                console.log("entra")
                return res.status(201).json({message: `OK, usuario de sistema`, item: sysuser})
            }

    }
    

}

module.exports = {
    verifyUser
}