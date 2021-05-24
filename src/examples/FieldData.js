export const dummyDataField = [
  {
    type: 'textfield',
    name: 'name',
    label: 'Nama Lengkap',
  },
  {
    type: 'autocomplete',
    name: 'faculty',
    label: 'Fakultas',
    options: [{ title: 'FMIPA' }, { title: 'FEM' }, { title: 'FAPERTA' }],
  },
  {
    type: 'checkbox',
    name: 'positions',
    label: 'Pilih divisi yang diminati',
    options: [
      { title: 'Kestari', value: 'kestari' },
      { title: 'Logstran', value: 'logstran' },
      { title: 'Humas', value: 'humas' },
    ],
  },
  {
    type: 'textarea',
    name: 'description',
    label: 'Deskripsikan dirimu',
  },
  {
    type: 'radio',
    name: 'comitment',
    label: 'Komitmen Anda pada kepengurusan ini',
    options: [
      { title: 1, value: 1 },
      { title: 2, value: 2 },
      { title: 3, value: 3 },
      { title: 4, value: 4 },
    ],
  },
  {
    type: 'datepicker',
    name: 'interviewDate',
    label: 'Pilih jadwal interview',
  },
  {
    type: 'file',
    name: 'files',
    label: 'Unggah berkas Anda',
    filesLimit: 4,
  },
]
