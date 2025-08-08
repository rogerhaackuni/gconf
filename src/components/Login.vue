
<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-model="username" label="Usuários" name="username" prepend-icon="mdi-account" type="text"
                required></v-text-field>

              <v-text-field v-model="password" label="Senha" name="password" prepend-icon="mdi-lock" type="password"
                required></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login" :loading="loading">
              Entrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    username: '',
    password: '',
    loading: false,
  }),
  methods: {
    async login() {
      this.loading = true;
      try {
        // Simulate login process - replace with your actual authentication logic
        await new Promise(resolve => setTimeout(resolve, 1000));

        // For demo purposes, accept any username/password combination
        if (this.username && this.password) {
          // Store authentication state
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('username', this.username);

          // Emit login event to parent component
          this.$emit('login-success');
        } else {
          alert('Por favor, preencha todos os campos');
        }
      } catch (error) {
        console.error('Erro no login:', error);
        alert('Erro ao fazer login');
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.v-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
