const { cons, first, rest, isEmpty, isList } = require('functional-light');


//Encontrar la length de una lista
/* length: list->number
Hallar la length de una lista
function length(list)
length([1,2,3,4])->4
length([])->0
length([0])->1
*/
function length(list) {
    if(isEmpty(list)) {
        return 0;
    } else {
        return 1 + length(rest(list));
    }
}

/* maxList:list->number
Hallar el número de mayor valor de una lista de números
maxList([1,2,3])->3
maxList([-1,-2,-3])->-1
maxList([1,1])->1*/
function maxList(list) {
    if(length(list) == 1) {
        return first(list);
    } else {
        return Math.max(first(list),maxList(rest(list)));
    }
}

/*minList:list->number
Hallar el número de menor valor de una lista de números
function minList(list)
minList([1,2,3]->1)
minList([-7,-3,0]->-7)
minList([1,1,2,2])->1
*/
function minList (list) {
    if(length(list) == 1) {
        return first(list);
    } else {
        return Math.min(first(list),minList(rest(list)));
    }
}

/*sumAll:list->number 
Sumar todos los elementos de una lista
function sumAll(list)
sumAll([1,2,3])->6
sumAll([0,1])->1
sumAll([1,-1])->0
*/
function sumAll(list) {
    if(length(list) == 1) {
        return first(list);
    } else {
        return first(list) + sumAll(rest(list));
    }
}

/*multiplyAll:list->number 
Multiplica todos los elementos de una lista. S
function multiplyAll(list)
multiplyAll([1,2,3])->6
multiplyAll([0,1])->0
multiplyAll([1,-1,5])->-5
*/ 
function multiplyAll(list) {
    if(length(list)==1) {
        return first(list);
    } else {
        return first(list) * multiplyAll(rest(list));
    }
}

/*average:list->number
Hallar el average de una lista de números
function average(list)
average([1,2,3])->2
average([1,2,3,4,5])->3
*/
function average(list) {
    return sumAll(list) / length(list);
}

/*last:list->number
Halla el último elemento de una lista
last([1,2,3])->3
last([5,8,1,3,0])->0
*/
function last(list) {
    if(length(list) ==1) {
        return first(list);
    } else {
        return last(rest(list));
    }
}

/*pop:list->list
Quita el último elemento de una lista
pop([1,2,3])->[1,2]
pop([4,0,5,9,7])->[4,0,5,9]
*/
function pop(list) {
    if(length(list)==1) {
        return [];
    } else {
        return cons(first(list),pop(rest(list)));
    }
}

/*invert:list->list
Invierte los elementos de una lista
invert([1,2,3])->[3,2,1]
invert([3,2,1])->[1,2,3]
*/
function invert(list) {
    if(length(list)==0) {
        return [];
    } else {
        return cons(last(list),invert(pop(list)));
    }
}

/*removeAllX:list,number->list
Remueve todos los elementos X que se encuentre  en una lista 
removeAllX([1,2,3],2)-> [1,3]
removeAllX([0,2,9,7,1,0], 9) -> [0,2,7,1,0] 
removeAllX([1,1,2,2],2) -> [1,1]
*/
function removeAllX(list,x) {
    if(isEmpty(list)) {
        return [];
    } else if(first(list)==x) {
        return removeAllX(rest(list),x);
    } else {
        return cons(first(list),removeAllX(rest(list),x));
    }
}

/*removeX:list,number->list
Remueve sólo el primer elemento X que se encuentre  en una lista 
removeX([1,2,3],2)-> [1,3]
removeX([0,2,9,7,1,0], 9) -> [0,2,7,1,0] 
removeX([1,1,2,2,2,3],2) -> [1,1,2,2,3]
*/
function removeX(list,x) {
    if(isEmpty(list)) {
        return [];
    } else if(first(list)==x) {
        return removeX(rest(list));
    } else {
        return cons(first(list),removeX(rest(list),x));
    }
}

/*up:list->list
Ordena ascendemente una lista de números
up[4,3,1,2] -> [1,2,3,4]
up[2,1,0,3] -> [0,1,2,3]
*/
function up(list) {
    if(isEmpty(list)) {
        return [];
    } else {
        return cons(minList(list),up(removeX(list,minList(list))));
    }
}

/*nthFibo: number->number
Dada una posición, indica el número que ocupa esa posición en la serie de Fibonacci 
nthFibo(0)->0
nthFibo(1)->1
nthFibo(2)->1
nthFibo(3)->2
*/
function nthFibo(n) {
    if(n==1) {
        return 1;
    } else if(n==0) {
        return 0;
    }
    else {
        return nthFibo(n-1) + nthFibo(n-2);
    }
}

