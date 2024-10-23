# XAcademyChallenge
Author: Wnorowsky Nicolás


# "OWNFIFA" PROJECT

Un reconocido player de e-sports nos solicita una web donde poder gestionar de forma sencilla los jugadores de su base de datos personal.
Su interés radica particularmente en la posibilidad de visualizar el total de jugadors existentes, encontrar un jugador determinado de una forma sencilla e intuitiva, modificar sus atributos, eliminarlo y poder crear nuevos jugadores customizados e incluso conocer su skill progression a lo largo de los años.
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
| **Gestión de jugadores*            | Registrar jugador                                                                     |
|                                     | Actualizar jugador                                                                     |
|                                     | Emitir lista de jugadores                                                             |
|                                     | Generar estadística de progreso de jugador                                             |
| **Gestión de seguridad**            | Iniciar sesión                                                                         |
|                                     | Cerrar sesión                                                                          |
|                                     | Limitar accesos                                                                       |
|                                     | Registrar usuario                                                                      |
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



















