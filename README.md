# XAcademyChallenge
Author: Wnorowsky Nicolás


# "OWNFIFA" PROJECT

Un reconocido player de e-sports nos solicita una web donde poder gestionar de forma sencilla los jugadores de su base de datos personal.
Su interés radica particularmente en la posibilidad de visualizar el total de jugadores existentes, encontrar un jugador determinado de una forma sencilla e intuitiva, modificar sus atributos, eliminarlo y poder crear nuevos jugadores customizados e incluso conocer su skill progression a lo largo de los años.
Para ello, nos provee la base de datos con la que compite en torneos de forma oficial, siendo esta una colección de jugadores de ambos sexos en un período que va desde el 2015 al 2023.
Nos comunica además que quisiera contar con un login para limitar el acceso y la posibilidad de agregar a sus colegas y conocidos para permitir su ingreso de forma restrictiva a sólo funcionalidades que muestren información sin posibilidad de alterarla.
Por último, nos comenta que sería oportuno para él poder compartir la base de datos o importar nuevos datos a la misma.


# PROPUESTA

## Objetivo del Sistema de Información

Proporcionar una plataforma centralizada y segura para la gestión y visualización de la base de datos de jugadores de FIFA, facilitando el acceso a información clave, control de modificaciones y seguimiento de la progresión de los jugadores a lo largo del tiempo.


## Requerimientos del usuario

### Requerimientos funcionales

// Actualizar incluye la modificación, consulta y eliminación
// Para los fines de práctica este proyecto, se obviará la consulta, modificación y baja de usuarios planteando sólo la posiblidad del registro


| **Requerimiento Global (RG)**      | **Requerimiento Detallado (RD)**                                                      |
|:-----------------------------------|:--------------------------------------------------------------------------------------|
| **Gestión de jugadores**            | Registrar jugador                                                                     |
|                                     | Actualizar jugador                                                                     |
|                                     | Emitir lista de jugadores                                                             |
|                                     | Generar estadística de progreso de jugador                                             |
| **Gestión de seguridad**            | Iniciar sesión                                                                         |
|                                     | Cerrar sesión                                                                          |
|                                     | Limitar accesos                                                                       |
|                                     | Registrar invitado                                                                      |
| **Gestión de datos**                | Importar base de datos                                                                 |
|                                     | Exportar base de datos                                                                 |
|                                     | Compartir lista filtrada de jugadores                                                           |




### Requerimientos no funcionales

- El acceso a las funcionalidades de modificación debe estar restringido por roles de usuario
- La autenticación de usuarios debe usar protocolos seguros como JWT (JSON Web Tokens)
- El sistema debe estar preparado para añadir más funcionalidades sin una reestructuración importante del código
- La base de datos debe permitir importar/exportar datos en formato CSV
- La interfaz debe ser intuitiva y fácil de usar para usuarios no técnicos

### Roles de usuario

// A fines de simplificarlo, ya que no es un requisito directo de esta tarea el rol del cliente será *Administrador*

- Administrador: el cliente tendrá acceso total a las funcionalidades y vistas del sistema
- Invitado: su acceso es restringido a interfaces de sólo lectura de datos, sin posibilidad de alteración


## Épicas e Historias de Usuario (HU)

