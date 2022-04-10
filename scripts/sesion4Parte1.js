/**
 * BASE DE DATOS: Pruebas
 * COLECCION: contacts
 * DATOS RANDOM OBTENIDOS DE https://www.mockaroo.com (Archivo https://gitlab.com/masajo/code-verifier-backend/-/tree/main/mocks genera error al importarlo desde mongoCompass: "Operation passed in cannot be an Array")
 *
 * OPERACIONES: 
 * Cambiar a Pruebas como base de datos activa
 * Listar todos los contactos.
 * Busca el primer contacto que sea de Alemania (Germany).
 * Busca todos los contactos que tengan Blake como nombre (first_name).
 * Busca los primeros 5 contactos que tengan como género (gender) hombre (male)
 * Devuelve los 4 primeros contactos ordenados por nombre (name) de manera descendente.
 * Clona la colección de Contacts a CopiaContacts y luego bórrala.
 * Renombra el campo de name por nombre.
 * Borra todos los contactos que tengan como estado (state) Florida.
 */

use Pruebas;
db.contacts.find()
db.contacts.findOne({ country: 'Germany' })
db.contacts.find({ first_name: 'Blake' })
db.contacts.find({ gender: 'Male' }).limit(5)
db.contacts.find().sort({ first_name: -1 }).limit(4)

db.contacts.find().forEach(x => db.copiaContacts.insertOne(x)) // Clona coleccion contacts a CopiaContacts (Recorre salida de funcion find , y por cada elemento lo inserta en la nueva coleccion)
show collections // Muestra colecciones existente
db.copiaContacts.drop() // Borra coleccion CopiaContacts

db.amigos.updateMany({}, { $rename: { firs_name: "nombre" } })

db.contacts.deleteMany({ state: 'Florida' })

 // Ejecutar desde shell de mongodb el siguiente comando para ejecutar este script: load("c:\\scriptmongodb\\creacion.js")