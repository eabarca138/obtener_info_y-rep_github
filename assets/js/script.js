const boton = document.getElementById('boton')
boton.addEventListener('click', () =>{
    const nombre = document.getElementById('nombre').value;
    const pagina = document.getElementById('pagina').value;
    const repoPagina = document.getElementById('repoPagina').value;

    const datos = document.getElementById('datos')
    const repositorios = document.getElementById('repositorios')

    const limpiar = () =>{
        repositorios.innerHTML = ""
    }
    limpiar()


    const baseUrl = 'https://api.github.com/users';
    try {
    const request = async (url) => {
        const results = await fetch(url);
        const response = await results.json();
        console.log(response);
        return response
    }
    
    
    const getUser = async () => {
        url = `${baseUrl}/${nombre}`;
        return request(url)
    }
    
    const getRepo = async () => {
        url = `${baseUrl}/${nombre}/repos?page=${pagina}&per_page=${repoPagina}`
        return request(url)
    }
    
    Promise.all([getUser(nombre), getRepo(nombre, pagina, repoPagina)])
    .then(resp => {
        console.log('resp', resp)
        datos.innerHTML = `<img class="avatar ml-5" src="${resp[0].avatar_url}"> <p>Nombre de usuario: ${resp[0].name}</p> <p>Nombre de login: ${resp[0].login}</p> <p>Cantidad de repositorios: ${resp[0].public_repos}</p> <p>Localidad: ${resp[0].location}</p> <p>Tipo de usuario: ${resp[0].type}</p>`
        
        resp[1].map((x) =>{
            const element = x.name
            const element2 = x.html_url
            
            repositorios.innerHTML += `<p><a target="_blank" href="${element2}">${element}</a></p>`
            console.log(element);
        })
    })


} catch (error) {
        console.log('ERROR');
}
})