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

  <div class="pa-4 pt-8">
    <h3 class="mb-4">Мои сертификаты</h3>

    <v-card v-for="certificate in certificates" :key="certificate.id" :to="getCertificateHref(certificate.id)">
      <v-card-title>{{ certificate.course_name }}</v-card-title>
      <v-card-subtitle>{{ formatDate(certificate.updated_at) }}</v-card-subtitle>
    </v-card>
  </div>
</div>
</template>

<script>
export default {
  name: 'UserCertificates',
  data() {
    return {
      user: null,
      certificates: []
    };
  },
  created() {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }

    this.$http.get('/certificates').then(({ data: { certificates } }) => {
      this.certificates = certificates;
    });
  },
  methods: {
    getCertificateHref(id) {
      return `/certificate/${id}`;
    },
    formatDate(updatedAt) {
      const date = new Date(updatedAt);
      return Intl.DateTimeFormat('ru-ru').format(date);
    }
  }
}
</script>
