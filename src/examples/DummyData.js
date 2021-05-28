export const dummyField = [
  {
    model: 'textfield',
    type: 'text',
    name: 'name',
    label: 'Nama Lengkap',
  },
  {
    model: 'autocomplete',
    name: 'faculty',
    label: 'Fakultas',
    options: [{ title: 'FMIPA' }, { title: 'FEM' }, { title: 'FAPERTA' }],
  },
  {
    model: 'checkbox',
    name: 'positions',
    label: 'Pilih divisi yang diminati',
    options: [
      { title: 'Kestari', value: 'kestari' },
      { title: 'Logstran', value: 'logstran' },
      { title: 'Humas', value: 'humas' },
    ],
  },
  {
    model: 'textarea',
    name: 'description',
    label: 'Deskripsikan dirimu',
  },
  {
    model: 'radio',
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
    model: 'datepicker',
    name: 'interviewDate',
    label: 'Pilih jadwal interview',
  },
  {
    model: 'file',
    name: 'files',
    label: 'Unggah berkas Anda',
    filesLimit: 4,
  },
]
export const dummyHistory = [
  {
    id: 'x10',
    positions: ['Kestari', 'Logstran'],
    applyDate: '2021-0101',
    status: {
      result: 'Waiting',
      message: 'Menunggu verifikasi',
    },
    campaign: {
      name: 'IT Today 2021',
    },
    organization: {
      name: 'Himalkom',
      cabinet: 'Notion',
    },
  },
  {
    id: 'x11',
    positions: ['Kestari', 'Logstran', 'Humas'],
    applyDate: '2021-0101',
    status: {
      result: 'Rejected',
      message: 'Semangat yaaa',
    },
    campaign: {
      name: 'CPSC 2021',
    },
    organization: {
      name: 'Himalkom',
      cabinet: 'Notion',
    },
  },
  {
    id: 'x12',
    positions: ['Medbrand', 'Ristek', 'LO'],
    applyDate: '2021-0101',
    status: {
      result: 'Accepted',
      message: 'Selamat nanti tunggu info selanjutnya ya...',
    },
    campaign: {
      name: 'Icons - Tech Festival 2021',
    },
    organization: {
      name: 'Himalkom',
      cabinet: 'Notion',
    },
  },
]
