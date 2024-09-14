<template>
	<v-app-bar color="secondary" elevation="0" app>
      <v-img
        src="../assets/logo-and-name.png"
        contain
		max-width="100"
		max-height="50"
		class="d-flex align-center ml-16"
      ></v-img>
    </v-app-bar>

	<v-app-bar color="primary" elevation="0" style="pagging-top">
		<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
		<v-toolbar-title @click="drawer = !drawer">Módulo Acadêmico</v-toolbar-title>
	</v-app-bar>
  
	<v-navigation-drawer v-model="drawer" color="primary" class="align-center">
		<v-list-item prepend-icon="mdi-home" link title="Home" to="/"></v-list-item>
		<v-list-item prepend-icon="mdi-account-school" link title="Alunos" to="/students"></v-list-item>
		<!-- <v-list-item prepend-icon="mdi-school" link title="Cursos"></v-list-item>
		<v-list-item prepend-icon="mdi-town-hall" link title="Escolas"></v-list-item> -->
	</v-navigation-drawer>
</template>


<script>
import { ref } from 'vue';

export default {
	name: 'MenuDrawer',
	props: {},
	setup() {
		const drawer = ref(false);
		return {
			drawer
		};
	}
}
</script>