import axios from "./config";

export default class projetos {
  static async getAll() {
    try {
      const projetos = await axios.get("/integrador/projetos");
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

  static async get(id) {
    try {
      const projetos = await axios.get(`/integrador/projetos/${id}`);
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

  static async create(projeto) {
    try {
      const projetos = await axios.post(`/integrador/projetos`, projeto);
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

  static async edit(id, projeto) {
    try {
      const projetos = await axios.put(`/integrador/projetos/${id}`, projeto);
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

  static async delete(id) {
    try {
      const projetos = await axios.delete(`/integrador/projetos/${id}`);
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

  static async getProjetosa() {
    try {
      const projetos = await axios.get(`/sa/projetos`);
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

  static async getProjetosJira(){
    try {
      const projetos = await axios.get(`/jira/projetos`);
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
}
