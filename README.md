## Contributing

### Installation

Cara berkontribusi pada repositori ini adalah dengan mengikuti langkah-langkah seperti di bawah ini :

Pastikan telah meng-_install_ `git` dan `yarn` serta telah menyiapkan database **PostgreSQL** secara lokal.
Cara memeriksa ketersediaan (versi) `git` dan `yarn` Anda, dengan cara `git --version` dan `yarn --version`

1. Clone repo ini menggunakan perintah `git clone https://github.com/nurulakbaral/ipb-recruitment-app.git`
2. Install _dependencies_ dengan cara `yarn install`
3. Tambahkan file `.env.local`
4. Masukkan _source code_ yang ada di `.env.example` dan masukkan ke dalam `.env.local`
5. Jalankan App dengan perintah `yarn run dev`

### Notes

Sebelum melakukan `push` atau `pull request` pada repositori ini lakukan penge-_check_-an _formatting_ terlebih dahulu agar _code style_-nya bisa konsisten untuk semua kontributor. Berikut langkah-langkahnya :

1. Lakukan perintah `yarn run check-prettier` lalu tunggu. Jika terdapat _error_ lakukan perintah lainnya yaitu `yarn run use-prettier`.
2. Setelelah itu lakukan perintah `yarn run check-eslint` lalu tunggu. Jika terdapat _error_, cari letak kesalahannya lalu perbaiki.
3. Jika selesai semua lakukan perintah keduanya yaitu dengan perintah `yarn run check-all` lalu tunggu. Jika ada _error_ kembali ke langkah satu dan perbaiki.
