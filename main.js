
let covidBaseUrl = "https://covid-api.mmediagroup.fr/v1"
let covidCasos = "/cases"
let recibo = []
let paises = []
let continentes = []
let continentesFiltro = []
let graficoTorta = document.getElementById('graficoTorta').getContext('2d');
let graficoLineas = document.getElementById('graficoLineas').getContext('2d');

// ----------------------------------- Graficos --------------------------------------


let grafico1 = new Chart(graficoLineas, {
    type: 'line',
    data:{
	datasets: [{
		data: [60,18,10, 8],
		label: 'Datos Pais',
        borderColor: 'rgb(144, 12, 62)',},
        {
            data: [50,35,10, 8],
            label: 'Promedio continente',
            borderColor: 'rgb(255, 63, 20)',}],
    labels: ['Confirmados','Recuperados','muertos']},
    options: {responsive: true}
});

let grafico2 = new Chart(graficoTorta, {
    type: 'pie',
    data: {
        labels: [['Asia'],['Europe'],['Africa'],['America del Norte'],['America del sur'],['Oceania']],
        datasets: [{
            label: '',
            borderColor: 'rgb(144, 12, 62)',
            data: [1,2,3,4,5,6],
			backgroundColor: [
				'rgb(87, 24, 69)',
				'rgb(144, 12, 62)',
				'rgb(199, 0, 57)',
				'rgb(255, 87, 51)',
				'rgb(255, 195, 0)',
				'rgb(255, 21, 0)'
			]
        }]
    },
	options: {}
});



// ---------------------------------- Clases/objetos -----------------------------------


class RegionGeografica{
    constructor(){

    }
}

class Pais{
    constructor({country, confirmed, recovered, deaths, population, life_expectancy, continent, capital_city, sq_km_area}){
        this.nombre = country
        this.confirmados = confirmed
        this.recuperados = recovered
        this.muertos = deaths
        this.poblacion = population
        this.expectativa = life_expectancy
        this.continente = continent
        this.capital = capital_city
        this.km2 = sq_km_area
    }
    muestraDatos(){

        if(localStorage.nombre == this.nombre){
            document.getElementById('nombrepais').innerText = localStorage.nombre
            document.getElementById('poblacion').innerText = `${parseInt(localStorage.poblacion).toLocaleString('es-CL')} habs.`
            document.getElementById('confirmados').innerText = parseInt(localStorage.confirmados).toLocaleString('es-CL')
            document.getElementById('recuperados').innerText = parseInt(localStorage.recuperados).toLocaleString('es-CL')
            document.getElementById('muertos').innerText = parseInt(localStorage.muertos).toLocaleString('es-CL')
            document.getElementById('km2').innerText = `${parseInt(localStorage.km2).toLocaleString('es-CL')} km2`
            document.getElementById('expectativa').innerText = `${parseInt(localStorage.expectativa).toLocaleString('es-CL')} años de vida`
            document.getElementById('capital').innerText = localStorage.capital
            
        } else {
        document.getElementById('nombrepais').innerText = this.nombre
        document.getElementById('poblacion').innerText = `${parseInt(this.poblacion).toLocaleString('es-CL')} habs.`
        document.getElementById('confirmados').innerText = parseInt(this.confirmados).toLocaleString('es-CL')
        document.getElementById('recuperados').innerText = parseInt(this.recuperados).toLocaleString('es-CL')
        document.getElementById('muertos').innerText = parseInt(this.muertos).toLocaleString('es-CL')
        document.getElementById('km2').innerText = `${parseInt(this.km2).toLocaleString('es-CL')} km2`
        document.getElementById('expectativa').innerText = `${parseInt(this.expectativa).toLocaleString('es-CL')} años de vida`
        document.getElementById('capital').innerText = this.capital
        grafico1.data.datasets[0].data.length = 0
        grafico1.data.datasets[0].data.push(this.confirmados)
        grafico1.data.datasets[0].data.push(this.muertos)
        grafico1.data.datasets[0].data.push(this.recuperados)
        localStorage.setItem('nombre',this.nombre)
        localStorage.setItem('poblacion',this.poblacion)
        localStorage.setItem('confirmados',this.confirmados)
        localStorage.setItem('recuperados',this.recuperados)
        localStorage.setItem('muertos',this.muertos)
        localStorage.setItem('km2',this.km2)
        localStorage.setItem('expectativa',this.expectativa)
        localStorage.setItem('capital',this.capital)
        }
        
        
        
        continentes.filter((obj) => {
            if(obj.nombre == this.continente){
                obj.muestraDatos()
            }
            grafico2.update()
            grafico1.update()
        })
    }
}

