module.exports = (DAO, Reserva) =>
  class PedidoReserva {
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

      const reservas = await Reserva.findByRoom({ sala, horarioInicio, horarioFim });

      if (reservas.length > 0) {
        console.log('A sala já está reservada neste horário!');
        console.log(pedidos);

        throw new Error('A sala já está reservada neste horário!');
      }

      const pedidos = await DAO.findByRoom({ sala, horarioInicio, horarioFim, matriculaResponsavel });

      if (pedidos.length > 0) {
        console.log('Pedido de reserva já existe para este horario!');
        console.log(pedidos);

        throw new Error('Pedido de reserva já existe neste horário!');
      }

      console.log({ data });

      const pedido = await DAO.create(data);
      return new PedidoReserva(pedido);
    }

    static async findByRoom(data) {
      const pedidos = await DAO.findByRoom(data);
      return pedidos.map(r => new PedidoReserva(r));
    }

    static async getAll() {
      const pedidos = await DAO.getAll();
      return pedidos.map(r => new PedidoReserva(r));
    }

    static async confirmaReserva(_id){
      let pedido = await DAO.findOne({ _id });
      console.log('PEDIDO ---> ', pedido);

      delete pedido._id;
      let reserva = await Reserva.create(pedido);

      if(reserva)
        await DAO.remove({ _id });

      return reserva ? new Reserva(reserva) : null;
    }

    static async recusaReserva(_id){
      await DAO.remove({ _id });

      return true;
    }

    static async findOne(_id){
      const pedido = await DAO.findOne({ _id });
      console.log(`AGGORA VAI -->`, pedido);
      return pedido ? new Pedido(pedido) : null;
    }
  };
