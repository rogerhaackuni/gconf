<template>
<div>
  <v-data-table :headers="headers" :items="tarefas" sort-by="nomeJira" class="elevation-1" items-per-page="50">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Tarefas Pendentes</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="update()">Atualizar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="selecionarTudo()">Selecionar Tudo</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="limparSelecao()">Limpar Seleção</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="integrar()">Integrar Selecionados</v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.acoes="{ item }">
    <v-checkbox v-model="selected"  :value="item.id"></v-checkbox>
    </template>
    
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
</div>
</template>

<script>
import Tarefas from "../api/tarefas";
import Projetos from "../api/projetos";

export default {
  data: () => ({
    selected: [],
    loading: true,
    headers: [
      {
        text: "WBS",
        value: "wbs"
      },
      { text: "Tarefa", value: "descricao" },
      { text: "Projeto", value: "nomeSa" },
      { text: "Responsável", value: "nome" },
      { text: "Data Fim", value: "dataFim" },
      { text: "Ações", value: "acoes"},
    ],
    tarefas: [],
    projetosSa:[],
    editedIndex: -1,
    editedItem: {
      chave: "",
      nomeSa: "",
      nomeJira: "",
      idJira: 0,
      idSa: 0
    },
    defaultItem: {
      chave: "",
      nomeSa: "",
      nomeJira: "",
      idJira: 0,
      idSa: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Projeto" : "Editar Projeto";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      let response = await Tarefas.getNotIntegrado();
      if (!response.error) {
        this.tarefas = response.data;
      }
      response = await Projetos.getProjetosa();
      if (!response.error) {
        this.projetosSa = response.data;
      }
      this.loading=false
    },

    selecionarTudo(){
        this.selected = []
        this.tarefas.forEach(e=>{
            this.selected.push(e.id);
        })
    },
    limparSelecao(){
        this.selected = []
    },
    
    async update(){
        this.loading=true
        let response = await Tarefas.update()
        if (!response.error){
        let response = await Tarefas.getNotIntegrado();
        if (!response.error) {
            this.tarefas = response.data;
            this.loading = false;
        }
        }
    },

    async integrar() {
        this.loading =true
        let response = await Tarefas.integra(this.selected)
        if (!response.error){
            let response = await Tarefas.getNotIntegrado();
            if (!response.error) {
            this.tarefas = response.data;
            }
            this.selected = []
            this.loading = false
        }

    },
  }
};
</script>
