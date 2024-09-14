<template>
	<v-app>
		<MenuDrawer />
  
		<v-main>
			<v-container>
				<div class="w-screen h-screen border rounded-lg">
					<v-card-title>Cadastro de Aluno</v-card-title>
					<StudentForm />
				</div>
			</v-container>
		</v-main>
  
	</v-app>
</template>
  
<script setup>
	import MenuDrawer from '@/components/MenuDrawer.vue';
	import StudentForm from '@/components/StudentForm.vue';
</script>
  