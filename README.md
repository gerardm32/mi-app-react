# Proyecto de aplicación React con FastAPI

//Pasos para ejecutar la aplicación:
1 - Activar el entorno virtual:
| Dirigirse desde la terminal a la ruta del backend a traves del uso de;

# "cd backend"

| Una vez allí, insertar el siguiente comando;

[Windows] - "env\Scripts\activate"
[Mac] - "source env/bin/activate"


2 - Instalar las dependencias:
| Verificar si existe """requirements.txt""". En caso de que el archivo no exista, crearlo con el siguiente comando;

# "pip freeze > requirements.txt"

| Una vez creado, ejecutar el siguiente comando:

# "pip install -r requirements.txt" 
Esto instalara todas las dependencias necesarias.


3 - Correr el FrontEND:
| Para iniciar la instancia del FrontEND se debera ejecutar, en una nueva terminal preferentemente, el siguiente comando desde la raíz;

# "npm start"
Esto ejecutara el FrontEND, el cual se abrira automaticamente en el navegador.


4 - Correr el BackEND:
| Para iniciar la instancia del BackEND se debera ejecutar en otra nueva terminal el siguiente comando en la raíz del proyecto:

# "uvicorn backend.app.main:app --reload"
Esto ejecutara el BackEND.


5 - Probar la aplicación:
| Una vez hecho todo lo anteriormente mencionado, se podra empezar a probar la aplicación, yo cree un usuario a modo de prueba y aca dejo los datos en caso de prueba:

Usuario: ian
Email: ian7342@gmail.com
Contraseña: 12345678