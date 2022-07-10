const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload; // payload untuk simpan data dari yang di input client/user

  const id = nanoid(16);// nanoid merupakan salah satu library untuk menyimpan data id secara unik, 16 merupakan ukuran dari stringnya
  const createdAt = new Date().toISOString(); // toISOString format tanggal yg rapi
  const updatedAt = createdAt;

  const newNote = { // Kita sudah memiliki properti dari objek catatan secara lengkap. Sekarang, saatnya kita masukan nilai-nilai tersebut ke dalam array notes menggunakan method push().
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0; // Kita bisa memanfaatkan method filter() berdasarkan id catatan untuk  menentukan apakah newNote sudah masuk ke dalam array notes?

  // kemudian kita membuat response jika sukses maka akan keluar pemberitahuan

  if (isSuccess) {
    const response = h.response({
      status: 'sukses!!',
      message: 'catatan berhasil ditambah',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'gagal',
    message: 'catatan gagal disimpan',

  });
  response.code(501);
  return response;
};

const tampilsemuacatatan = () => ({
  status: 'sukses!!',
  data: {
    notes,
  },
});

const tampildetailcatatan = (request, h) => {
  const { id } = request.params; // Pertama, kita dapatkan dulu nilai id dari request.params.

  const note = notes.filter((n) => n.id === id)[0]; // Setelah mendapatkan nilai id, dapatkan objek note dengan id tersebut dari objek array notes. Manfaatkan method array filter() untuk mendapatkan objeknya.

  if (note !== undefined) {
    return {
      status: 'sukses!!',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'gagal menampilkan data',
  });
  response.code(404);
  return response;
};

const editdetaicatatan = (request, h) => {
  const { id } = request.params; // atatan yang diubah akan diterapkan sesuai dengan id yang digunakan pada route parameter. Jadi, kita perlu mendapatkan nilai id-nya terlebih dahulu.
  const { title, tags, body } = request.payload; // Setelah itu, kita dapatkan data notes terbaru yang dikirimkan oleh client melalui body request.
  const updatedAt = new Date().toISOString();

  // Data terbaru sudah siap, saatnya mengubah catatan lama dengan data terbaru. Kita akan mengubahnya dengan memanfaatkan indexing array,
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'catatan berhasil di update',

    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'gagal!!',
    message: 'gagal totall gagal',

  });
  response.code(404);
  return response;
};

const hapuscatatan = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler, tampilsemuacatatan, tampildetailcatatan, editdetaicatatan, hapuscatatan,
};
