<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError">
      <p>
        {{ error }}
      </p>
    </base-dialog>
    <base-dialog fixed :show="isLoading" title="Loading.......">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Your E-Mail</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div class="form-control">
          <label for="password">Your Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <p v-if="!formIsValid">Please enter a valid email and password!</p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button
          mode="flat"
          type="button"
          @click="switchAuthMode('signup')"
          >{{ switchButtonCaption }}</base-button
        >
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  methods: {
    handleError() {
      this.error = null;
    },
    switchAuthMode() {
      this.mode = this.mode === 'login' ? 'signup' : 'login';
    },
    validateForm() {
      this.formIsValid = true;
      if (this.email === '' || this.password === '') {
        this.formIsValid = false;
      }
    },
    async submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      this.isLoading = true;
      try {
        const actionPayload = {
          email: this.email,
          password: this.password,
        };
        if (this.mode === 'login') {
          await this.$store.dispatch('auth/login', actionPayload);
        } else {
          await this.$store.dispatch('auth/signup', actionPayload);
        }
        this.$router.replace('/coaches');
      } catch (error) {
        this.error =
          error.message || 'Failed to authenticate. Check your login data.';
      }
      this.isLoading = false;
    },
  },
  computed: {
    submitButtonCaption() {
      return this.mode === 'login' ? 'Login' : 'Signup';
    },
    switchButtonCaption() {
      return this.mode === 'login' ? 'Signup instead' : 'Login instead';
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

p {
  color: red;
}
</style>
