<template>
  <v-app>
    <MenuDrawer />

    <v-main>
      <v-container>
        <div class="d-flex justify-center w-screen h-screen border rounded-lg">
          <div class="d-flex ma-10 flex-column">
            <br>
            <h1>Olá, seja bem-vindo ao GradeSync!</h1>
            <br>
            <h3>Por aqui você pode acessar o menu à esquerda para encontrar:</h3>
            <br>
            <ol>
              <li><h4>Alunos</h4></li>
            </ol>
            <br>
            <hr>
            <br>
            <p style="max-width: 800px;">O backend foi desenvolvido para suportar todas as funcionalidades necessárias, incluindo rotas para gerenciamento de alunos (/students), cursos (/courses), matrículas (/enrollments) e escolas (/schools). No entanto, o frontend foi implementado apenas para a visualização e gestão de alunos. As rotas para cursos, matrículas e escolas ainda não possuem uma interface de usuário correspondente no frontend, o que significa que, no momento, os recursos dessas funcionalidades estão acessíveis apenas através da API.</p>
          </div>
        </div>
      </v-container>
    </v-main>

  </v-app>
</template>

<script setup>
import MenuDrawer from '@/components/MenuDrawer.vue';

</script>
