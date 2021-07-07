'use strict';
const pool = require('./pool');

class Interface {
  constructor(model) {
    this.model = model;
  }

  read(id) {
    if (id) {
      return pool.query('SELECT * FROM $1 WHERE id=$2;', [this.model, id]);
    }
    return pool.query('SELECT * FROM $1;', [this.model]);
  }

  create(obj) {
    const sql = 'INSERT INTO $1  VALUES ($2) RETURNING *;';
    const safeValues = [this.model, obj];
    return pool.query(sql, safeValues);
  }

  update(id, obj) {
    const sql = 'UPDATE $1 SET $2 WHERE id=$3 RETURNING *;';
    const safeValues = [this.model, obj, id];
    return pool.query(sql, safeValues);
  }

  delete(id) {
    return pool.query('DELETE FROM $1 WHERE id=$2 RETURNING *;', [this.model, id]);
  }
}

module.exports = Interface;