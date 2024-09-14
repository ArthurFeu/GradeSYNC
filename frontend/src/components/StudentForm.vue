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
                    v-model="fullname"
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
                    v-model="email"
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
                    v-model="ra"
                    label="Informe o Registro Acadêmico"
                    hide-details="auto"
                    required
                    :rules="[fieldRequired, isValidRA]"
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
                    v-model="cpf"
                    label="Informe o número do documento"
                    hide-details="auto"
                    required
                    :rules="[fieldRequired, isValidCPF]"
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
    <v-btn color="error" to="students">Cancelar</v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { createStudent } from '@/service/studentService';
import { isValidEmail, isValidName, isValidCPF, isValidRA, fieldRequired } from '@/service/validations';
import { handleErrorWithToastMessage } from '@/service/errorHandler';

const valid = ref(false);
const toast = useToast();

const fullname = ref('');
const email = ref('');
const ra = ref('');
const cpf = ref('');

const submit = async () => {
  console.log('Submitting form');
  if (form.value.validate() && fullname.value.length > 0) {
    const newStudent = {
      name: fullname.value,
      email: email.value,
      ra: ra.value,
      cpf: cpf.value,
    };

    try {
      const createdStudent = await createStudent(newStudent);
      console.log('Student created: ', createdStudent);
      
      form.value.reset();
      toast.success('Estudante criado com sucesso!');
      await new Promise(resolve => setTimeout(resolve, 2500));
      window.location.reload();
    } catch (error) {
      handleErrorWithToastMessage(error);
      console.error('Error while creating new student: ', error);
    }
  } else {
    toast.error('Formulário inválido');
    console.error('Invalid form');
  }
};

const form = ref(null);
</script>
