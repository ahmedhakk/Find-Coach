<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: {
    CoachForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('coaches/registerCoach', data);
      //   this.$router.push('/coaches'); // redirect  => we can go back to the page we are again
      this.$router.replace('/coaches'); // redirect => we can't go back to the page we are
    },
  },
};
</script>