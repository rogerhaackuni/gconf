import axios from "./config";

export default class Pessoas {
  static async getAll() {
    try {
      const pessoa = await axios.get("/integrador/pessoas");
      return {
        data: pessoa.data,
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
      const pessoas = await axios.get(`/integrador/pessoas/${id}`);
      return {
        data: pessoas.data,
        error: false
      };
    } catch (err) {
      return {
        error: err
      };
    }
  }

  static async create(pessoa) {
    try {
      const pessoas = await axios.post(`/integrador/pessoas`, pessoa);
      return {
        data: pessoas.data,
        error: false
      };
    } catch (err) {
      return {
        error: err
      };
    }
  }

  static async edit(id, pessoa) {
    try {
      const pessoas = await axios.put(`/integrador/pessoas/${id}`, pessoa);
      return {
        data: pessoas.data,
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
      const pessoas = await axios.delete(`/integrador/pessoas/${id}`);
      return {
        data: pessoas.data,
        error: false
      };
    } catch (err) {
      return {
        error: err
      };
    }
  }

  static async getpessoasJira() {
    try {
      const pessoas = await axios.get(`/jira/usuarios`);
      return {
        data: pessoas.data,
        error: false
      };
    } catch (err) {
      return {
        error: err
      };
    }
  }
}