| Título                              | ID        | Actor        | Prioridad | Descripción                                                                                                              | Criterios de Aceptación |
|-------------------------------------|-----------|--------------|-----------|--------------------------------------------------------------------------------------------------------------------------|-------------------------|
| Gestión de jugadores                | EP001     | Administrador | Alta      | Como administrador del sistema, quiero poder gestionar la información de los jugadores para mantener un registro actualizado. |                         |
| Registrar jugador                   | HU001     | Administrador | Alta      | Como administrador, quiero poder registrar nuevos jugadores en el sistema, ingresando su información personal y datos relevantes para que puedan ser gestionados. | Los siguientes campos deben ser obligatorios: nombre, edad, overall, posición, rostro, version, update y potencial. Se deben mostrar mensajes de error de validación y de registro exitoso. Esta funcionalidad sólo debe ser accesible para el "Administrador" |
| Modificar jugador                   | HU002     | Administrador | Media      | Como administrador, quiero poder modificar la información de un jugador existente para corregir o actualizar sus datos.    | Los atributos de un jugador que pueden modificarse son: nombre, edad, skill general (overall), potencial, rostro, version de fifa, version update, posición, disparo, pase y regate.  Esta funcionalidad sólo debe ser accesible para el "Administrador" |
| Eliminar jugador                    | HU003     | Administrador | Baja      | Como administrador, quiero poder eliminar un jugador del sistema para depurar la base de datos cuando sea necesario.       | El jugador debe eliminarse correctamente y su información no debe estar disponible en futuras consultas.  Esta funcionalidad sólo debe ser accesible para el "Administrador" desde la vista de "HU004 Consultar jugador". |
| Consultar jugador                   | HU004     | Usuario      | Alta     | Como usuario, quiero poder consultar los detalles de un jugador para ver su perfil y estadísticas relacionadas.            | La consulta debe mostrar nombre, edad, rostro, version de fifa, version update, posición. Debe incluir además las estadísticas del jugador de la HU006 Consultar estadísticas de jugador. |
| Listar jugadores                    | HU005     | Usuario      | Alta     | Como usuario, quiero poder ver una lista de todos los jugadores para tener acceso rápido a sus perfiles.                   | La lista debe estar paginada y traer 9 jugadores por página. Debe tener un navegador para cambiar la página actual. Los jugadores deben exhibir su foto, nombre, nacionalidad, club, edad y el nivel de skill. Al hacer click en un jugador debe redireccionar a "HU004 Consultar jugador" con el id de dicho jugador. Debe tener la posiblidad de filtrar por club, edad, nombre y/o nacionalidad. Incluye además la funcionalidad de compartir la lista filtrada de la "HU013 Compartir lista de jugadores filtrada" en formato CSV. |
| Consultar estadísticas de jugador   | HU006     | Usuario      | Media     | Como usuario, quiero poder consultar las estadísticas de un jugador específico para analizar su rendimiento.               | Las estadísticas potencial, nivel general, pase, disparo y regate deben mostrarse de manera clara y precisa en un gráfico en la vista de la "HU004 Consultar jugador". |
| Gestión de usuarios                 | EP002     | Usuario      | Alta      | Como usuario del sistema, quiero poder gestionar mis credenciales y sesiones para acceder al sistema de manera segura.     |                         |
| Iniciar sesión                      | HU007     | Usuario      | Alta      | Como usuario, quiero poder iniciar sesión con mis credenciales para acceder a mi cuenta personal en el sistema.            | La sesión debe iniciar correctamente con credenciales válidas, mostrando un mensaje de error si no son válidas y redireccionado al dashboard principal en caso de éxito. |
| Cerrar sesión                       | HU008     | Usuario      | Baja     | Como usuario, quiero poder cerrar sesión del sistema para asegurar mi cuenta después de usarla.                            | La sesión debe cerrarse correctamente y el usuario debe ser redirigido a la pantalla de login. Debe mostrarse una sección en el header de la web con dicha funcionalidad y el nombre del usuario |
| Registrar invitado                  | HU009     | Administrador | Media      | Como administrador, quiero poder registrar usuarios invitados en el sistema para otorgarles acceso limitado.               | El "Administrador" es el único capaz de registrar usuarios con rol "Invitado". Son obligatorios los campos email y password. Deben mostrarse mensajes de error y éxito. |
| Limitar accesos                     | HU010     | Administrador | Alta      | Como administrador, quiero poder establecer y limitar accesos para diferentes usuarios, según su rol dentro del sistema.   | Sólo usuarios logueados pueden acceder al sistema. Las funcionalidades del sistema y su acceso deben estar limitados a los roles definidos, siendo "Invitado" un usuario con permisos de sólo lectura de datos no sensibles, y "Administrado" el perfil con acceso total. |
| Gestión de datos                    | EP003     | Administrador | Media     | Como administrador, quiero poder gestionar la importación, exportación y compartición de los datos del sistema.            |                         |
| Importar base de datos externa      | HU011     | Administrador | Media      | Como administrador, quiero poder importar una base de datos externa para cargar información masiva al sistema.             | Los datos deben ser importados correctamente y reflejados en el sistema sin errores. El archivo debe tener un formato CSV, de lo contrario mostrar un mensaje al usuario. |
| Exportar base de datos de jugadores             | HU012     | Administrador | Baja      | Como administrador, quiero poder exportar la base de datos de jugadores para utilzar sus datos de forma externa. | La base de datos de jugadores debe exportarse en el formato adecuado (csv) y sin pérdida de información. |
| Compartir lista de jugadores filtrada  | HU013     | Administrador | Media     | Como administrador, quiero poder compartir la información de la lista filtrada de jugadores de la "HU005 Listar jugadores" en formato CSV para poder compartirla fácilmente. | El archivo CSV debe generarse con los datos correctos y descargarse sin errores. |












