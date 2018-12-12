module.exports = DAO =>
  class Institute {
    constructor(data) {
      const {
        _id,
        name,
        responsavel,
        cep,
        endereco,
      } = data;
      this.uid = _id;
      this.name = name;
      this.responsavel = responsavel;
      this.cep = cep;
      this.endereco = endereco;
    }

    static async create(data) {
      const { name, responsavel, cep, endereco } = data;

      let error = [];

      if(!name)
        error.push('Nome');

      if(!cep)
        error.push('Cep');

      if(!endereco)
        error.push('Endereco');

      if(!responsavel)
        error.push('responsavel');

      if(error.length > 0)
        throw new Error('Informações incompletas: ' + error.join(', '));

      const institute = await DAO.create(data);
      return new Institute(institute);
    }

    static async getAll(){
      const institutes = await DAO.getAll();
      return institutes.map(i => new Institute(i));
    }

    static async findOne(...params) {
      const institute = await DAO.findOne(...params);
      return institute ? new Institute(institute) : null;
    }
  };