class SubRegion extends RegionGeografica{
    constructor(){

    }
}

class Continente{
    constructor({nombre, confirmados, recuperados, muertos, poblacion, superficie, confirmadosPromedio, recuperadosPromedio, muertosPromedio, poblacionPromedio, superficiePromedio}){
        this.nombre = nombre
        this.confirmados = confirmados   
        this.recuperados = recuperados   
        this.muertos = muertos   
        this.poblacion = poblacion   
        this.superficie = superficie  
        this.confirmadosPromedio = parseInt(confirmadosPromedio)
        this.recuperadosPromedio = parseInt(recuperadosPromedio)
        this.muertosPromedio = parseInt(muertosPromedio)
        this.poblacionPromedio = parseInt(poblacionPromedio)
        this.superficiePromedio = parseInt(superficiePromedio)
    }
    muestraDatos(){
        
        document.getElementById('nombreContinente').innerText = this.nombre
        document.getElementById('poblacionContinente').innerText = `${parseInt(this.poblacion).toLocaleString('es-CL')} habs.`
        document.getElementById('confirmadosContinente').innerText = parseInt(this.confirmados).toLocaleString('es-CL')
        document.getElementById('recuperadosContinente').innerText = parseInt(this.recuperados).toLocaleString('es-CL')
        document.getElementById('muertosContinente').innerText = parseInt(this.muertos).toLocaleString('es-CL')
        document.getElementById('km2Continente').innerText = `${parseInt(this.superficie).toLocaleString('es-CL')} km2`
        localStorage.nombreContinente = this.nombre
        localStorage.poblacionContinente = this.poblacion
        localStorage.confirmadosContinente = this.confirmados
        localStorage.recuperadosContinente = this.recuperados
        localStorage.muertosContinente = this.muertos
        localStorage.superficieContinente = this.superficie
        grafico1.data.datasets[1].data.length = 0
        grafico1.data.datasets[1].data.push(this.confirmadosPromedio)
        grafico1.data.datasets[1].data.push(this.muertosPromedio)
        grafico1.data.datasets[1].data.push(this.recuperadosPromedio)
        
        
        



        
    }
}


//  ---------------------------------- funciones --------------------------------

function creaPaises(pais){
    pais.map((obj) => {
        if(obj.All.country){
            paises.push(new Pais(obj.All))
            document.getElementById('selectorPais').innerHTML+= `<option id="valorSelect" value="${obj.All.country}">${obj.All.country}</option>`
        }
    })
}

function creaContinentes(pais){
    creaContinentesFiltro(pais)
    continentesFiltro.map((obj) =>{
        let continenteC ={
            confirmados: 0,
            recuperados: 0,
            muertos: 0,
            poblacion: 0,
            superficie: 0,
            confirmadosPromedio: 0,
            recuperadosPromedio: 0,
            muertosPromedio:0,
            poblacionPromedio:0,
            superficiePromedio:0,

        }
        let contador = 0
        continenteC.nombre = obj
        pais.map((obj2) => {
            if(obj2.All.continent && obj2.All.continent === obj){
                continenteC.confirmados += obj2.All.confirmed   
                continenteC.recuperados += obj2.All.recovered   
                continenteC.muertos += obj2.All.deaths   
                continenteC.poblacion += obj2.All.population   
                continenteC.superficie += obj2.All.sq_km_area
                contador++   
            }
        })
        continenteC.confirmadosPromedio = continenteC.confirmados/contador
        continenteC.recuperadosPromedio = continenteC.recuperados/contador
        continenteC.muertosPromedio = continenteC.muertos/contador
        continenteC.poblacionPromedio = continenteC.poblacion/contador
        continenteC.superficiePromedio = continenteC.superficie/contador
        continentes.push(new Continente(continenteC))
    })
    grafico2.data.datasets[0].data = continentes.map((obj) => obj.poblacion )
    grafico2.update()
}
    


function creaContinentesFiltro(pais){
    pais.map((obj) =>{
        if(obj.All.continent){
            continentesFiltro.push(obj.All.continent)
        }
    })
    continentesFiltro = Object.keys(continentesFiltro.reduce((contadorContinente, continente)=> {
    contadorContinente[continente] = (contadorContinente[continente] || 0) + 1;
    return contadorContinente;
    },{}))
}

