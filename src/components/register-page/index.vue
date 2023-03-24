<template>
<div>
  <v-toolbar>
    <v-btn class="pa-0" text href="/">
      <h2>Все курсы</h2>
    </v-btn>

    <div v-if="user" class="d-flex justify-end ml-auto">
      <div class="my-auto mr-2">Вы вошли как {{ user.full_name }}</div>
      <div v-if="user.type === 'courses_author'">
        <v-btn text to="/courses">Мои курсы</v-btn>
      </div>
      <div v-else>
        <v-btn text to="/certificates">Мои сертификаты</v-btn>
      </div>
      <v-btn text to="/logout">Выйти</v-btn>
    </div>

    <div v-else class="d-flex justify-end ml-auto">
      <v-btn class="mr-2" color="primary" to="/login">Войти</v-btn>
      <v-btn color="secondary" to="/register">Зарегистрироваться</v-btn>
    </div>
  </v-toolbar>

  <div class="d-flex justify-center mt-8">
    <v-card class="pb-2" width="400">
      <v-card-title>Регистрация</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="email"
          outlined
          dense
          hide-details
          label="Введите email"
        />
        <v-text-field
          v-model="login"
          class="my-4"
          outlined
          dense
          hide-details
          label="Введите логин"
        />
        <v-text-field
          v-model="fullName"
          class="my-4"
          outlined
          dense
          hide-details
          label="Введите ФИО"
        />
        <v-text-field
          v-model="password"
          type="password"
          outlined
          dense
          hide-details
          label="Введите пароль"
        />
        <v-text-field
          v-model="confirmPassword"
          type="password"
          class="my-4"
          outlined
          dense
          hide-details
          label="Введите пароль повторно"
        />
        <v-radio-group v-model="type" label="Выберите тип аккаунта" dense hide-details>
          <v-radio label="Обучающийся" value="student" />
          <v-radio label="Автор курсов" value="courses_author" />
        </v-radio-group>
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
  name: 'RegisterPage',
  data() {
    return {
      user: null,
      email: null,
      login: null,
      fullName: null,
      password: null,
      confirmPassword: null,
      type: 'student'
    }
  },
  created() {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }
  },
  methods: {
    sendRequest() {
      const params = {
        email: this.email,
        login: this.login,
        full_name: this.fullName,
        password: this.password,
        type: this.type
      };

      this.$http.post('/users/register', params).then(({ data: { user } }) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.$router.push('/');
      });
    }
  }
}
</script>
