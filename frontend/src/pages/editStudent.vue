<template>
  <v-app>
    <MenuDrawer />
    <v-main>
      <v-container>
        <div class="w-screen h-screen border rounded-lg">
          <v-card-title>Edição de Aluno</v-card-title>
          <StudentFormEdit :student="student" />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MenuDrawer from '@/components/MenuDrawer.vue';
import StudentFormEdit from '@/components/StudentFormEdit.vue';
import axios from 'axios';

const route = useRoute();
const studentId = route.params.studentId;
const student = ref(null);

const fetchStudent = async () => {
  try {
    const response = await axios.get(`students/${studentId}`);
    student.value = response.data;
	console.log('Student fetched: ', student.value);
  } catch (error) {
    console.error('There was an error fetching the student:', error);
  }
};

onMounted(() => {
  fetchStudent();
});
</script>
