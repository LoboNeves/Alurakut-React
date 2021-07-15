import { SiteClient } from 'datocms-client'

export default async function receiveRequests(request, response) {

    if(request.method === 'POST') {
        const TOKEN = '73942829e400231770c71a35b9b021';
        const client = new SiteClient(TOKEN);
    
        // Validar os dados, antes de sair cadastrando
        const createdRegist = await client.items.create({
            itemType: "971824", // ID do model de "Communities" criado pelo Dato
            ...request.body,
            /* title: "Comunidade de teste",
            imageUrl: "https://github.com/LoboNeves.png",
            creatorSlug: "Daniel Neves" */
        })
    
        response.json({
            data: 'Algum dado qualquer',
            createdRegist: createdRegist,
        })
        return
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}