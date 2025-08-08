<template>
  <v-data-table :headers="headers" :items="pessoas" sort-by="nomeJira" class="elevation-1" itens-per-page="50">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Pessoas</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        
        <v-dialog
          v-model="deleteDialog"
          max-width="350"
        >
          <v-card>
          <v-card-title >Tem certeza que deseja deletar essa pessoa?</v-card-title>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="deleteDialog = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="deleteItem"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Nova Pessoa</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="24" sm="12" md="12" style="padding-top:0; padding-bottom:0">
                    <v-text-field v-model="editedItem.nome" label="Nome"></v-text-field>
                  </v-col>
                  <v-col cols="12" style="padding-top:0; padding-bottom:0">
                    <v-autocomplete
                      @change="onChangeSelect"
                      :items="pessoasJira"
                      dense
                      filled
                      label="Usuário do Jira"
                      item-text="displayName"
                      item-value="accountId"
                    >
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="24" sm="12" md="12" style="padding-top:0; padding-bottom:0">
                    <v-text-field v-model="editedItem.idSaUser" label="Id SA"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.acoes="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="openDeleteModal(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import Pessoas from "../api/pessoas";

export default {
  data: () => ({
    dialog: false,
    deleteDialog: false,
    pessoaJira: "",
    pessoas:[],
    deletedItem: "",
    headers: [
      {
        text: "Nome",
        value: "nome"
      },
      { text: "Id SA", value: "idSaUser" },
      { text: "Nome Jira", value: "nomeJira" },
      { text: "Id Jira", value: "idJira" },
      { text: "Ações", value: "acoes"},
    ],
    pessoasJira:[],

    editedIndex: -1,
    editedItem: {
      nome: "",
      nomeSa: "",
      nomeJira: "",
      idJira: 0,
      idSaUser: 0,
      idEquipe:null,
    },
    defaultItem: {
      nome: "",
      nomeSa: "",
      nomeJira: "",
      idJira: 0,
      idSaUser: 0,
      idEquipe:null,
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Usuário" : "Editar Usuário";
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
      let response = await Pessoas.getAll();
      if (!response.error) {
        this.pessoas = response.data;
      }
      response = await Pessoas.getpessoasJira();
      debugger
      if (!response.error) {
        this.pessoasJira = response.data;
      }
    },

    onChangeSelect(e) {
      this.editedItem.idJira = e;
      this.editedItem.nomeJira = this.pessoasJira.find(item => item.accountId === e).displayName;
    },

    editItem(item) {
      this.editedIndex = this.pessoas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      debugger
      this.pessoaJira = this.editedItem.accountId
      this.dialog = true;
    },
    openDeleteModal(item) {
      this.deletedItem = item;
      this.deleteDialog = true;
    },
    deleteItem(item) {
      const index = this.pessoas.indexOf(this.deletedItem);
      Pessoas.delete(this.deletedItem.id);
      this.pessoas.splice(index, 1);
      this.deleteDialog = false;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        await Pessoas.edit(this.editedItem.id, this.editedItem);
        Object.assign(this.pessoas[this.editedIndex], this.editedItem);
      } else {
        await Pessoas.create(this.editedItem);
        this.pessoas.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
