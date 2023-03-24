<template>
<div>
  <v-toolbar>
    <v-btn class="pa-0 mr-5" text href="/admin/users"><h2>Все пользователи</h2></v-btn>
    <v-btn class="pa-0" text href="/admin/courses"><h2>Все курсы</h2></v-btn>

    <v-btn class="ml-auto" text to="/logout">Выйти</v-btn>
  </v-toolbar>

  <div class="pa-4 pt-8">
    <h3 class="mb-4">Все пользователи</h3>

    <v-card v-for="user in users" :key="`${user.type}_${user.id}`" class="pb-4 mb-4">
      <v-card-title>{{ user.full_name }}</v-card-title>
      <v-card-subtitle>{{ getUserTypeTranslation(user.type) }}</v-card-subtitle>
      <v-btn class="ml-4 mr-2">Изменить</v-btn>
      <v-btn color="error">Удалить</v-btn>
    </v-card>
  </div>
</div>
</template>

<script>
export default {
  name: 'AdminUsers',
  data() {
    return {
      users: []
    };
  },
  created() {
    this.$http.get('/users').then(({ data: { users } }) => {
      this.users = users;
    });
  },
  methods: {
    getUserTypeTranslation(type) {
      return type === 'courses_author' ? 'Автор курсов' : 'Обучающийся';
    }
  }
}
</script>
