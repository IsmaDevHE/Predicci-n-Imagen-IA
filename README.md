# Clasificación de prendas
- Docente: Jorge Alexis Castillo Sepúlveda, PhD & Math.Eng.
- Estudiantes: Sebastian Valenzuela Ramirez - Ismael Herrada Escudero.

El siguiente proyecto consta en una simple página web en la cual se debe ingresar la imagen de una prenda de ropa y ayudado de un modelo creado con inteligencia artificial va a determinar a qué tipo de prenda corresponde.
Se dejo adjunto un folder 'imagenesPruebaModelo' con imagenes para que el modelo sea testeado.

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
###
![Iniciar Proyecto con Live Server](/IMAGES/LiveServer.jpg)
###

Eso da inicio a la página web de forma local.
![Pagina Web](/IMAGES/mainpage.jpg)

## Modelo
El modelo fue creado con el dataset proporcionado por tensorflow Fashion-MNIST, que es un conjunto de datos de imágenes en las cuales 60000 son de entrenamiento y 10000 de prueba. Cada ejemplo es una imagen en escala de grises de 28x28, asociada con una etiqueta de 10 clases. [Pagina del Dataset](https://www.tensorflow.org/datasets/catalog/fashion_mnist?hl=es-419)

El modelo consta de un formato de imagenes de este modo:
###
![Pagina Web](/IMAGES/imagenesReadme.jpg)

Para el modelo se utilizó una estructura de Red Neuronal Convolucional en el cual se adapto de la siguiente forma:
```python
# Creando el modelo
model = Sequential()#Apila capas de manera sequencial.
# Agregando capas convolucionales.
model.add(Conv2D(32, (3, 3), padding='same', activation='relu', input_shape=(28,28,1))) #Imagenes en escala de grises de 28x28 pixeles.
model.add(Conv2D(32, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2))) # se añade el pooling para reducir dimension espacial.
model.add(Dropout(0.25)) # se quita el 25% de neuronas.
model.add(Conv2D(64, (3, 3), padding='same', activation='relu'))
model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))
# Flatten convierte la matriz 3D en una matriz 1D.
model.add(Flatten())
model.add(Dense(512, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(10, activation='softmax'))
# Compilando el modelo con optimizador Adam.
model.compile(optimizer=Adam(), loss='sparse_categorical_crossentropy', metrics=['accuracy'])
```
Dando una precisión de aproximadamente: 0.9311
	
## Implementación 
Para implementar el modelo fue necesario exportar el modelo usando TensorflowJS. 
```python
!pip install tensorflowjs
#Exportacion del modelo a h5
model.save('clasificador.h5')
# Convertir el archivo h5 a formato tensorflowjs
!mkdir clasificador
!tensorflowjs_converter --input_format keras clasificador.h5 clasificador_tfjs
```

Esta da la capacidad de obtener el modelo en un formato JSON que luego es ocupado mediante JavaScript simplemente usando la CDN de Tensorflow.
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/tensorflow/4.8.0/tf.min.js" integrity="sha512-qsDd93ZTkmCrFL/ITZpWGd25rZoTDmtinT+DogKY9P4Ofau6I///QNYvshZ+9b1mGGsXoawYocdwUVBFlesyjA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```
Con esto se puede hacer el uso del modelo en javascript
```javascript
// Cargar el modelo desde la URL
const model       = await tf.loadLayersModel('modelo/model.json');
```

Para hacer la predicción desde javascript se debe ajustar la imagen de tal forma que quede un formato que soporte el modelo y pueda hacer una predicción precisa en base a la imagen que se le envía.

```javascript
// Leer la imagen seleccionada
const img    = new Image();
const reader = new FileReader();

reader.onload = function(e) {
img.src    = e.target.result;
img.onload = async function(){
  // Preprocesar la imagen (ajustar el tamaño y normalizar los valores)
  const processedImg = preprocessImage(img);
  // Realizar la predicción
  const prediction = model.predict(processedImg);
  // Obtener los resultados de la predicción
  const predictionData = await prediction.data();
  // Obtener el índice de la clase con mayor probabilidad
  const predictedClassIndex = tf.argMax(predictionData).dataSync()[0];
```

## ¿Qué se puede mejorar?
Para empezar el dataset utilizado para la creación del modelo tiene solo imágenes 28 x 28 en escalado de grises, por lo que, al hacer la implementación en una plataforma web, puede ser que falle en algunas predicciones por la imagen que se le sube.
Para mejorar este proyecto se podría optar por usar un dataset con imágenes a color y así no discriminaría la imagen que pueda ser subida para predecir.
Sin embargo, el modelo quedo con un porcentaje de acierto bastante alto, gracias a todos los parámetros utilizados que fueron enseñados en clases, el modelo final usando una Red Neuronal Convolucional logra predecir con éxito la imagen de la prenda que se le ingrese, siempre y cuando esta cumpla con el formato adecuado.