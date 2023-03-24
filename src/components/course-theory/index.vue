<template>
<div>
  <v-toolbar>
    <v-btn class="pa-0" text href="/"><h2>Все курсы</h2></v-btn>

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
    <v-card class="pb-2">
      <v-card-title>{{ lesson.name }}</v-card-title>
      <v-card-subtitle v-html="lesson.theory" />
      <v-card-actions class="mr-2">
        <v-spacer />
        <v-btn :to="practiseHref" color="primary">Перейти к практике</v-btn>
        <v-btn v-if="user && user.type === 'courses_author'" class="ml-2">Редактировать страницу</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</div>
</template>

<script>
export default {
  name: 'CourseTheory',
  props: {
    id: String,
    lessons_id: String
  },
  data() {
    return {
      user: null,
      lesson: {}
    }
  },
  computed: {
    practiseHref() {
      return `/course/${this.id}/lesson/${this.lesson.id}/practice`
    }
  },
  created() {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }

    this.$http.get(`/courses/${this.id}/lessons/${this.lessons_id}`).then(({ data: { lesson } }) => {
      this.lesson = lesson;
    });
  }
}
</script>