function creaSubcontinentes(){

}

function creaSubcontinentesFiltro(){

}


function buscaPais(paisFiltrado){
    paises.map((obj) => {
        if(obj.nombre == paisFiltrado){
            obj.muestraDatos()
        }
    })
}



function llenaBandera(bandera){
    
    
    
    paises.find((obj) => {
        obj.name == 'bandera.name'
        return obj
    }).bandera = bandera.flag
    document.getElementById('bandera').src = bandera.flag
    localStorage.setItem('bandera',bandera.flag)

    
}

function datosAdicionales(pais){
    fetch(`https://restcountries.eu/rest/v2/name/${pais}`)
    .then((respuesta) => respuesta.json())
    .then((respuesta) => {
        llenaBandera(respuesta[0])
    })
}

function llenaLocalStorage(){

}

function persistencia(){
    if(localStorage.length != 0){
        document.getElementById('nombrepais').innerText = localStorage.nombre
            document.getElementById('poblacion').innerText = `${parseInt(localStorage.poblacion).toLocaleString('es-CL')} habs.`
            document.getElementById('confirmados').innerText = parseInt(localStorage.confirmados).toLocaleString('es-CL')
            document.getElementById('recuperados').innerText = parseInt(localStorage.recuperados).toLocaleString('es-CL')
            document.getElementById('muertos').innerText = parseInt(localStorage.muertos).toLocaleString('es-CL')
            document.getElementById('km2').innerText = `${parseInt(localStorage.km2).toLocaleString('es-CL')} km2`
            document.getElementById('expectativa').innerText = `${parseInt(localStorage.expectativa).toLocaleString('es-CL')} años de vida`
            document.getElementById('capital').innerText = localStorage.capital
            document.getElementById('selectorPais').value = localStorage.nombre
            document.getElementById('bandera').src = localStorage.bandera
            document.getElementById('nombreContinente').innerText = localStorage.nombreContinente
            document.getElementById('poblacionContinente').innerText = `${parseInt(localStorage.poblacionContinente).toLocaleString('es-CL')} habs.`
            document.getElementById('confirmadosContinente').innerText = parseInt(localStorage.confirmadosContinente).toLocaleString('es-CL')
            document.getElementById('recuperadosContinente').innerText = parseInt(localStorage.recuperadosContinente).toLocaleString('es-CL')
            document.getElementById('muertosContinente').innerText = parseInt(localStorage.muertosContinente).toLocaleString('es-CL')
            document.getElementById('km2Continente').innerText = `${parseInt(localStorage.superficieContinente).toLocaleString('es-CL')} km2`
    }
}

function pueblaLocalStorage(){
    if(localStorage.length != 0){
        document.getElementById('localStorage').innerHTML = `
        <div>Pais: ${localStorage.nombre}</div> 
        <div>Capital: ${localStorage.capital}</div>    
        <div>Continente: ${localStorage.nombreContinente}</div>
        <div>Confirmados: ${localStorage.confirmados}</div>
        <div>Recuperados: ${localStorage.recuperados}</div>
        <div>Muertos: ${localStorage.muertos}</div>
        <div>Poblacion: ${localStorage.poblacion}</div>
        <div>Superficie: ${localStorage.km2}</div>
        
    `
    } else {
        document.getElementById('localStorage').innerHTML = `<h3>Selecciona un pais para llenar el localStorage y luego presiona "Traer datos"</h3>`
    }
    
    
}

function limpiaLocalStorage(){
    localStorage.clear()
    document.getElementById('localStorage').innerHTML =``
}



//  ---------------------------------- Main ------------------------------------


fetch(covidBaseUrl + covidCasos)
.then((respuesta) => respuesta.json())
.then((respuesta) => {
    recibo = Object.values(respuesta)
    return recibo
})
.then((respuesta) => {
    creaPaises(respuesta)
    return respuesta
})
.then((respuesta) =>{
    creaContinentes(respuesta)
    return respuesta
})
.then((respuesta) => {
    creaSubcontinentes(respuesta)
    setTimeout(persistencia(),1000)
})


document.addEventListener('change',(e) =>{
    if(e.target.value){
        buscaPais(e.target.value)
        setTimeout(datosAdicionales(e.target.value))
    }
}, false)
