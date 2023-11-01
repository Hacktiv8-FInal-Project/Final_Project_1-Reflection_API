# Final_Project_1-Reflection_API
  
  Nama Anggota Kelompok 
  
  Dani Rizky Zaelani
    https://github.com/DaniRizkyZaelani
    
  Ngakan Made alit Wiradhanta 
    https://github.com/alit789
  
  Restu Oktafiandi 
    https://github.com/restuoktafiandi
  
### Instalasi
1. Clone repositori ini :
    ```js
      git clone https://github.com/Hacktiv8-FInal-Project/Final_Project_1-Reflection_API.git
    ```
2. Masuk ke direktori proyek:
    ```js
      cd Final_Project_1-Reflection_API
    ```
3. Install dependensi: 
    ```js
      npm install
    ```
### Konfigurasi
1. Buat Database dan buat tabel seperti berikut:
    ```sql
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      );

      CREATE TABLE reflections (
        id SERIAL PRIMARY KEY,
        success TEXT,
        low_point TEXT,
        take_away TEXT,
        UserId INT,
        createdAt TIMESTAMP DEFAULT NOW(),
        updatedAt TIMESTAMP DEFAULT NOW()
      );

    ```

2. Buat file `.env` di direktori proyek dan atur konfigurasi database:
    ```js
      PORT=
      SECRET_KEY=

      # development
      DB_USERNAME_DEV=
      DB_HOST_DEV=
      DB_NAME_DEV=
      DB_PASSWORD_DEV=
      DB_DIALECT_DEV=
      DB_PORT_DEV= 
    ```
3. Atur konfigurasi lainnya sesuai kebutuhan

### Menjalankan Aplikasi
1. Jalankan proyek:
    ```js
      npm run start
    ```
2. Aplikasi akan berjalan di `http://localhost:{PORT}` untuk port akan otomatis terisi sesuai port yang ada di file `.env`

### Spec API
- **POST /api/v1/users/register**
    
    *Request Body*
    
    ```json
    {
      "email": "<email>",
      "password": "<password>"
    }
    ```
    *Response (201 - Created)*
    ```json
    {
      "id": <given id by system>,
      "email": "<email>"
    }
    ```
    *Response (400 - Bad Request)*
    
    ```json
    {
      "message": "Email already used!"
    }
    ```
- **POST /api/v1/users/login**

    *Request Body*
    
    ```json
    {
      "email": "<email>",
      "password": "<password>"
    }
    ```
    *Response (200)*
    
    ```json
    {
      "access_token": "<your access token>"
    }
    ```
    *Response (401)*
    
    ```json
    {
      "message": "Email or password invalid!"
    }
    ```
    

- **POST /api/v1/reflections ⇒ create reflection**
    
    *Request Body*
    ```json
    {
      "success": "<posted success>",
      "low_point": "<posted low point>",
      "take_away": "<posted take away>",
    }
    ```

    *Request Header*

    ```json
    {
      "Authorization": "bearer <your access token>"
    }
    ```
    *Response (201 - Created)*

    ```json
    {
      "id": <given id by system>,
      "success": "<posted success>",
      "low_point": "<posted low point>",
      "take_away": "<posted take away>",
      "UserId": "<UserId>",
      "createdAt": "2023-04-20T07:15:12.149Z",
      "updatedAt": "2023-04-20T07:15:12.149Z",
    }
    ```
    *Response (401)*

    ```json
    {
      "message": "Unauthorized"
    }
    ```
- **GET /api/v1/reflections** **⇒ mendapatkan semua data reflections milikinya sendiri**
    
    *Request Header*
    
    ```json
    {
      "Authorization": "bearer <your access token>"
    }
    ```
    *Response (200)*
    
    ```json
    [
    	{
        "id": <given id by system>,
        "success": "<posted success>",
        "low_point": "<posted low point>",
        "take_away": "<posted take away>",
        "UserId": "<UserId>",
        "createdAt": "2023-04-20T07:15:12.149Z",
        "updatedAt": "2023-04-20T07:15:12.149Z",
    	}
    ]
    ```
    
    *Reponse (401)*
    
    ```json
    {
      "message": "Unauthorized"
    }
    ```
    

- **PUT /api/v1/reflections/:id ⇒ edit reflection miliknya sendiri**
    
    *Request Header*
    
    ```json
    {
      "Authorization": "bearer <your access token>"
    }
    ```
    
    *Request Param*
    
    ```json
    {
      "id": "<id reflections>"
    }
    ```
    
    *Request Body*
    
    ```json
    {
      "success": "<posted success>",
      "low_point": "<posted low point>",
      "take_away": "<posted take away>"
    }
    ```
    
    *Response (200)*
    
    ```json
    
    {
      "id": <given id by system>,
      "success": "<posted success>",
      "low_point": "<posted low point>",
      "take_away": "<posted take away>",
      "UserId": "<UserId>",
      "createdAt": "2023-04-20T07:15:12.149Z",
      "updatedAt": "2023-04-20T07:15:12.149Z",
    }
    
    ```
    
    *Response (401)*
    
    ```json
    {
      "message": "Unauthorized"
    }
    ```
    

- **DELETE /api/v1/reflections/:id ⇒ menghapus reflection sendiri**
    
    *Request Header*
    
    ```json
    {
      "Authorization": "bearer <your access token>"
    }
    ```
    
    *Request Params*
    
    ```json
    {
      "id": "<id reflections>"
    }
    ```
    
    *Response (200)*
    
    ```json
    {
      "message": "Success delete"
    }
    ```
    
    *Response (401)*
    ```json
    {
      "message": "Unauthorized"
    }
    ```