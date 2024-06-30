let intentos = 6;
        let palabra;
        
        fetch('https://random-word-api.herokuapp.com/word?length=5&lang=es')
            .then(response => response.json())
            .then(response => {
                palabra = response[0].toUpperCase();
                console.log("Palabra generada:", palabra);
            })
            .catch(err => console.log(err));
        
        window.addEventListener('load', init);
        
        function init() {
            console.log('Esto se ejecuta solo cuando se carga la página web');
        }
        
        const input = document.getElementById("guess-input");
        const button = document.getElementById("guess-button");
        
        button.addEventListener("click", intentar);
        
        function intentar() {
            const INTENTO = leerIntento();
            if (INTENTO === palabra) {
                terminar("<h1>¡GANASTE! 😀</h1>");
                return;
            }
            if (INTENTO.length != 5) {
                alert("Por favor ingresa una palabra de exactamente 5 letras.");
                return;
            }
            for (let i in palabra) {
                if (INTENTO[i] === palabra[i]) {
                    console.log(INTENTO[i], "VERDE");
                } else if (palabra.includes(INTENTO[i])) {
                    console.log(INTENTO[i], "AMARILLO");
                } else {
                    console.log(INTENTO[i], "GRIS");
                }
            }
            intentos--;
            if (intentos === 0) {
                terminar("<h1>¡PERDISTE! 😖</h1>");
            }
            const GRID = document.getElementById("grid");
            const ROW = document.createElement('div');
            ROW.className = 'row';
            for (let i in palabra) {
                const SPAN = document.createElement('span');
                SPAN.className = 'letter';
                if (INTENTO[i] === palabra[i]) {
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = 'green';
                } else if (palabra.includes(INTENTO[i])) {
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = 'yellow';
                } else {
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = 'grey';
                }
                ROW.appendChild(SPAN);
            }
            GRID.appendChild(ROW);
            input.value = '';
        }
        
        function leerIntento() {
            return input.value.toUpperCase();
        }
        
        function terminar(mensaje) {
            const INPUT = document.getElementById("guess-input");
            INPUT.disabled = true;
            const BOTON = document.getElementById("guess-button");
            BOTON.disabled = true;
            let contenedor = document.getElementById('guesses');
            contenedor.innerHTML = mensaje;
        }