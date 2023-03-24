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
    <h3>Мои курсы</h3>
    <v-btn class="my-4">Создать курс</v-btn>

    <v-card v-for="course in courses" :key="course.id" class="pb-4 mb-4">
      <v-card-title>{{ course.name }}</v-card-title>
      <v-card-subtitle>{{ course.author_full_name }}</v-card-subtitle>
      <v-card-text>
        <div class="mb-2">{{ course.description }}</div>

        <v-rating :value="course.stars" dense half-increments readonly />
      </v-card-text>

      <v-btn class="ml-4 mr-2" color="primary" :to="getCourseHref(course.id)">Перейти</v-btn>
      <v-btn color="error">Удалить</v-btn>
    </v-card>
  </div>
</div>
</template>

<script>
export default {
  name: 'AuthorCourses',
  data() {
    return {
      user: null,
      courses: []
    };
  },
  created() {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }

    const params = { author_id: this.user.id };

    this.$http.get('/courses', { params }).then(({ data: { courses } }) => {
      this.courses = courses;
    });
  },
  methods: {
    getCourseHref(id) {
      return `/course/${id}`;
    }
  }
}
</script>
