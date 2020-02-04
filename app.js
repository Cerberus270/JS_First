//Variables
const listaTweets = document.getElementById('lista-tweets');

//Events Listeners
eventListeners();

function eventListeners(){
    //Cuando se envia al formulario
    document.getElementById('formulario').addEventListener('submit',
    agregarTweet);
    //Borrar Tweets
    listaTweets.addEventListener('click', borrarTweet);
    //Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

//Funciones
function agregarTweet(e){
    e.preventDefault();
    //leer el valor del text area
    const tweet = document.getElementById('tweet').value;
    //Verifica si el contenido en el text area esta vacio.
    if(tweet===""){
        alert("Ingrese un texto valido en Tweet");
    }else{
        //Crear Boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        //Crear elemento y anadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        //añade el boton de borrar el tweet
        li.appendChild(botonBorrar);
        //añade el tweet a la lista
        listaTweets.appendChild(li);
        //impresion a consola
        //console.log(tweet);
        //añadir a local storage
        agregarTweetLocalStorage(tweet);
    }
    //Vacia el contenido del text area
    document.getElementById('tweet').value = "";
}

function borrarTweet(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        //alert('Tweet Eliminado');
        borrarTweetLocalStorage(e.target.parentElement.innerText);

    }

    //console.log('Diste Click en la lista');
}

//agregar tweet a local storage

function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    //Añadir el nuevo tweet
    tweets.push(tweet);
    //convetir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//comprobar elementos en local storage
function obtenerTweetsLocalStorage(){
    let tweets;
    //Revisamos los valores de local storage
    if(localStorage.getItem('tweets') === null){
        tweets=[];
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

function localStorageListo(){
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet) {
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        //Crear elemento y anadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        //añade el boton de borrar el tweet
        li.appendChild(botonBorrar);
        //añade el tweet a la lista
        listaTweets.appendChild(li);
    });
}

//Eliminar Tweet Local storage

function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;
    //Eliminar la X del tweet
    tweetBorrar = tweet.substring(0, (tweet.length-1));

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index){
        //console.log(tweet);
        if(tweetBorrar == tweet){
            tweets.splice(index, 1)
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}