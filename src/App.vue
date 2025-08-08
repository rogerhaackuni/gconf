<template>
  <v-app>
    <v-app-bar app color="primary"  height="100">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="./assets/selo.png"
          width="150"
        />
      </div>
      <v-spacer></v-spacer>
       <v-toolbar-title class="title title-menu">Projetos e Melhorias</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <v-tabs
        v-model="tab"
        class="elevation-2"
      >
      <v-tab>
        Tarefas
      </v-tab>
      <v-tab>
        Projetos
      </v-tab>
      <v-tab>
        Equipes
      </v-tab>
      <v-tab>
        Pessoas
      </v-tab>
      </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <Tarefas/>
          </v-tab-item>
            <v-tab-item>
            <Projetos/>
          </v-tab-item>
            <v-tab-item>
            <Equipes/>
          </v-tab-item>
            <v-tab-item>
            <Pessoas/>
          </v-tab-item>
        </v-tabs-items>
    </v-content>
  </v-app>
</template>

<script>
import Projetos from './components/Projetos.vue';
import Tarefas from './components/Tarefas.vue';
import Pessoas from './components/Pessoas.vue';
import Equipes from './components/Equipes.vue';
export default {
  name: 'App',

  components: {
    Projetos,
    Tarefas,
    Pessoas,
    Equipes

  },

  data: () => ({
    tab: null,
  }),
};
</script>
<style>
  .title-menu{
    color: white;
  }
</style>
