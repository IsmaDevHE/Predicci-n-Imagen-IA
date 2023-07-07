# Claificacion de prendas
El siguiente proyecto consta en una simple página web en la cual se debe ingresar la imagen de una prenda de ropa y ayudado de un modelo creado con inteligencia artificial va a determinar a qué tipo de prenda corresponde.

| Numero  | Label |
| ------- | ----------- |
| 1 | T-Shirt |
| 2 | Trouser |
| 3 | Pullover |
| 4 | Dress |
| 5 | Coat |
| 6 | Sandalias |
| 7 | Shirt |
| 8 | Sneaker |
| 9 | Bag |
| 10 |Ankle boot |

Posterior a eso, una vez el modelo determina que prenda es, se pone a disposición una serie de prendas reales de ropa que están en ‘Amazon’ sobre la prenda especificada.

## ¿Cómo ejecutar el proyecto?
Para ejecutar el proyecto se recomienda tener instalado ‘Visual Studio Code’ y su extensión ‘Live Server’

Luego posicionados en el fichero index.html se debe hacer click derecho y dar inicio al servidor en vivo de la siguiente manera:
![Iniciar Proyecto con Live Server](/IMAGES/LiveServer.jpg)

Eso da inicio a la página web de forma local.
![Pagina Web](/IMAGES/mainpage.jpg)


## Modelo
El modelo fue creado con el dataset proporcionado por tensorflow Fashion-MNIST, que es un conjunto de datos de imágenes en las cuales 60000 son de entrenamiento y 10000 de prueba. Cada ejemplo es una imagen en escala de grises de 28x28, asociada con una etiqueta de 10 clases.
```markdown
[Dataset](https://www.tensorflow.org/datasets/catalog/fashion_mnist?hl=es-419)
![Pagina Web](/IMAGES/imagenesReadme.jpg)


