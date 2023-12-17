// Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners(){
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem("tweets")) || [];

        console.log(tweets)
        crearHTML();
    })
}




// Funciones
function agregarTweet(e){
    e.preventDefault();

    // TextArea donde el usuario escribe
    const  tweet = document.querySelector('#tweet').value

    // Validacion...

    if(tweet === ""){
        mostrarError("Un mensaje no puede ir vacio")
        return; // Evita que se ejecuten mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet // Si son iguales como tweet: tweet, se puede poner 1 solo
    }

    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];
    console.log(tweets)


    // Una vez agregado vamos a crear el HTML
    crearHTML();

    formulario.reset();

}

// Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error')

    // Insertarlo en el contenido 
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() =>{
        mensajeError.remove();
    }, 2400)

}
// Muestra un listado de los tweets
function crearHTML(){
    // Limpiar la lista antes de volver a crearla
    listaTweets.textContent = ""

    if(tweets.length > 0){
        tweets.forEach(tweet => {

            // Agregar un boton de eliminar
            const btnEliminar = document.createElement('A');
            btnEliminar.classList.add("borrar-tweet")
            btnEliminar.textContent = "X";

            // Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }


            // Crear un nuevo elemento LI
            const li = document.createElement('LI');

            // Añadir el texto del tweet al LI
            li.textContent = tweet.tweet;

            // Asignar el botón
            li.appendChild(btnEliminar);

            // Insertarlo en la lista
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// Agrega los tweets actuales al localStorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

// Elimina el tweet
function borrarTweet(id){
    console.log("borrando", id)
    tweets = tweets.filter(tweet => tweet.id !== id)
    crearHTML();
    console.log(tweets)
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
