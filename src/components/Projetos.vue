<template>
  <v-data-table :headers="headers" :items="projetos" sort-by="nomeJira" class="elevation-1" itens-per-page="40">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Projetos</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        
        <v-dialog
          v-model="deleteDialog"
          max-width="350"
        >
          <v-card>
          <v-card-title >Tem certeza que deseja deletar esse projeto?</v-card-title>
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
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Novo Projeto</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" style="padding-top:0; padding-bottom:0">
                    <v-autocomplete
                      @change="onChangeSelect"
                      :items="projetosSa"
                      dense
                      filled
                      label="Nome Projeto SA"
                      item-text="name"
                      item-value="id"
                    >
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" style="padding-top:0; padding-bottom:0">
                    <v-autocomplete
                      @change="onChangeSelectJira"
                      :items="projetosJira"
                      dense
                      filled
                      label="Nome Projeto Jira"
                      item-text="name"
                      item-value="key"
                    >
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="24" sm="12" md="12" style="padding-top:0; padding-bottom:0">
                    <v-text-field v-model="editedItem.chave" label="Chave Jira"></v-text-field>
                  </v-col>
                  <v-col cols="12" style="padding-top:0; padding-bottom:0">
                    <v-text-field
                      v-model="editedItem.nomeJira"
                      label="Nome Projeto Jira"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" style="padding-top:0; padding-bottom:0">
                    <v-text-field v-model="editedItem.idJira" label="Id Jira)"></v-text-field>
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
import Projetos from "../api/projetos";

export default {
  data: () => ({
    dialog: false,
    deleteDialog: false,
    projetoSa: "",
    projetoJira:"",
    deletedItem: "",
    headers: [
      {
        text: "Chave Jira",
        value: "chave"
      },
      { text: "Nome Projeto SA", value: "nomeSa" },
      { text: "Nome Projeto Jira", value: "nomeJira" },
      { text: "Id Jira", value: "idJira" },
      { text: "Id SA", value: "idSa" },
      { text: "Ações", value: "acoes"},
    ],
    projetos: [],
    projetosJira:[],
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
      let response = await Projetos.getAll();
      if (!response.error) {
        this.projetos = response.data;
      }
      response = await Projetos.getProjetosa();
      if (!response.error) {
        this.projetosSa = response.data;
      }
      response = await Projetos.getProjetosJira()
      if (!response.error){
        this.projetosJira = response.data;
        debugger
      }
    },

    onChangeSelect(e) {
      this.editedItem.idSa = e;
      console.log('ID SA: ' + e);
      console.log(this.projetosSa);

      console.log(this.projetosSa.find(item => item.id === e).name);
      this.editedItem.nomeSa = this.projetosSa.find(item => item.id === e).name;
    },

    onChangeSelectJira(e) {
      this.editedItem.chave = e;
      this.editedItem.nomeJira = this.projetosJira.find(item => item.key === e).name;
      this.editedItem.idJira = this.projetosJira.find(item => item.key === e).id
    },


    editItem(item) {
      this.editedIndex = this.projetos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.projetoSa = this.editedItem.idSa
      this.dialog = true;
    },
    openDeleteModal(item) {
      this.deletedItem = item;
      this.deleteDialog = true;
    },
    deleteItem(item) {
      const index = this.projetos.indexOf(this.deletedItem);
      Projetos.delete(this.deletedItem.id);
      this.projetos.splice(index, 1);
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
        await Projetos.edit(this.editedItem.id, this.editedItem);
        Object.assign(this.projetos[this.editedIndex], this.editedItem);
      } else {
        await Projetos.create(this.editedItem);
        this.projetos.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
