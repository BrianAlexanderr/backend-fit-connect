# Backend Fit Connect

Ini adalah backend service untuk Fit Connect, sebuah aplikasi yang menghubungkan pengguna untuk menemukan dan berpartisipasi dalam kegiatan olahraga, grup, event, dan sesi latihan.

## Fitur Utama

* **Manajemen Pengguna**: Membuat dan mengelola profil pengguna, dengan ID yang disinkronkan dari Firebase Authentication.
* **Manajemen Grup**:
    * Membuat, memperbarui, dan menghapus grup.
    * Bergabung (join) dan keluar (leave) dari grup.
    * Mengirim dan mengambil riwayat chat dalam grup.
    * Melihat semua grup beserta jumlah anggotanya.
* **Manajemen Event**:
    * Membuat event baru (Online/Offline).
    * Melihat semua event yang tersedia.
    * Mendaftar (join) ke sebuah event.
* **Manajemen Training**:
    * Membuat sesi latihan (training) baru oleh coach.
    * Melihat semua sesi latihan yang tersedia.
    * Mendaftar (join) ke sesi latihan dengan manajemen kuota (slots).
* **ID Kustom**: Menggunakan generator ID kustom dengan prefix (misal: `G001` untuk Grup, `E001` untuk Event, `T001` untuk Training).

## Teknologi yang Digunakan

* **Node.js**: Lingkungan eksekusi JavaScript di sisi server.
* **Express.js**: Framework web minimalis untuk membangun API.
* **Prisma**: ORM (Object-Relational Mapping) modern untuk interaksi database.
* **PostgreSQL**: Sistem database relasional yang digunakan.
* **Nodemon**: Utility untuk auto-restart server saat pengembangan.

## Prasyarat

* Node.js (direkomendasikan v18 atau lebih baru)
* NPM (Node Package Manager)
* Database PostgreSQL yang sedang berjalan

## Instalasi

1.  **Clone repositori ini:**
    ```bash
    git clone [https://github.com/brianalexanderr/backend-fit-connect.git](https://github.com/brianalexanderr/backend-fit-connect.git)
    cd backend-fit-connect
    ```

2.  **Install dependensi:**
    ```bash
    npm install
    ```

3.  **Siapkan file `.env`:**
    Buat file bernama `.env` di direktori root project dan tambahkan variabel lingkungan untuk koneksi database.

    ```ini
    # Ganti dengan URL koneksi PostgreSQL Anda
    DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME"
    ```

4.  **Jalankan Migrasi Database:**
    Perintah ini akan membuat tabel-tabel di database Anda berdasarkan `schema.prisma`.
    ```bash
    npx prisma migrate dev
    ```

5.  **Generate Prisma Client:**
    Perintah ini menghasilkan Prisma Client yang di-type-safe berdasarkan skema Anda.
    ```bash
    npx prisma generate
    ```

6.  **Jalankan Server:**
    Server akan berjalan di `http://localhost:3000` (atau port yang ditentukan di `src/index.js`).
    ```bash
    nodemon src/index.js
    ```

