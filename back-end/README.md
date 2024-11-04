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
|                                     | Compartir datos de jugadores                                                           |




### Requerimientos no funcionales

- El acceso a las funcionalidades de modificación debe estar restringido por roles de usuario
- La autenticación de usuarios debe usar protocolos seguros como JWT (JSON Web Tokens)
- El sistema debe estar preparado para añadir más funcionalidades sin una reestructuración importante del código
- La base de datos debe permitir importar datos desde formatos CSV
- La interfaz debe ser intuitiva y fácil de usar para usuarios no técnicos

### Roles de usuario

// A fines de simplificarlo, ya que no es un requisito directo de esta tarea el rol del cliente será *Administrador*

- Administrador: el cliente tendrá acceso total a las funcionalidades y vistas del sistema
- Invitado: su acceso es restringido a interfaces de sólo lectura de datos, sin posibilidad de alterarlas


## Épicas e Historias de Usuario (HU)

| Título                              | ID        | Actor        | Prioridad | Descripción                                                                                                              | Criterios de Aceptación |
|-------------------------------------|-----------|--------------|-----------|--------------------------------------------------------------------------------------------------------------------------|-------------------------|
| Gestión de jugadores                | EP001     | Administrador | Alta      | Como administrador del sistema, quiero poder gestionar la información de los jugadores para mantener un registro actualizado. |                         |
| Registrar jugador                   | HU001     | Administrador | Alta      | Como administrador, quiero poder registrar nuevos jugadores en el sistema, ingresando su información personal y datos relevantes para que puedan ser gestionados. | El jugador se debe registrar con éxito y reflejar en la base de datos. |
| Modificar jugador                   | HU002     | Administrador | Media      | Como administrador, quiero poder modificar la información de un jugador existente para corregir o actualizar sus datos.    | Se debe mostrar la información del jugador precargada en el formulario. Debe existir un botón "Guardar" que envíe la nueva información y redireccione a la HU004 Consultar jugador del mismo. Debe mostrar mensajes de éxito y/o error. Debe existir un botón "Cancelar" que devuelva a la pantalla anterior de consulta. |
| Eliminar jugador                    | HU003     | Administrador | Baja      | Como administrador, quiero poder eliminar un jugador del sistema para depurar la base de datos cuando sea necesario.       | Debe existir un botón "Eliminar" en la HU004 Consultar jugador que consulte por la confirmación de la acción y de ser positiva proceda a eliminarlo, mostrar un mensaje de éxito o error y redireccionar a HU005 Listar jugadores. |
| Consultar jugador                   | HU004     | Usuario      | Alta     | Como usuario, quiero poder consultar los detalles de un jugador para ver su perfil y estadísticas relacionadas.            | La consulta debe mostrar la información detallada del jugador solicitado. Debe existir un botón "Modificar" que habilite un formulario de modificación para el jugador y otro "Eliminar" que lo dé de baja en el sistema. |
| Listar jugadores                    | HU005     | Usuario      | Alta     | Como usuario, quiero poder ver una lista de todos los jugadores para tener acceso rápido a sus perfiles.                   | La lista debe cargar todos los jugadores registrados y permitir la navegación hacia sus detalles. |
| Consultar estadísticas de jugador   | HU006     | Usuario      | Media     | Como usuario, quiero poder consultar las estadísticas de un jugador específico para analizar su rendimiento.               | Las estadísticas deben mostrarse de manera clara y precisa. |
| Gestión de usuarios                 | EP002     | Usuario      | Alta      | Como usuario del sistema, quiero poder gestionar mis credenciales y sesiones para acceder al sistema de manera segura.     |                         |
| Iniciar sesión                      | HU007     | Usuario      | Alta      | Como usuario, quiero poder iniciar sesión con mis credenciales para acceder a mi cuenta personal en el sistema.            | La sesión debe iniciar correctamente con credenciales válidas, mostrando un mensaje de error si no son válidas. |
| Cerrar sesión                       | HU008     | Usuario      | Baja     | Como usuario, quiero poder cerrar sesión del sistema para asegurar mi cuenta después de usarla.                            | La sesión debe cerrarse correctamente y el usuario debe ser redirigido a la pantalla de inicio. |
| Registrar invitado                  | HU009     | Administrador | Media      | Como administrador, quiero poder registrar usuarios invitados en el sistema para otorgarles acceso temporal.               | El usuario invitado debe poder registrarse y recibir acceso limitado al sistema. |
| Limitar accesos                     | HU010     | Administrador | Alta      | Como administrador, quiero poder establecer y limitar accesos para diferentes usuarios, según su rol dentro del sistema.   | Los accesos deben establecerse correctamente según los roles definidos en el sistema. |
| Gestión de datos                    | EP003     | Administrador | Media     | Como administrador, quiero poder gestionar la importación, exportación y compartición de los datos del sistema.            |                         |
| Importar base de datos externa      | HU011     | Administrador | Media      | Como administrador, quiero poder importar una base de datos externa para cargar información masiva al sistema.             | Los datos deben ser importados correctamente y reflejados en el sistema sin errores. |
| Exportar base de datos              | HU012     | Administrador | Baja      | Como administrador, quiero poder exportar la base de datos del sistema para realizar respaldos o compartirla externamente. | La base de datos debe exportarse en el formato adecuado y sin pérdida de información. |
| Compartir datos de jugadores (CSV)  | HU013     | Administrador | Media     | Como administrador, quiero poder exportar la información de los jugadores en formato CSV para poder compartirla fácilmente. | El archivo CSV debe generarse con los datos correctos y descargarse sin errores. |


















