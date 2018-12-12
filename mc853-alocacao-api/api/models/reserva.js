module.exports = DAO =>
  class Reserva {
    constructor(data) {
      if (!data) {
        return null;
      }

      const {
        _id,
        sala,
        responsavel,
        matriculaResponsavel,
        horarioInicio,
        horarioFim,
        comentarios,
        externo,
      } = data;

      this._id = _id;
      this.sala = sala;
      this.responsavel = responsavel;
      this.matriculaResponsavel = matriculaResponsavel;
      this.horarioInicio = horarioInicio;
      this.horarioFim = horarioFim;
      this.comentarios = comentarios;
      this.externo = externo;
    }

    static async create(data) {
      let { sala, horarioInicio, horarioFim, matriculaResponsavel, responsavel, externo } = data;

      let error = [];
      if(!sala)
        error.push('Sala');

      if(!horarioInicio)
        error.push('Horário de Inicio');
      
      if(!horarioFim)
        error.push('Horário Fim');

      if(!matriculaResponsavel)
        error.push('Matricula não reconhecida! Por favor, refaça seu login!');

      if(!responsavel)
        error.push('Nome do responsável não reconhecido! Por favor, refaça seu login!');

      externo = String(externo);
      if(!externo || externo != 'true' && externo != 'false')
        error.push('Selecione uma opçao válida para o Público externo!');

      if(error.length > 0)
        throw new Error('Informações incompletas: ' + error.join(', '));

      let ini = new Date(horarioInicio);
      let fim = new Date(horarioFim);

      externo = externo == 'true';

      if(ini > fim){
        horarioInicio = fim.toISOString();
        horarioFim = ini.toISOString();
      }

      data = { ...data, horarioInicio, horarioFim, externo };

      const reservas = await DAO.findByRoom({ sala, horarioInicio, horarioFim });

      if (reservas.length > 0) {
        console.log('Sala já reservada!');
        console.log(reservas);

        throw new Error('Horário não disponivel');
      }

      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa');

      console.log({ data });

      const reserva = await DAO.create(data);
      return new Reserva(reserva);
    }

    static async findByRoom(data) {
      const reserva = await DAO.findByRoom(data);
      return reserva.map(r => new Reserva(r));
    }

    static async getAll() {
      const reservas = await DAO.getAll();
      return reservas.map(r => new Reserva(r));
    }
  };