/*push:number,list->list
Añade un elemento X al final de la lista
push(3,[1,2])->[1,2,3]
push(0,[5,7,4,1])->[5,7,4,1,0]
*/
function push(x,list) {
    if(isEmpty(list)) {
        return cons(x,[]);
    } else{
        return cons(first(list),push(x,rest(list)));
    }
}

/*fiboList:number->list
Genera una lista con la cantidad de términos de la sucesión ingresados 
fiboList(3)->[0,1,1]
fiboList(5)->[0,1,1,2,3]
*/
function fiboList(n) {
    if(n<=0) {
        return [];
    } else {
        return push(nthFibo(n-1),fiboList(n-1));
    }
}

/*preserveNumbers:list->list
Eliminar todos los elementos que no sean números de una lista
preserveNumbers([1,"a","b",2])->[1,2]
preserveNumbers([5,1,2,true])->[5,1,2]
*/
function preserveNumbers(list) {
    if(isEmpty(list)) {
        return [];
    }else if(typeof first(list)=='number') {
        return cons(first(list),preserveNumbers(rest(list)));
    } else {
        return preserveNumbers(rest(list));
    }
}
//7. Implemente una función que inserta un elemento x en la posición n de la lista, si n está entre 0 y el (longitud lista). No hace nada en caso contrario.
/*insert:list,number,number->list
Inserta un elemento X en la posición N de una lista, si N está entre cero y la longitud de la lista
insert([1,2,3],4,0)->[4,1,2,3]
insert([1,2,3],4,1)->[1,4,2,3]
insert([1,2,3],4,3)->[1,2,3,4]
insert([1,2,3],4,4)->undefined
*/
function insert(list,x,n) {
    if(n>=0 && n<=length(list)) {
        if(n==0) {
            return cons(x,list);
        } else{
            return cons(first(list),insert(rest(list),x,n-1));
        }
    }
} 

/*existsIn:list,number->boolean
Retorna true si un elemento está en una una lista, en caso contrario retorna false
existsIn([1,2,3],2)->true
existsIn([1,2,3],0)->false
*/
function existsIn(list,x) {
    if(isEmpty(list)) {
        return false;
    } else if(first(list)==x) {
        return true;
    } else {
        return existsIn(rest(list),x);
    }
}

/*searchPlace: list,number,number->number
Retorna el índice que debe tener un número para no desordenar una lista ascendente
searchPlace([1,3,5],0,0)->0
searchPlace([1,3,5],6,0)->3
searchPlace([1,3,5],3,0)->1
*/
function searchPlace(list,x,i) {
    if(isEmpty(list)) {
        return i;
    }else if(x>first(list)) {
        return searchPlace(rest(list),x,i+1);
    } else {
        return i;
    }
}

/* Dada una lista ordenada, implementar una función que retorna el índice n de dónde se encuentra
un número x dado, si existe, o -(n + 1 ), donde n es la posición en la cual se debería insertar x para
mantener la lista ordenada.*/

/*orderIndex:list,number-> number
Recibe una lista (si no está ordenada, la ordena ascendentemente) y retorna el índice del número x en la lista,
o la posición n que debería ocupar para no desordenar la lista.
orderIndex([1,2,3],3)->2
orderIndex([3,2,1],3)->2
orderIndex([1,2,3],2)->1
orderIndex([3,2,1],2)->1
orderIndex([3,2,1],4)->3
*/
function orderIndex(list,x) {
    if(existsIn(list,x)) {
        return index(up(list),x);
    } else {
        return searchPlace(up(list),x,0);
    }
}

// Implemente una función que inserta datos en una lista que siempre está ordenada.
/*orderInsert:list,number->list
Recibe una lista (si está desorganizada, la organiza ascendentemente) e inserta al elemento x en la posición 
correcta para que conserve el orden.
orderInsert([1,2,4],3)->[1,2,3,4]
orderInsert([4,1,2],3)->[1,2,3,4]
orderInsert([1,2],0)->[0,1,2]
*/
function orderInsert(list,x) {
    return insert(up(list),x,orderIndex(list,x));
}

// Implemente una función que busca un elemento en una lista desordenada.
/*index:list,number->number
Hallar el índice de un dato en una lista 
index([1,2,3],2)->1
index([1,0,0,2,2,3],0)->1

index([0,0,0,3],3)->3
*/
function index(list,x) {
    if(isEmpty(list)) {
        return undefined;
    }
    else if(first(list)==x) {
        return 0;
    } else {
        return 1 + index(rest(list),x);
    }
}

