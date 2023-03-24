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
    <v-card class="pb-4">
      <div class="mx-4">
        <div class="text-h3 pt-4">СЕРТИФИКАТ</div>
        <div class="text-h5">об успешном окончании обучения по курсу {{ certificate.course_name }}</div>

        <v-divider class="my-4" />
        <h4 class="mb-2 text-h6">{{ certificate.student_full_name }}</h4>
        <div class="text-h6">{{ formatDate(certificate.updated_at) }}</div>
      </div>
    </v-card>
  </div>
</div>
</template>

<script>
export default {
  name: 'UserCertificate',
  props: {
    id: String
  },
  data() {
    return {
      user: null,
      certificate: {}
    }
  },
  created() {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }

    this.$http.get(`/certificates/${this.id}`).then(({ data: { certificate } }) => {
      this.certificate = certificate;
    });
  },
  methods: {
    formatDate(updatedAt) {
      const date = new Date(updatedAt);
      return Intl.DateTimeFormat('ru-ru').format(date);
    }
  }
}
</script>
