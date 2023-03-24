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
    <v-card class="pb-2 mb-4">
      <v-card-title>{{ lesson.name }}</v-card-title>
      <v-card-subtitle v-html="lesson.task" />
      <v-card-actions class="mr-2">
        <v-spacer />
        <v-btn :to="theoryHref" color="primary">Перейти к теории</v-btn>
        <v-btn outlined disabled>Перейти к следующему уроку</v-btn>
        <v-btn v-if="user && user.type === 'courses_author'" class="ml-2">Редактировать страницу</v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="pb-2">
      <v-card-title>Редактор</v-card-title>

      <div class="d-flex">
        <code-editor
        v-model="code"
        :languages="[['python', 'Python']]"
        class="mx-4"
        width="800px"
        height="500px"
        theme="light"
      />
        <diagram-drawer :tree="tree" />
      </div>

      <v-card-subtitle v-if="passed !== null">
        Результат: {{ passed ? 'правильный' : 'неправильный' }}
      </v-card-subtitle>

      <v-card-actions class="mt-1 mr-2">
        <v-spacer />
        <v-btn color="primary">Проверить</v-btn>
        <v-btn outlined color="secondary" @click="makeTree">Построить схему алгоритма</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</div>
</template>

<script>
import CodeEditor from 'simple-code-editor';
import DiagramDrawer from './diagram-drawer'

export default {
  name: 'CoursePractice',
  props: {
    id: String,
    lessons_id: String
  },
  components: {
    CodeEditor,
    DiagramDrawer
  },
  data() {
    return {
      user: null,
      lesson: {},
      code: '',
      tree: {},
      passed: null
    }
  },
  computed: {
    theoryHref() {
      return `/course/${this.id}/lesson/${this.lesson.id}/theory`
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
  },
  methods: {
    makeTree() {
      this.$http
        .post('code_commands/generate_tree', { code: this.code.replaceAll('    ', "\t") })
        .then(({ data: { tree } }) => {
          this.tree = tree;
        });
    }
  }
}
</script>
