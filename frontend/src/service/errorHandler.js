import { useToast } from 'vue-toastification';
const toast = useToast();

export const handleErrorWithToastMessage = (error) => {
	let errorMessage = 'Erro ao atualizar estudante';
      if (error?.response?.data?.error) {
        errorMessage += ": " + error.response.data.error;
      }

      toast.error(errorMessage, {
        timeout: 5000
    });
}