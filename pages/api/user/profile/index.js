// import prisma from '@/api/_src/libs/prisma'
// import verificationToken from '@/api/_src/utils/verificationToken'
// *) Baris 1 dan 2 sengaja dikomen, tinggal buka lagi nanti kalo misal ngerjain

// API untuk update profile!
export default async function updateProfile(req, res) {
  // Method selain POST akan ditolak, jadi artinya masuk ke API ini menggunakan method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  // Tangkap data yang dikirim dari client oleh req.body
  // Misalkan yang dikirim dari client itu nama (fullName) dan umur (age), jadi assign seperti di bawah
  // const {fullName, age} = req.bdy

  // Hasil data tersebut terus simpan (update) ke database menggunakan Prisma
  // Docs : https://www.prisma.io/docs/concepts/components/prisma-client/crud

  // Jika selesai, kirim response dengan status 200 jika berhasil dan 400 jika gagal
  // Tips : Lakukan test API menggunakan Postman saja jangan langsung lewat aplikasinya
}
