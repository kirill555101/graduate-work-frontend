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
    <v-card class="pb-4">
      <v-card-title>{{ course.name }}</v-card-title>
      <v-card-subtitle>{{ course.description }}</v-card-subtitle>

      <div class="mx-4">
        <v-divider />
        <h4 class="mt-4">Чему вы научитесь:</h4>
        <div>{{ course.will_learn }}</div>

        <h4 class="mt-4">Для кого этот курс:</h4>
        <div>{{ course.for_whom }}</div>

        <v-divider class="my-4" />
        <v-btn color="primary" @click="startCourse">Начать обучение</v-btn>
        <div v-if="user && user.type === 'courses_author'" class="d-inline-flex">
          <v-btn class="ml-2">Редактировать страницу</v-btn>
          <v-btn class="ml-2" @click="toggleProgress">Показать прогресс обучающихся</v-btn>
        </div>
      </div>
    </v-card>

    <div class="mt-4">
      <h4 class="mb-1">Отзывы прошедших курс</h4>

      <v-card v-for="review in reviews" :key="review.id" class="pa-4 mb-4">
        <h4>{{ review.student_full_name }}</h4>
        <v-rating :value="review.stars" dense half-increments readonly />
        <v-divider class="my-4" />
        <div>{{ review.description }}</div>
      </v-card>
    </div>
  </div>

  <v-dialog v-model="progressShown" width="500">
    <v-card>
      <v-card-title>Прогресс обучающихся</v-card-title>

      <v-card-text>
        <h4>Начали курс - {{ progress['true'] ? progress['true'] : 0 }}</h4>
        <h4>Прошли курс - {{ progress['false'] ? progress['false'] : 0 }}</h4>
      </v-card-text>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
export default {
  name: 'CoursePage',
  props: {
    id: String
  },
  data() {
    return {
      user: null,
      course: {},
      reviews: [],
      progressShown: false,
      progress: {}
    }
  },
  created() {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }

    this.$http.get(`/courses/${this.id}`).then(({ data: { course } }) => {
      this.course = course;
    });

    this.$http.get(`/courses/${this.id}/reviews`).then(({ data: { reviews } }) => {
      this.reviews = reviews;
    });
  },
  methods: {
    startCourse() {
      this.$http.post(`/courses/${this.id}/start`).then(({ data: { student_course } }) => {
        this.$router.push(`/course/${this.id}/lesson/${student_course.lessons_id}/theory`);
      });
    },
    toggleProgress() {
      this.progressShown = true;
      if (!this.progressShown) {
        return;
      }

      this.$http.get(`/courses/${this.id}/progress`).then(({ data: { progress } }) => {
        this.progress = progress;
      });
    }
  }
}
</script>
