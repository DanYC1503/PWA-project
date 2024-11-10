# Proyecto Flask: Transmisión de Video con ESP32-CAM

## Descripción general
Este proyecto es una aplicación web construida con **Flask** que transmite video desde un módulo ESP32-CAM. El proyecto permite a los usuarios ver transmisiones de video en vivo, interactuar con controles de reproducción y ajustar la configuración de la cámara directamente desde una interfaz web.

Aquí tienes una explicación de los filtros utilizados en la función `video_capture` para incluir en tu README:

---
# Descripción de los Filtros de Procesamiento en `video_capture`

La función `video_capture` incluye varios filtros y técnicas de procesamiento de imágenes para mejorar y analizar los cuadros de video capturados. A continuación, se detallan los filtros y métodos utilizados:

## 1. Imagen en color original:
**Modo 0**: Muestra el cuadro de video en su color original sin procesamiento adicional.  

<div style="text-align: center;">
  <img src="https://drive.google.com/uc?id=1wCqkS6NDyDidoX86t-qcDjv6doypko4g" width="600"/>
</div>

## 2. Sustracción de fondo:
**Modo 1**: Utiliza un sustractor de fondo (`bg_subtractor`) para resaltar objetos en movimiento, útil para detectar cambios en la escena y enfocar la atención en elementos relevantes.  

<div style="text-align: center;">
  <img src="https://drive.google.com/uc?id=1wCqkS6NDyDidoX86t-qcDjv6doypko4g" width="600"/>
</div>

<div style="text-align: center;">
  <img src="https://drive.google.com/uc?id=1yVXKzvKY_dFCzoDpO6fUaBaJJePCZ2C0" width="600"/>
</div>


## 3. Equalización de histograma:
**Modo 2**: Aplica la equalización de histograma sobre la imagen en escala de grises para mejorar el contraste, destacando detalles en áreas subexpuestas o sobreexpuestas. 

<div style="text-align: center;">
  <img src="https://drive.google.com/uc?id=1wCqkS6NDyDidoX86t-qcDjv6doypko4g" width="600"/>
</div>

<div style="text-align: center;">
  <img src="https://drive.google.com/uc?id=1YVQXEbwrRnfMLTONyidT32VI2JS7HXyS" width="600"/>
</div>

## 4. Filtro CLAHE (Contrast Limited Adaptive Histogram Equalization):
**Modo 3**: Mejora el contraste localmente con el filtro CLAHE, que es una versión avanzada de la equalización de histograma, ideal para imágenes con variaciones de iluminación.  

<div style="text-align: center;">
  <img src="https://drive.google.com/uc?id=1wCqkS6NDyDidoX86t-qcDjv6doypko4g" width="600"/>
</div>

<div style="text-align: center;">
  <img src="https://drive.google.com/uc?id=1ssirIox_oDnvf90s-Zg32nB_az1j61Sn" width="600"/>
</div>

## 5. Filtro homomórfico:
**Modo 4**: Aplica un filtro homomórfico para ajustar el brillo y mejorar los detalles en regiones de sombras o luces intensas, proporcionando una imagen más uniforme.  

<div style="text-align: center;">
  <img src="https://drive.google.com/uc?id=1wCqkS6NDyDidoX86t-qcDjv6doypko4g" width="600"/>
</div>

<div style="text-align: center;">
  <img src="https://drive.google.com/uc?id=1jXGKT7C0qDFnSvwx0weohIWQQtkP2t14" width="600"/>
</div>

## 6. Ruido sal y pimienta y filtros de suavizado:
**Modo 5**: Este modo agrega ruido sal y pimienta a la imagen original, lo que simula interferencias en la imagen y permite evaluar la efectividad de diferentes filtros de suavizado para eliminar dicho ruido. Los filtros de suavizado aplicados son:

- **Filtro de mediana**: Este filtro reemplaza cada píxel de la imagen con la mediana de los píxeles vecinos, lo que permite suavizar la imagen mientras preserva los bordes. Es particularmente útil para eliminar el ruido "sal y pimienta" sin afectar las estructuras lineales de la imagen.

<div style="text-align: center;">
  <img src="https://drive.google.com/uc?id=1gFVvnBH9zxThwocgkDVr4N7Q4xF0fMlF" width="600"/>
</div>

- **Filtro gaussiano**: Aplica un suavizado basado en una distribución gaussiana (o normal), donde los píxeles cercanos al valor central reciben más peso que los píxeles distantes. Esto ayuda a reducir el ruido general de la imagen al difuminar gradualmente los cambios abruptos en los valores de píxeles.

<div style="text-align: center;">
  <img src="https://drive.google.com/uc?id=1EVBRd2IYq3nfjF_R9PlvAcEB-lS3qxxt" width="600"/>
</div>


- **Desenfoque simple**: Utiliza un filtro de media para suavizar la imagen. Este filtro promedia los valores de los píxeles dentro de una vecindad definida, proporcionando un suavizado simple, pero efectivo, para reducir el ruido.

<div style="text-align: center;">
  <img src="https://drive.google.com/uc?id=100FWNIRThqivm5FwrXc12lb-H1LzaXjj" width="600"/>
</div>

<div style="text-align: center;">
  <img src="https://drive.google.com/uc?id=1N_EHsroRej94aO5tJKlwAXkB4Wn9twzb" width="600"/>
</div>


