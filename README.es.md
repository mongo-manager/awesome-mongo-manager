# Awesome Mongo Manager [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

<img src="https://raw.githubusercontent.com/mongo-manager/mongo-manager/main/site/assets/icon.svg" align="right" width="96" alt="Mongo Manager">

> Complementos y recursos para [Mongo Manager](https://github.com/mongo-manager/mongo-manager), el gestor de MongoDB autoalojado que funciona en el navegador.

Un complemento añade una vista, una acción o una página a Mongo Manager: un mapa de los lugares de una colección, un gráfico, un buscador de duplicados. Es una carpeta de archivos estáticos que la aplicación muestra en un marco aislado (sandbox), sin código en el servidor y sin acceso propio a la red (solo a una dirección que fije un administrador, como el servidor de teselas de un mapa), y solo se ejecuta después de que un administrador haya aprobado exactamente sus archivos y los permisos que pide.

**Figurar en esta lista no es una revisión ni un respaldo.** La aplicación analiza cada complemento antes de que un administrador lo apruebe, pero el análisis encuentra patrones conocidos, no intenciones. Lee el complemento, y su análisis en la página Complementos, antes de aprobarlo.

[English](README.md) · [Türkçe](README.tr.md) · [简体中文](README.zh.md) · [日本語](README.ja.md) · Español · [Português](README.pt.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Русский](README.ru.md)

## Contenido

<!-- toc:start -->
- [Complementos oficiales](#complementos-oficiales)
  - [Consultas y búsqueda](#consultas-y-búsqueda)
  - [Gráficos y mapas](#gráficos-y-mapas)
  - [Documentos y valores](#documentos-y-valores)
  - [Esquema y calidad de datos](#esquema-y-calidad-de-datos)
  - [Privacidad y datos de prueba](#privacidad-y-datos-de-prueba)
  - [Operaciones y rendimiento](#operaciones-y-rendimiento)
- [Complementos de la comunidad](#complementos-de-la-comunidad)
- [Instalar un complemento](#instalar-un-complemento)
- [Crear un complemento](#crear-un-complemento)
<!-- toc:end -->

## Complementos oficiales

Se incluyen con Mongo Manager: ya están en tu servidor, y un administrador activa cada uno desde la página Complementos.

<!-- official:start -->

### Consultas y búsqueda

- [Filtros de fecha](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/date-presets) - Pone en la consulta de Documentos los rangos de fechas por los que se filtra (hoy, ayer, los últimos 7 días, este mes, las últimas n horas o días, entre dos días) en un campo de fecha, o en _id según cuándo se crearon sus documentos.
- [Búsqueda de valores](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/value-search) - Busca un texto, un número o un ObjectId en cada campo de los documentos de una colección y muestra dónde lo encontró.
- [SQL a MongoDB](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/sql-to-mongodb) - Convierte sentencias SELECT en consultas de MongoDB y código de controlador, las ejecuta en solo lectura en la colección abierta (un JOIN también lee la colección que nombra, de la misma base de datos) y las lleva a Documentos o Agregaciones.
- [Zona de pruebas de búsqueda](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/search-playground) - Prueba los índices de búsqueda de una colección: búsqueda de texto completo en un campo o en todos, con errores tipográficos permitidos y resaltados, o búsqueda vectorial con un vector pegado o un documento de la colección. Resultados con su puntuación y el pipeline pasa a Agregaciones.
- [Remodelar](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/reshape) - Renombra, aplana, anida, convierte o elimina los campos de una colección mediante pasos que previsualizas en documentos de muestra y los pasa a Agregaciones como un pipeline; allí, un $out que añadas escribe una colección nueva. La colección en sí nunca se modifica.

### Gráficos y mapas

- [Gráficos](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/charts) - Grafica los valores de una colección —barras, línea en el tiempo, anillo, histograma, dispersión— con una tabla resumen, dentro de la consulta actual.
- [Mapa](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/geojson-map) - Dibuja en un mapa los campos GeoJSON y los pares \[lng, lat\] de los documentos de una colección, y los filtra por un área dibujada en él.

### Documentos y valores

- [Comparación de documentos](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/document-diff) - Compara un documento con otro de su colección, campo por campo: qué se añadió, quitó o cambió, con valores anidados y arreglos incluidos.
- [Referencias](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/references) - Encuentra los campos que contienen ObjectId de otros documentos y las colecciones a las que hacen referencia; muestra el nombre del documento referenciado junto a cada id, y uno que falta se indica como tal; lista los documentos que hacen referencia a uno.
- [Pistas de tiempo](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/time-hints) - Al apuntar a un ObjectId, muestra cuándo se creó; al apuntar a un número que se lee como hora Unix, muestra su fecha.
- [Hora local](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/local-time) - Muestra cada fecha en tu hora local, o en una zona horaria que establezcas, con su desfase respecto a UTC, en una información emergente o junto al valor; opcionalmente, hace cuánto fue.
- [Vista previa de binarios](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/binary-preview) - Dice qué contiene un valor binario —el tipo y el tamaño de una imagen, un PDF, un archivo comprimido— al apuntarlo, y muestra las imágenes almacenadas en los documentos de una colección, o en un solo documento, dibujadas a partir de sus propios bytes.
- [UUID heredados](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/legacy-uuid) - Lee los UUID heredados que guardaban los controladores antiguos (subtipo binario 3) en los órdenes de bytes de Java, C# y Python, averigua en qué orden se escribió un campo y encuentra un UUID sea cual sea su forma de almacenamiento.
- [Tamaño del documento](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/document-size) - Qué tamaño tienen los documentos de una colección —su distribución, los más grandes, lo cerca que están del límite de 16 MB— y adónde van sus bytes, campo por campo y dentro de los campos de objeto, nombres incluidos, medido en el servidor.

### Esquema y calidad de datos

- [Salud del esquema](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/schema-health) - Comprueba una muestra de una colección, el tamaño de sus documentos y sus índices en busca de los antipatrones de esquema que nombra la documentación de MongoDB: documentos y arreglos grandes, anidamiento profundo, tipos mezclados, índices sin usar y redundantes.
- [Comprobación de validación](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/validation-inspector) - Comprueba uno a uno los documentos de una colección con sus reglas de validación (en una muestra al azar o en todos) e indica cuántos incumplen cada regla, con esos documentos a un clic en Documentos.
- [Buscador de duplicados](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/duplicate-finder) - Encuentra los documentos que comparten valores en campos que deberían ser únicos, los cuenta y muestra primero los más repetidos.
- [Diccionario de datos](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/data-dictionary) - Documenta una base de datos: los campos de cada colección con sus tipos y presencia, lo que dicen sus reglas de validación, las referencias entre colecciones, los índices y las reglas. Se muestra en una pestaña y se guarda como Markdown o HTML.

### Privacidad y datos de prueba

- [Buscador de datos personales](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/personal-data) - Encuentra en una muestra aleatoria los campos de una colección que contienen datos personales (correos, teléfonos, tarjetas, IBAN, identidades, nombres, direcciones, contraseñas), muestra solo ejemplos enmascarados y sugiere los campos elegidos como reglas de datos personales.
- [Anonimizador](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/anonymiser) - Crea una copia anonimizada de una colección para pruebas o para compartir: valores ficticios realistas que conservan su formato, hashes coherentes, valores mezclados, fechas desplazadas y ruido numérico; se guarda como NDJSON o JSON, o se importa a una colección nueva.
- [Datos de prueba](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/mock-data) - Crea documentos de prueba realistas con la forma de los de una colección —nombres, correos electrónicos, direcciones, precios, fechas y más, a partir de más de 100 plantillas en diez idiomas— y los entrega al asistente de importación, donde los compruebas y empiezas la importación.

### Operaciones y rendimiento

- [Script de índices](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/index-script) - Escribe los índices de una colección, o de toda una base de datos, como los comandos que los vuelven a crear —para mongosh, el driver de Node.js o de Python, o como JSON— para copiarlos o guardarlos, en otro entorno o en una migración.
- [Informe de almacenamiento](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/storage-report) - Muestra lo que ocupa en disco cada colección de una base de datos, el espacio libre que WiredTiger conserva en sus archivos y en los de sus índices, y qué parte supone. Para una colección, estima lo que devolvería compactar y la compacta cuando la aplicación te pregunta y escribes su nombre.
- [Caducidad (TTL)](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/ttl-view) - Muestra cuándo los índices TTL de una colección eliminan sus documentos (ya caducados, en la hora, el día, la semana, más tarde) y cuáles no eliminan nunca; cada grupo, a un clic en Documentos.
- [Analizador de claves de fragmentación](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/shard-key-analyzer) - Compara las claves de fragmentación candidatas de una colección según lo que indica analyzeShardKey de MongoDB (valores distintos, frecuencia del valor más común, si la clave crece con cada inserción) y valora cada una según las pautas de MongoDB.
- [Analizador de registros](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/log-analyzer) - Lee un archivo de registro de mongod o mongos en tu navegador (nunca sale de él) y muestra sus operaciones lentas agrupadas por forma de consulta, los errores y advertencias, las conexiones y una cronología.

<!-- official:end -->

## Complementos de la comunidad

Los complementos hechos por otras personas, cada uno en su propio repositorio, figuran en la [lista en inglés](README.md#community-plugins). Cada entrada se comprueba con el propio código de la aplicación frente a la última versión de Mongo Manager: su última versión contiene un único archivo de complemento, la aplicación acepta su manifiesto y el análisis de la aplicación no encuentra en él ningún riesgo alto.

## Instalar un complemento

En la página **Complementos**, un administrador elige **Subir complemento** y entrega el archivo `.tgz` de la versión del complemento en GitHub, o elige **Instalar desde GitHub** y da la dirección del repositorio (esto está desactivado salvo que el servidor defina `MM_PLUGINS_GITHUB=1`).

En el propio servidor, también se puede poner la carpeta del complemento, con su id como nombre, en la carpeta `plugins` del directorio de datos y luego elegir **Explorar de nuevo**.

Sea cual sea la vía, el complemento llega desactivado, se analiza y espera la aprobación de un administrador. Cualquier cambio en sus archivos requiere una nueva aprobación.

## Crear un complemento

En la página Complementos, en **Crea tu propio complemento**, elige **Leer la guía para desarrolladores** para ver todo lo que puede hacer un complemento: el manifiesto, el puente, los permisos, el sandbox, el análisis, el empaquetado y la publicación.

- [Plantilla inicial](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/starter) - Un complemento que funciona, en JavaScript simple, sin paso de compilación ni dependencias, con instrucciones para asistentes de programación con IA. También está en la página Complementos, como **Descargar la plantilla inicial (.zip)**.
- [Código fuente de los complementos oficiales](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins) - Todos los complementos de arriba, con sus pruebas.

## Contribuir

¡Las contribuciones son bienvenidas! Lee primero la [guía de contribución](CONTRIBUTING.md) (en inglés). Para añadir un complemento, abre una pull request que añada una línea a README.md.
