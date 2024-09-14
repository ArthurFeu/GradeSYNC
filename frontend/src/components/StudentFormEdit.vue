<template>
  <v-form v-model="valid" ref="form">
    <v-container>
      <v-row>
        <!-- NAME -->
        <v-col cols="12">
          <v-card>
            <v-row>
              <v-col class="d-flex align-center">
                <v-card-title class="text-center">Nome</v-card-title>
              </v-col>
              <v-col cols="8">
                <v-card-text>
                  <v-text-field
                    variant="outlined"
                    v-model="localStudent.name"
                    label="Informe o nome completo do aluno"
                    hide-details="auto"
                    required
                    :rules="[fieldRequired, isValidName]"
                  ></v-text-field>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <!-- EMAIL -->
        <v-col cols="12">
          <v-card>
            <v-row>
              <v-col class="d-flex align-center">
                <v-card-title>Email</v-card-title>
              </v-col>
              <v-col cols="8">
                <v-card-text>
                  <v-text-field
                    variant="outlined"
                    v-model="localStudent.email"
                    label="Informe um email válido"
                    hide-details="auto"
                    required
                    :rules="[fieldRequired, isValidEmail]"
                  ></v-text-field>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <!-- RA -->
        <v-col cols="12">
          <v-card>
            <v-row>
              <v-col class="d-flex align-center">
                <v-card-title>RA</v-card-title>
              </v-col>
              <v-col cols="8">
                <v-card-text>
                  <v-text-field
                    variant="outlined"
                    v-model="localStudent.ra"
                    label="Valor não editável"
                    hide-details="auto"
                    required
                    :rules="[fieldRequired, isValidRA]"
                    readonly
                  ></v-text-field>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <!-- CPF -->
        <v-col cols="12">
          <v-card>
            <v-row>
              <v-col class="d-flex align-center">
                <v-card-title>CPF</v-card-title>
              </v-col>
              <v-col cols="8">
                <v-card-text>
                  <v-text-field
                    variant="outlined"
                    v-model="localStudent.cpf"
                    label="Valor não editável"
                    hide-details="auto"
                    required
                    :rules="[fieldRequired, isValidCPF]"
                    readonly
                  ></v-text-field>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  <div class="d-flex justify-center">
    <v-btn color="primary" @click="submit">Enviar</v-btn>
    &nbsp;
    <v-btn color="error" @click="cancel">Cancelar</v-btn>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { editStudent } from '@/service/studentService';
import { isValidEmail, isValidName, isValidCPF, isValidRA, fieldRequired } from '@/service/validations';
import { handleErrorWithToastMessage } from '@/service/errorHandler';

const props = defineProps({
  student: {
    type: Object,
    required: true,
  },
});

const valid = ref(false);
const toast = useToast();

// clone to edit locally first
const localStudent = ref({ ...props.student });

const form = ref(null);

const cancel = () => {
  window.location.href = '/students';
};

const submit = async () => {
  console.log('Submitting form');
  if (valid.value) {
    try {
		const newStudent = await editStudent(localStudent.value);
		console.log('Student updated: ', newStudent);
		toast.success('Estudante atualizado com sucesso!');

		// clear and reset the form
		localStudent.value = { name: '', email: '', ra: '', cpf: '', id: null };
    form.value.reset();

		await new Promise(resolve => setTimeout(resolve, 2500));
		window.location.href = '/students';
    } catch (error) {
      handleErrorWithToastMessage(error);
      console.error('Error while creating new student: ', error);
    }
  } else {
    toast.error('Formulário inválido');
    console.error('Invalid form');
  }
};

watch(() => props.student, (newStudent) => {
  localStudent.value = { ...newStudent };
});
</script>
