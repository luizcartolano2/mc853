module.exports = DAO =>
  class User {
    constructor(data) {
      const {
        _id,
        matricula,
        senha,
        nome,
        email,
        type,
      } = data;
      this._id = _id;
      this.matricula = matricula;
      this.senha = senha;
      this.nome = nome;
      this.email = email;
      this.type = type
    }

    static async create(data) {
      const user = await DAO.create(data);
      return new User(user);
    }

    static async findOne(...params) {
      const user = await DAO.findOne(...params);
      return user? new User(user) : null;
    }
  };
