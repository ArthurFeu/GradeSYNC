<template>
  <v-app>
    <MenuDrawer />
    <br>
    <v-main>
      <v-container>
        <div class="d-flex justify-space-between">
          <div class="d-flex justify-center w-75">
            <v-text-field
              label="Buscar alunos por RA, NOME ou CPF"
              variant="outlined"
              append-inner-icon="mdi-magnify"
              v-model="search"
            ></v-text-field>
          </div>
          <div class="">
            <v-btn color="primary" dark class="h-75" to="createStudent">Cadastrar Aluno</v-btn>
          </div>
        </div>
        <StudentList :search="search" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import MenuDrawer from '@/components/MenuDrawer.vue';
import StudentList from '@/components/StudentList.vue';

const search = ref('');
</script>