## 7. Detección de bordes:
La detección de bordes se utiliza para resaltar las áreas en una imagen donde ocurren transiciones abruptas en intensidad, lo cual es útil para identificar objetos o estructuras en la imagen. En este modo, se aplican diferentes técnicas de detección de bordes:

**Modo 6**: Implementa dos técnicas de detección de bordes, cada una con sus características particulares:

- **Detección de bordes con Media**: Este método utiliza un filtro de media (promedio) para suavizar la imagen y luego aplica un algoritmo de detección de bordes, como el de Canny o Sobel. El filtro de media ayuda a reducir el ruido antes de detectar los bordes.

<div style="text-align: center;">
  <img src="https://drive.google.com/uc?id=1gFVvnBH9zxThwocgkDVr4N7Q4xF0fMlF" width="600"/>
</div>

- **Detección de bordes con Gaussiano**: Utiliza un filtro gaussiano antes de aplicar la detección de bordes. Este filtro difumina la imagen suavemente, lo que puede mejorar la precisión de la detección de bordes al eliminar pequeños detalles irrelevantes.

<div style="text-align: center;">
  <img src="https://drive.google.com/uc?id=1EVBRd2IYq3nfjF_R9PlvAcEB-lS3qxxt" width="600"/>
</div>

- **Detección de bordes con blur**: En este caso, se utiliza un desenfoque general (blur) de la imagen antes de detectar los bordes. Este enfoque ayuda a reducir los detalles finos en la imagen, enfocándose más en los contornos más prominentes.

<div style="text-align: center;">
  <img src="https://drive.google.com/uc?id=100FWNIRThqivm5FwrXc12lb-H1LzaXjj" width="600"/>
</div>


Estos filtros permiten aplicar una variedad de técnicas de mejora y análisis de imágenes para obtener diferentes perspectivas de la transmisión de video en tiempo real, proporcionando a los usuarios la capacidad de observar detalles específicos o realizar análisis visuales en el flujo de video.


## Características
- **Transmisión de video en vivo**: Visualización en tiempo real de la transmisión del ESP32-CAM.
- **Interfaz fácil de usar**: Diseño limpio y moderno con HTML, CSS y JavaScript.
- **Controles interactivos**: Capacidad para iniciar/detener la transmisión, ajustar la calidad del video y capturar imágenes.
- **Diseño responsivo**: Compatible con dispositivos de escritorio y móviles.

## Estructura del proyecto
```
project_root/
|-- app.py
|-- static/
|   |-- imgs/
|   |-- chest1/
|   |-- chest2/
|   |-- chest3/
|-- templates/
|   |-- index.html
|-- README.md
```

## Instalación y configuración
1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Anthonazo/ESP32-XIAO-S3-Flask-Server.git
   cd esp32-cam-flask-streaming
   ```

2. **Crear un entorno virtual**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # En Windows usa `venv\\Scripts\\activate`
   ```

3. **Instalar las dependencias**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Ejecutar la aplicación Flask**:
   ```bash
   flask run
   ```

## Cómo usar

1. **Conecta tu módulo ESP32-CAM a la misma red que el servidor.**
2. **Ajusta la URL de transmisión en app.py para que coincida con la dirección IP de tu ESP32-CAM.**
3. **Accede a la interfaz web y comienza a ver la transmisión de video en vivo.**

## Personalización

    HTML/CSS: Modifica index.html y los estilos dentro del mismo archivo para cambios personalizados en la interfaz.
    Configuración de la cámara: Ajusta la resolución y calidad de la cámara a través de la configuración del firmware del ESP32-CAM.

## Conclusion

La función `video_capture` implementa una variedad de técnicas de procesamiento de imágenes para mejorar la visualización y el análisis de los cuadros de video en tiempo real. Al aplicar filtros como la sustracción de fondo, la equalización de histograma, el filtro CLAHE y la detección de bordes, se pueden extraer características relevantes que permiten un análisis más preciso y detallado de las escenas. Estos filtros pueden ser utilizados en una amplia gama de aplicaciones, desde la mejora de la calidad de imagen hasta la detección de movimientos y objetos en tiempo real. 

Además, la implementación de ruido sal y pimienta, junto con los filtros de suavizado, ofrece un control sobre los efectos del ruido en las imágenes, mientras que las técnicas de detección de bordes permiten resaltar las estructuras clave dentro de la imagen, lo cual es esencial para tareas como la segmentación o el seguimiento de objetos.

## Mejoras futuras

Para continuar mejorando la funcionalidad y la utilidad de la función `video_capture`, se sugieren las siguientes mejoras:

- **Agregar autenticación de usuario para acceso seguro**: Implementar un sistema de autenticación para restringir el acceso al procesamiento de video y garantizar que solo los usuarios autorizados puedan utilizar la herramienta. Esto podría incluir autenticación basada en contraseñas o incluso autenticación multifactor (MFA).

- **Integrar funciones de grabación y reproducción de video**: Añadir la capacidad de grabar los flujos de video procesados y permitir la reproducción de los mismos para revisiones o análisis posteriores. Esto sería útil en aplicaciones como la vigilancia o el análisis de eventos históricos.

- **Implementar detección de objetos basada en IA usando OpenCV**: Mejorar la capacidad de la función incorporando modelos de aprendizaje automático para la detección y clasificación de objetos en tiempo real. Esto permitiría identificar y seguir objetos específicos en el video, lo que abriría la puerta a aplicaciones avanzadas como el reconocimiento facial, la detección de vehículos o personas, y el análisis de comportamientos.
