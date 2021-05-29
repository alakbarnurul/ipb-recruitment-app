## Contributing

### Installation

Cara berkontribusi pada repositori ini adalah dengan mengikuti langkah-langkah seperti di bawah ini :

Pastikan telah meng-_install_ `git` dan `yarn`. Cara memeriksa ketersediaan (versi) `git` dan `yarn` Anda, dengan cara `git --version` dan `yarn --version`.

Project ini menggunakan PostgreSQL sebagai RDBMS-nya, sehingga Anda harus menyiapkannya terlebih dahulu. Ketika proses peng-_install_-an PosgreSQL, harap untuk mengingat **username**, **password**, dan **port** nya. Secara _default_ PostgreSQL menggunakan _password_ **postgres** dan _port_ **5432**.

1. Clone repo ini menggunakan perintah `git clone https://github.com/nurulakbaral/ipb-recruitment-app.git`
2. Install _dependencies_ dengan cara `yarn install`
3. Tambahkan file `.env.local` pada _directory root_ dan tambahkan file `.env` pada folder `prisma`. 
4. Masukkan _source code_ yang ada di `.env.example` (yang terdapat pada _directory root_) dan masukkan ke dalam `.env.local` dan `.env.example` yang ada di folder `prisma` ke dalam `.env` yang telah dibuat di dalam folder `prisma`
5. Masukkan _username_, _password_, dan nama _database_ pada `DATABASE_URL` tersebut (untuk nama _database_ itu bebas saja).
6. Lakukan perinta `npx prisma migrate dev --name init` untuk inisialisasi Schema database yang telah dibuat.
7. Lakukan perintah `npx prisma studio` untuk menjalankan GUI dari pengelolaan database.
8. Terakhir adalah jalankan App dengan perintah `yarn run dev`

### Notes

Sebelum melakukan `push` atau `pull request` pada repositori ini lakukan penge-_check_-an _formatting_ terlebih dahulu agar _code style_-nya bisa konsisten untuk semua kontributor. Berikut langkah-langkahnya :

1. Lakukan perintah `yarn run check-prettier` lalu tunggu. Jika terdapat _error_ lakukan perintah lainnya yaitu `yarn run use-prettier`.
2. Setelelah itu lakukan perintah `yarn run check-eslint` lalu tunggu. Jika terdapat _error_, cari letak kesalahannya lalu perbaiki.
3. Jika selesai semua lakukan perintah keduanya yaitu dengan perintah `yarn run check-all` lalu tunggu. Jika ada _error_ kembali ke langkah satu dan perbaiki.
