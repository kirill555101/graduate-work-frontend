<template>
<div>
  <v-toolbar>
    <v-btn class="pa-0 mr-5" text href="/admin/users"><h2>Все пользователи</h2></v-btn>
    <v-btn class="pa-0" text href="/admin/courses"><h2>Все курсы</h2></v-btn>

    <v-btn class="ml-auto" text to="/logout">Выйти</v-btn>
  </v-toolbar>

  <div class="pa-4 pt-8">
    <h3 class="mb-4">Все курсы</h3>

    <v-card v-for="course in courses" :key="course.id" class="pb-4 mb-4">
      <v-card-title>{{ course.name }}</v-card-title>
      <v-card-subtitle>{{ course.author_full_name }}</v-card-subtitle>
      <v-btn class="ml-4 mr-2">Изменить</v-btn>
      <v-btn color="error">Удалить</v-btn>
    </v-card>
  </div>
</div>
</template>

<script>
export default {
  name: 'AdminCourses',
  data() {
    return {
      courses: []
    };
  },
  created() {
    this.$http.get('/courses').then(({ data: { courses } }) => {
      this.courses = courses;
    });
  }
}
</script>
