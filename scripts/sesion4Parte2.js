/**
 * Muestra las primeras 5 ciudades que empiecen por A ordenadas de manera ascendente, las soluciones deben ser únicas.
 * 
 * Crea una colección a parte, que solo contenga a los contactos de Francia (France) y que tengan entre 18 y 50 años. 
 * Usa una agregación para ello.
 * 
 * Añade un número favorito a cada contacto, luego crea un bucket agrupando por número favorito que separe en 5 segmentos.
 * En la colección de Contatcs, haz una proyección la cual tiene que devolver solo el name y username del contacto.
 * 
 * Haz una consulta en la colección de Contacts la cual devuelva un documento por cada nombre (name) y que sea único, 
 * por apellido (last), tienes que usar el operador $unwind.
 * 
 *Haz una proyección convirtiendo la fecha (date) a un formato DD-MM-AAAA, la nueva variable será fechaNacimiento
 */

 db.contacts.find({city:/^A/}).sort({city:1}).limit(5) 
 db.contacts.aggregate([
{
    $match: {"country": "France"},
    $match: {"age": {$lte:50}},
    $match: {"age": {$lte:50}}
},
{$out:"contactsFrance"}

 ])
 
 ({country:'France'}).forEach(x => db.copiaContacts.insertOne(x))