class User {
    constructor( nome, email, senha, tipo) {
      this.nome = nome;
      this.email = email;
      this.senha = senha;
      this.tipo = tipo; // "admin" ou "estagiario"
    }
  }
  module.exports = User;