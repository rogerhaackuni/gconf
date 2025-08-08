import axios from "./config";

export default class Tarefas {
  static async getAll() {
    try {
      const tarefas = await axios.get("/integrador/tarefas");
      return {
        data: tarefas.data,
        error: false
      };
    } catch (err) {
      return {
        error: err
      };
    }
  }

  static async getNotIntegrado() {
    try {
      const tarefas = await axios.get("/integrador/tarefas", { params: { 'integrado': 'N'}})
      return {
        data: tarefas.data,
        error: false
      };
    } catch (err) {
      return {
        error: err
      };
    }
  }

  static async get(id) {
    try {
      const tarefa = await axios.get(`/integrador/tarefas/${id}`);
      return {
        data: tarefas.data,
        error: false
      };
    } catch (err) {
      return {
        error: err
      };
    }
  }

  static async create(tarefa) {
    try {
      const tarefa = await axios.post(`/integrador/tarefas`, tarefa);
      return {
        data: tarefas.data,
        error: false
      };
    } catch (err) {
      return {
        error: err
      };
    }
  }

  static async edit(id, tarefa) {
    try {
      const tarefas = await axios.put(`/integrador/tarefas/${id}`, tarefa);
      return {
        data: tarefas.data,
        error: false
      };
    } catch (err) {
      return {
        error: err
      };
    }
  }

  static async delete(id) {
    try {
      const tarefas = await axios.delete(`/integrador/tarefas/${id}`);
      return {
        data: tarefas.data,
        error: false
      };
    } catch (err) {
      return {
        error: err
      };
    }
  }

  static async update() {
    try {
      const projetos = await axios.get(`/integrador/tarefas/update`);
      return {
        data: projetos.data,
        error: false
      };
    } catch (err) {
      return {
        error: err
      };
    }
  }

  static async integra(tarefasList){
      try {
          const tarefas = await axios.post('/integrador/tarefas/integrar',tarefasList )
          return {
            data: tarefas.data,
            error: false
          };
        } catch (err) {
          return {
            error: err
          };
      }
  }
}
