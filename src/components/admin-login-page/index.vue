<template>
<div>
  <div class="d-flex justify-center mt-8">
    <v-card class="pb-2" width="400">
      <v-card-title>Вход в панель адмистратора</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="login"
          class="mb-4"
          outlined
          dense
          hide-details
          label="Введите логин"
        />
        <v-text-field
          v-model="password"
          type="password"
          outlined
          dense
          hide-details
          label="Введите пароль"
        />
      </v-card-text>
      <v-card-actions class="mr-2">
        <v-spacer />
        <v-btn color="primary" @click="sendRequest">Войти</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</div>
</template>

<script>
export default {
  name: 'AdminLoginPage',
  data() {
    return {
      login: null,
      password: null
    }
  },
  methods: {
    sendRequest() {
      const params = {
        login: this.login,
        password: this.password,
        type: 'admin'
      };

      this.$http.post('/users/login', params).then(({ data: { user } }) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.$router.push('/admin/users');
      });
    }
  }
}
</script>
