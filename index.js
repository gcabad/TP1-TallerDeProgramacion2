const fs = require('fs')

/* --------------------------- Manejo de archivos --------------------------- */
/* -------------------------------- Práctica -------------------------------- */

/* -------- Crear un proyecto que implemente las siguientes funciones ------- */

/* ---------- leerArchivoComoString ---------- */
/* Recibe la ruta del archivo que se quiere leer, y devuelve un único string con todo el contenido del mismo. */

function leerArchivoComoString(ruta) {

    try { 
        return fs.readFileSync(ruta, 'utf-8')
    }
    catch (error) {
        console.log(`Error en operacion sincronica de lectura: ${error.message}`)
    }
}

/* escribirTextoEnArchivo */
/* Recibe una ruta, un texto, y un flag, y graba ese texto en un archivo en la ruta dada. Si el directorio es válido pero el archivo no existe, decide que hacer según el flag: */
/* ------ Con el flag en true, crea el archivo y lo escribe. */
/* ------ Con el flag en false, lanza el error “el archivo no existe”. */

function escribirTextoEnArchivo(ruta, texto, flag) {
    try
    {
        let archivo
        try{
            archivo = fs.readFileSync(ruta, 'utf-8')
        }
        catch
        {
            archivo = null
        }

        if(archivo != null)
        {
            fs.writeFileSync(ruta, texto)
        }
        else if(flag)
        {
            fs.writeFileSync(ruta, texto);
        }
        else{
            throw new Error('El archivo no existe.')
        }
    }
    catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

/* --------------- transformarStringEnArrayDeNumeros ---------------*/
/* Recibe un texto y una secuencia de caracteres que usará como separador. Devuelve un array
con todos los números producto de partir el texto cada vez que aparezca la secuencia
separadora. En el caso de que alguna de las partes no sea numérica, no se incluirá en el
resultado, pero no debe lanzar ningún error. */

function transformarStringEnArrayDeNumeros(texto, secuencia) {
    let array = texto.split(secuencia)
    let resultado = []
    for(let i = 0; i < array.length; i++) {
        if(Number(array[i]))
        {
            resultado.push(Number(array[i]))
        }
    }
    return resultado
}

/* -------------- transformarArrayDeNumerosAUnSoloString -------------- */
/* Recibe un array con strings, y una secuencia de caracteres para usar como separador.
Devuelve un único string que es la unión de todos los strings del array, intercalando la
secuencia separadora entre cada uno.

Ejemplo:
Input: array = [123, 456, 789, 10] , separador = ‘,’
Output: ‘123,456,789,10’ */

function transformarArrayDeNumerosAUnSoloString(array, separador) {
    let resultado = ''
    for(let i = 0; i < array.length; i++) {
        if(i > 0) {
            resultado += separador    
        }
        resultado += array[i]
    }
    return resultado
}

/* --------------- combinarDosArrays --------------- */
/* Recibe dos arrays, ambos con datos de tipo numérico, ambos ordenados en forma ascendente,
y sin repetidos dentro de cada archivo (puede haber repetidos entre un archivo y otro).
Devuelve un nuevo array, que contenga todos los datos de ambos arrays, también ordenados
en forma ascendente, y también sin repetidos.
Ejemplo
Input: array1 = [1, 5, 10] , array2 = [2, 3, 8, 11]
Output: [1, 2, 3, 5, 8, 10, 11] */

function combinarDosArrays(array1, array2) {
    resultado = array1.concat(array2)
    return resultado.sort(function(a, b){return a-b})
}

/* Observación
Si se te ocurrió una solución que requiere poder ordenar un array, pensá en otra forma de
hacerlo. */

function combinarDosArraysSinLLamarAlSort(array1, array2) {
    let resultado = []
    let j = 0
    for(let i = 0; i < array1.length; i++) {
        while(array2[j] < array1[i] && j < array2.length) {
           resultado.push(array2[j])
           j++
        }
        resultado.push(array1[i])
    }
    if(array2.length > j)
    {
        for(j; j < array2.length; j++)
        {
            resultado.push(array2[j])
        }
    }
    return resultado
}


/* --------- combinarNArrays --------- */
/* Igual que la función anterior, solo que ésta recibe un array de arrays de números ordenados en
forma ascendente y sin repetidos, y devuelve un nuevo array, con la combinación de todos los
números de todos los arrays recibidos, también ordenados en forma ascendente, y también sin
repetidos.
Ejemplo
Input: arrays = [[1, 10], [2, 3, 15, 16], [4], [6, 7, 13]]
Output: [1, 2, 3, 4, 6, 7, 10, 13, 15, 16] */

function combinarNArrays(arrays)
{
    let resultado = []
    for(let i = 0; i < arrays.length; i++) {
        resultado = combinarDosArraysSinLLamarAlSort(resultado, arrays[i])
    }
    return resultado
}

function start() {
    console.log(leerArchivoComoString('texto.txt') )
    escribirTextoEnArchivo('texto8.txt', 'hola', false)
    console.log(transformarStringEnArrayDeNumeros('123 | 456 | 789 | 1bc | 10', ' | '))
    console.log(transformarArrayDeNumerosAUnSoloString([123, 456, 789, 10], ','))
    console.log(combinarDosArrays([1, 5, 10] , [2, 3, 8, 11]))
    console.log(combinarDosArraysSinLLamarAlSort([1, 5, 10] , [2, 3, 8, 11]))
    console.log(combinarNArrays([[1, 10], [2, 3, 15, 16], [4], [6, 7, 13]]))
}

start()