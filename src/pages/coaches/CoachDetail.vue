<template>
  <div>
    <!-- this parent div for transition -->
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>

    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-btn :to="contactLink" link v-if="contactBtn" @click="openForm"
            >contact</base-btn
          >
        </header>
        <router-view></router-view>
      </base-card>
    </section>

    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
      contactBtn: true,
    };
  },
  computed: {
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
    },
    contactLink() {
      // return `${this.$route.path}/${this.id}/contact`;
      return `${this.$route.path}/contact`;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    description() {
      return this.selectedCoach.description;
    },
    // isContact() {
    //   return this.$store.getters['coaches/contacted'];
    // },
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      (coach) => coach.id === this.id
    );
  },
  methods: {
    openForm() {
      this.contactBtn = false;
    },
  },
};
</script>