## Susunan Project
```
Markdown

# Backend Fit Connect

Ini adalah backend service untuk Fit Connect, sebuah aplikasi yang menghubungkan pengguna untuk menemukan dan berpartisipasi dalam kegiatan olahraga, grup, event, dan sesi latihan.

## Fitur Utama

* **Manajemen Pengguna**: Membuat dan mengelola profil pengguna, dengan ID yang disinkronkan dari Firebase Authentication.
* **Manajemen Grup**:
    * Membuat, memperbarui, dan menghapus grup.
    * Bergabung (join) dan keluar (leave) dari grup.
    * Mengirim dan mengambil riwayat chat dalam grup.
    * Melihat semua grup beserta jumlah anggotanya.
* **Manajemen Event**:
    * Membuat event baru (Online/Offline).
    * Melihat semua event yang tersedia.
    * Mendaftar (join) ke sebuah event.
* **Manajemen Training**:
    * Membuat sesi latihan (training) baru oleh coach.
    * Melihat semua sesi latihan yang tersedia.
    * Mendaftar (join) ke sesi latihan dengan manajemen kuota (slots).
* **ID Kustom**: Menggunakan generator ID kustom dengan prefix (misal: `G001` untuk Grup, `E001` untuk Event, `T001` untuk Training).

## Teknologi yang Digunakan

* **Node.js**: Lingkungan eksekusi JavaScript di sisi server.
* **Express.js**: Framework web minimalis untuk membangun API.
* **Prisma**: ORM (Object-Relational Mapping) modern untuk interaksi database.
* **PostgreSQL**: Sistem database relasional yang digunakan.
* **Nodemon**: Utility untuk auto-restart server saat pengembangan.

## Prasyarat

* Node.js (direkomendasikan v18 atau lebih baru)
* NPM (Node Package Manager)
* Database PostgreSQL yang sedang berjalan

## Instalasi

1.  **Clone repositori ini:**
    ```bash
    git clone [https://github.com/brianalexanderr/backend-fit-connect.git](https://github.com/brianalexanderr/backend-fit-connect.git)
    cd backend-fit-connect
    ```

2.  **Install dependensi:**
    ```bash
    npm install
    ```

3.  **Siapkan file `.env`:**
    Buat file bernama `.env` di direktori root project dan tambahkan variabel lingkungan untuk koneksi database.

    ```ini
    # Ganti dengan URL koneksi PostgreSQL Anda
    DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME"
    ```

4.  **Jalankan Migrasi Database:**
    Perintah ini akan membuat tabel-tabel di database Anda berdasarkan `schema.prisma`.
    ```bash
    npx prisma migrate dev
    ```

5.  **Generate Prisma Client:**
    Perintah ini menghasilkan Prisma Client yang di-type-safe berdasarkan skema Anda.
    ```bash
    npx prisma generate
    ```

6.  **Jalankan Server:**
    Server akan berjalan di `http://localhost:3000` (atau port yang ditentukan di `src/index.js`).
    ```bash
    nodemon src/index.js
    ```

## Susunan Project

/ ├── prisma/ <b>
│ └── schema.prisma # Skema database Prisma <b>
├── src/ <b>
│ ├── controllers/ # Logika bisnis untuk setiap route <b>
│ │ ├── eventControllers.js <b>
│ │ ├── groupControllers.js <b>
│ │ ├── trainingControllers.js <b>
│ │ └── userControllers.js <b>
│ ├── routes/ # Definisi file routing Express <b>
│ │ ├── eventRoutes.js <b>
│ │ ├── groupRoutes.js <b>
│ │ ├── trainingRoutes.js <b>
│ │ └── userRoutes.js <b>
│ ├── utils/ <b>
│ │ └── idGenerator.js # Utility untuk membuat ID kustom (G001, E001) <b>
│ └── index.js # Entry point aplikasi (server Express) <b>
├── .gitignore <b>
├── package.json <b>
└── README.md <b>
```

## Dokumentasi API

Basis URL: `http://localhost:3000`

---

### 1. User (`/api/users`)

#### `POST /`

Membuat pengguna baru atau mengambil data jika sudah ada (berdasarkan Firebase UID).

* **Request Body:**
    ```json
    {
      "id": "firebaseUid_abc123",
      "name": "Nama Pengguna",
      "email": "pengguna@example.com",
      "role": "USER"
    }
    ```
* **Response (201 - Created):**
    ```json
    {
      "message": "User created successfully",
      "user": {
        "id": "firebaseUid_abc123",
        "name": "Nama Pengguna",
        "email": "pengguna@example.com",
        "img": null,
        "role": "USER",
        "createdAt": "2025-10-18T14:00:00.000Z"
      }
    }
    ```
* **Response (200 - OK, User Exists):**
    ```json
    {
      "message": "User already exists",
      "user": {
        "id": "firebaseUid_abc123",
        "name": "Nama Pengguna",
        ...
      }
    }
    ```

---

### 2. Groups (`/api/groups`)

#### `POST /create`

Membuat grup baru.

* **Request Body:**
    ```json
    {
      "name": "Grup Lari Pagi",
      "description": "Grup untuk lari pagi di akhir pekan.",
      "createdById": "firebaseUid_pembuat"
    }
    ```
* **Response (201):**
    ```json
    {
      "id": "G001",
      "name": "Grup Lari Pagi",
      "description": "Grup untuk lari pagi di akhir pekan.",
      "img": null,
      "createdById": "firebaseUid_pembuat",
      "price": null,
      "isExclusive": false,
      "createdAt": "2025-10-18T14:05:00.000Z",
      "members": [
        {
          "id": "firebaseUid_pembuat",
          "name": "Nama Pembuat",
          ...
        }
      ]
    }
    ```

#### `PUT /update/:id`

Memperbarui detail grup (berdasarkan ID Grup, misal: `G001`).

* **Request Params:** `id` (ID Grup, cth: "G001")
* **Request Body:**
    ```json
    {
      "name": "Grup Lari Sore",
      "description": "Deskripsi baru."
    }
    ```
* **Response (200):**
    ```json
    {
      "id": "G001",
      "name": "Grup Lari Sore",
      "description": "Deskripsi baru.",
      ...
    }
    ```

#### `DELETE /delete/:id`

Menghapus grup.

* **Request Params:** `id` (ID Grup, cth: "G001")
* **Response (200):**
    ```json
    {
      "message": "Group deleted successfully"
    }
    ```

#### `POST /join`

Mengizinkan pengguna bergabung ke grup.

* **Request Body:**
    ```json
    {
      "userId": "firebaseUid_pengguna",
      "groupId": "G001"
    }
    ```
* **Response (200):**
    ```json
    {
      "message": "User joined group"
    }
    ```

#### `POST /leave`

Mengizinkan pengguna keluar dari grup.

* **Request Body:**
    ```json
    {
      "userId": "firebaseUid_pengguna",
      "groupId": "G001"
    }
    ```
* **Response (200):**
    ```json
    {
      "message": "User left group"
    }
    ```

#### `GET /all`

Mengambil semua grup beserta jumlah anggotanya.

* **Response (200):**
    ```json
    [
      {
        "id": "G001",
        "name": "Grup Lari Sore",
        "description": "Deskripsi baru.",
        "img": null,
        "isExclusive": false,
        "price": null,
        "members": 2
      },
      ...
    ]
    ```

#### `GET /user/:userId`

Mengambil semua grup yang diikuti oleh pengguna tertentu.

* **Request Params:** `userId` (Firebase UID)
* **Response (200):**
    ```json
    [
      {
        "id": "G001",
        "name": "Grup Lari Sore",
        ...
      }
    ]
    ```

#### `POST /chat`

Mengirim pesan ke chat grup.

* **Request Body:**
    ```json
    {
      "userId": "firebaseUid_pengguna",
      "groupId": "G001",
      "message": "Halo semua!"
    }
    ```
* **Response (200):**
    ```json
    {
      "id": "C001",
      "groupId": "G001",
      "userId": "firebaseUid_pengguna",
      "message": "Halo semua!",
      "createdAt": "2025-10-18T14:10:00.000Z"
    }
    ```

#### `GET /chat/:groupId`

Mengambil riwayat chat dari grup.

* **Request Params:** `groupId` (ID Grup, cth: "G001")
* **Response (200):**
    ```json
    [
      {
        "id": "C001",
        "groupId": "G001",
        "userId": "firebaseUid_pengguna",
        "message": "Halo semua!",
        "createdAt": "2025-10-18T14:10:00.000Z",
        "user": {
          "id": "firebaseUid_pengguna",
          "name": "Nama Pengguna",
          "img": null
        }
      },
      ...
    ]
    ```

---

### 3. Events (`/api/events`)

#### `POST /create`

Membuat event baru.

* **Request Body:**
    ```json
    {
      "title": "Maraton Mingguan",
      "description": "Lari 5K bersama.",
      "eventType": "OFFLINE",
      "startDate": "2025-11-01T06:00:00Z",
      "endDate": "2025-11-01T08:00:00Z",
      "location": "Taman Kota",
      "isPaid": false,
      "price": 0,
      "createdById": "firebaseUid_pembuat"
    }
    ```
* **Response (200):**
    ```json
    {
      "id": "E001",
      "title": "Maraton Mingguan",
      "description": "Lari 5K bersama.",
      "img": null,
      "eventType": "OFFLINE",
      "createdById": "firebaseUid_pembuat",
      "startDate": "2025-11-01T06:00:00.000Z",
      "endDate": "2025-11-01T08:00:00.000Z",
      "location": "Taman Kota",
      "isPaid": false,
      "price": 0
    }
    ```

#### `GET /all`

Mengambil semua event.

* **Response (200):**
    ```json
    [
      {
        "id": "E001",
        "title": "Maraton Mingguan",
        ...
        "createdBy": {
          "id": "firebaseUid_pembuat",
          "name": "Nama Pembuat",
          ...
        },
        "participants": [
          {
            "user": {
              "id": "firebaseUid_peserta",
              "name": "Nama Peserta"
            }
          }
        ]
      }
    ]
    ```

#### `POST /join`

Mendaftarkan pengguna ke event.

* **Request Body:**
    ```json
    {
      "userId": "firebaseUid_peserta",
      "eventId": "E001"
    }
    ```
* **Response (200):**
    ```json
    {
      "id": "EP001",
      "eventId": "E001",
      "userId": "firebaseUid_peserta",
      "status": "REGISTERED"
    }
    ```

#### `GET /user/:userId`

Mengambil semua event yang diikuti oleh pengguna.

* **Request Params:** `userId` (Firebase UID)
* **Response (200):**
    ```json
    [
      {
        "id": "E001",
        "title": "Maraton Mingguan",
        ...
      }
    ]
    ```

---

### 4. Trainings (`/api/trainings`)

#### `POST /create`

Membuat sesi latihan baru (oleh Coach).

* **Request Body:**
    ```json
    {
      "title": "Training HIIT",
      "description": "Latihan intensitas tinggi.",
      "coachId": "firebaseUid_coach",
      "date": "2025-11-05T18:00:00Z",
      "price": 50000,
      "slots": 10
    }
    ```
* **Response (200):**
    ```json
    {
      "id": "T001",
      "title": "Training HIIT",
      "description": "Latihan intensitas tinggi.",
      "img": null,
      "coachId": "firebaseUid_coach",
      "date": "2025-11-05T18:00:00.000Z",
      "price": 50000,
      "slots": 10
    }
    ```

#### `GET /all`

Mengambil semua sesi latihan.

* **Response (200):**
    ```json
    [
      {
        "id": "T001",
        "title": "Training HIIT",
        ...
        "coach": {
          "id": "firebaseUid_coach",
          "name": "Nama Coach",
          ...
        }
      }
    ]
    ```

#### `POST /join`

Mendaftarkan pengguna ke sesi latihan (mengurangi kuota).

* **Request Body:**
    ```json
    {
      "userId": "firebaseUid_peserta",
      "trainingId": "T001"
    }
    ```
* **Response (200):**
    ```json
    {
      "message": "Successfully joined the training",
      "participant": {
        "id": "TP001",
        "trainingId": "T001",
        "userId": "firebaseUid_peserta",
        "status": "REGISTERED"
      },
      "remainingSlots": 9
    }
    ```

#### `GET /user/:userId`

Mengambil semua sesi latihan yang diikuti oleh pengguna.

* **Request Params:** `userId` (Firebase UID)
* **Response (200):**
    ```json
    [
      {
        "id": "T001",
        "title": "Training HIIT",
        ...
      }
    ]
    ```

#### `PUT /update-status/:id`

Memperbarui status partisipasi (misal: "ATTENDED").

* **Request Params:** `id` (ID Partisipan Training, cth: "TP001")
* **Request Body:**
    ```json
    {
      "status": "ATTENDED"
    }
    ```
* **Response (200):**
    ```json
    {
      "id": "TP001",
      "trainingId": "T001",
      "userId": "firebaseUid_peserta",
      "status": "ATTENDED"
    }
    ```

## Kontribusi

Kontribusi sangat diterima! Jika Anda ingin berkontribusi:

1.  **Fork** repositori ini.
2.  Buat **Branch** baru (`git checkout -b fitur/NamaFitur`).
3.  Lakukan **Commit** perubahan Anda (`git commit -m 'Menambahkan fitur...'`).
4.  **Push** ke Branch (`git push origin fitur/NamaFitur`).
5.  Buka **Pull Request**.

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT.
