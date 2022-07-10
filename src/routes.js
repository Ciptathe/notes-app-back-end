const {
  addNoteHandler, tampilsemuacatatan, tampildetailcatatan, editdetaicatatan, hapuscatatan,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: tampilsemuacatatan,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: tampildetailcatatan,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editdetaicatatan,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: hapuscatatan,
  },
];

module.exports = routes;