// Implemente una función que elimina el elemento n de la lista
/*removeN:list,number->list 
Elimina el enésimo elemento de una lista
removeN([1,2,3],0)->[2,3]
removeN([1,2,3],1)->[1,3]
removeN([1,2,3],2)->[1,2]
removeN([1,2,3],5)->[1,2,3]
*/
function removeN(list,n){
    if(n<length(list) && n>=0) {
        if(n==0) {
            return rest(list);
        } else {
            return cons(first(list),removeN(rest(list),n-1));
        }
    }
    return list;
}
// Concatene dos listas
/*append:list,list->list
Concatena dos listas, en el orden en que cada una tiene sus elementos
append([1,2,3],[4,5,6])->[1,2,3,4,5,6]
append([2,1],[0,0])->[2,1,0,0]
append([],[1,2,3])->[1,2,3]
append([1,2],[])->[1,2]
*/

function append(list1,list2) {
    if(isEmpty(list1)){
        return list2;
    } else {
        return cons(first(list1),append(rest(list1),list2));
    }
}
// Implemente una función que busca todos los números mayores que un cierto valor x. La función debe retornar una lista con los elementos encontrados
/*greaterThan:list,number->list
Retornar una lista con los números mayores que x. Los elementos deben ser retornados en el mismo orden que tienen en la lista
greaterThan([1,2,3,4,5],2)->[3,4,5]
greaterThan([10,20,30,40,50],15)->[20,30,40,50]
*/
function greaterThan(list,x) {
    if(isEmpty(list)){
        return [];
    } else if(x>=first(list)){
        return greaterThan(rest(list),x);
    } else {
        return cons(first(list),greaterThan(rest(list),x));
    }
}

/*lowerThan:list,number->list
Retornar una lista con los números menores que x. Los elementos deben ser retornados en el mismo orden que tienen en la lista
lowerThan([1,2,3,4,5],3)->[1,2]
*/
function lowerThan(list,x) {
    if(isEmpty(list)){
        return [];
    } else if(x<=first(list)){
        return lowerThan(rest(list),x);
    } else {
        return cons(first(list),lowerThan(rest(list),x));
    }
}
/*even:number->booleam
Retorna true si el número ingresado es par, es caso contrario retorna false.
even(4)->true
even(7)->false
*/
function even(x) {
    return x % 2 ==0;
}
//Implemente una función que busca todos los elementos de una lista que cumplen una cierta condición, por ejemplo, los números que sean pares. La función debe retornar una lista con los elementos encontrados
/*search:list,function->list
Arma una lista con todos los elementos de una lista que cumplen una condición que se indica en la función ingresada. La función debe retornarun booleano
search([0,1,2,3,4],even)->[0,2,4]
search([1,1,10,10],even)->[10,10]
*/

function search(list,fx) {
    if(isEmpty(list)) {
        return [];
    } else if(fx(first(list))) {
        return cons(first(list),search(rest(list),fx));
    } else {
        return search(rest(list),fx);
    }
}
/* square:number->number
Eleva un número al cuadrado
square(-1)->1
square(5)->25
*/
function square(x) {
    return x*x;
}
/*15. Implemente una función que aplica una función dada a todos los elementos de una lista(map). Por ejemplo, la función debe ser capaz de elevar todos los elementos de la lista al cuadrado. Ejemplo:
map([1,2,3,4], (x) => x*x)
*/
/*mapeo:list,function->list
Aplica una función a todos los elementos de una lista
mapeo([1,2,3,4],square)->[1,4,9,16]
mapeo([-1,-10],square)->[1,100]
*/
function mapeo(list,fx) {
    if(isEmpty(list)) {
        return [];
    } else {
        return cons(fx(first(list)),mapeo(rest(list),fx));
    }
}

/*down:list->list
Ordena una lista en orden descendente
down([1,2,3])->[3,2,1]
down([5,7,1,0,3,9])->[9,7,5,3,1,0]
*/
function down(list) {
    if(length(list)==1) {
        return list;
    } else {
        return cons(maxList(list),down(removeX(list,maxList(list))));
    }
}

module.exports = {length,maxList,minList,sumAll,average,last,pop,invert,up,down,push,nthFibo,fiboList,preserveNumbers, insert,existsIn,removeX,removeAllX,greaterThan,lowerThan,orderIndex,orderInsert,mapeo,search,removeN,append,searchPlace,orderIndex,orderInsert,index,down,even,square};