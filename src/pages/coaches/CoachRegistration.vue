<template>
  <section>
    <base-card>
      <h2>Register a new Coach</h2>
      <coach-form @save-data="saveData" />
    </base-card>
  </section>
</template>

<script>
import CoachForm from '@/components/coaches/CoachForm.vue';
export default {
  components: {
    CoachForm,
  },
  methods: {
    saveData(coachData) {
      this.$store.dispatch('coaches/registerCoach', coachData);
      this.$router.replace('/coaches');
    },
  },
};
</script>