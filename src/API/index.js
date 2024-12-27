export const randomData = async() =>{
    const respo = await fetch('https://randomuser.me/api/',{
        method:'GET'
    })
    return await respo.json()
    }

    
