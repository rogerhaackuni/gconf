import axios from "./config";

export default class Equipes {
  static async getAll() {
    try {
      const equipe = await axios.get("/integrador/equipes");
      return {
        data: equipe.data,
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
      const equipes = await axios.get(`/integrador/equipes/${id}`);
      return {
        data: equipes.data,
        error: false
      };
    } catch (err) {
      return {
        error: err
      };
    }
  }

  static async create(equipe) {
    try {
      const equipes = await axios.post(`/integrador/equipes`, equipe);
      return {
        data: equipes.data,
        error: false
      };
    } catch (err) {
      return {
        error: err
      };
    }
  }

  static async edit(id, equipe) {
    try {
      const equipes = await axios.put(`/integrador/equipes/${id}`, equipe);
      return {
        data: equipes.data,
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
      const equipes = await axios.delete(`/integrador/equipes/${id}`);
      return {
        data: equipes.data,
        error: false
      };
    } catch (err) {
      return {
        error: err
      };
    }
  }
}