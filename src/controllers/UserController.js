const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const user = await connection('usuarios').select('*');
    
        return response.json(user);
    },

    async create(request, response) {
        const { name, password, whatsapp ,email, tipo } = request.body;

        const id = generateUniqueId();

        await connection('usuarios').insert({
            name, 
            password, 
            whatsapp,
            id,
            email, 
            tipo
        })

        return response.json({ id });
    },

    async update(request, response){
        const { id } = request.params;
        const  { name, password, whatsapp,email } = request.body;

        await connection('usuarios').where('id', id).update({
            name, 
            password, 
            whatsapp,
            email
        });

        return response.status(204).send();
    }
};