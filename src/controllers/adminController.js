//importe de las funciones utilizadas para administrar la db
const db = require('../db/db_connection');

const getRequests = async (req, res) => {
    //obteniendo información principal
    const requests = await db.select('*').table('rcrt_all_elements')
                            .limit(10).orderBy('id','asc')

    //obteniendo identificadores de las solicitudes
    const elementsData = requests.map((object) => {
        return object.id
    })

    const complementaryData = await Promise.all(elementsData.map(async (id) => {
        return data = await db('rcrt_elements_data').where('element_id', id)
    }))

    const items = []

    complementaryData.forEach(data => {
        data.forEach(item => items.push(item))
    })

    const sendData = requests.map(request => {
        const data = items.filter((item) => item.element_id === request.id)

        if(data){
            return {...request, data}
        }else{
            return request
        }
    })  

    if (sendData) {
        return res.status(201).json({ "data ": sendData })
    } else {
        return res.status(404).json({ message: 'solicitudes no encontradas' })
    }

}

module.exports = {
    getRequests
}