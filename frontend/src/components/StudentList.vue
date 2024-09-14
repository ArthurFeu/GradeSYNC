<template>
  <div class="justify-center w-screen h-screen">
    <div class="d-flex justify-center w-auto h-auto border rounded-lg">
      <v-table>
        <tbody style="text-align: center;">
          <tr style="font-weight: bold;">
            <td>Registro Acadêmico</td>
            <td>Nome</td>
            <td>CPF</td>
            <td>Ações</td>
          </tr>
          <!-- student filter -->
          <tr v-for="student in filteredStudents" :key="student.id">
            <td>{{ student.ra }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.cpf }}</td>
            <td>
              <v-btn color="primary" text @click="editStudent(student.id)">Editar</v-btn>
              &nbsp;
              <StudentDelete :studentId="student.id" />
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import StudentDelete from '@/components/StudentDelete.vue';
import { useRouter } from 'vue-router';
import { getAllStudents } from '@/service/studentService';

const students = ref([]);
const router = useRouter();
const props = defineProps(['search']);

const fetchStudents = async () => {
  try {
    students.value = await getAllStudents();
  } catch (error) {
    console.error('There was an error fetching the students:', error);
  }
};

const editStudent = (studentId) => {
  router.push({ name: 'EditStudent', params: { studentId } });
};

// filter for students on search bar
const filteredStudents = computed(() => {
  if (!props.search) {
    return students.value;
  }
  return students.value.filter(student => 
    student.name.toLowerCase().includes(props.search.toLowerCase()) ||
    student.ra.includes(props.search) ||
    student.cpf.includes(props.search)
  );
});

onMounted(() => {
  fetchStudents();
});

</script>
