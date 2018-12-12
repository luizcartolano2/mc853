module.exports = DAO =>
  class Room {
    constructor(data) {
      const {
        _id,
        capacidade,
        cep,
        endereco,
        nome,
        instituto,
        termos,
        arCondicionado,
        acessibilidade,
      } = data;
      this.uid = _id;
      this.capacidade = capacidade;
      this.cep = cep;
      this.endereco = endereco;
      this.nome = nome;
      this.instituto = instituto;
      this.termos = termos;
      this.arCondicionado = arCondicionado;
      this.acessibilidade = acessibilidade;
    }

    static async create(data) {
      const { capacidade, cep, endereco, instituto, nome } = data;

      console.table(data);

      let error = [];
      
      if(!capacidade)
        error.push('Capacidade');

      if(!cep)
        error.push('Cep');

      if(!endereco)
        error.push('Endereco');

      if(!instituto)
        error.push('Instituto');

      if(!nome)
        error.push('Nome');

      if(error.length > 0)
        throw new Error('Informações incompletas: ' + error.join(', '));

      const room = await DAO.create(data);
      return new Room(room);
    }

    static async getSalasByInstituto(instituto) {
      const rooms = await DAO.getSalasByInstituto(instituto);
      return rooms.map(r => new Room(r));
    }

    static async findOne(...params) {
      const room = await DAO.findOne(...params);
      return room ? new Room(room) : null;
    }
  };
