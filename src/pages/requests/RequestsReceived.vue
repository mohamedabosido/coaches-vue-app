<template>
  <div>
    <teleport to="body">
      <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
        <p>{{ error }}</p>
      </base-dialog>
    </teleport>
    <section>
      <base-card>
        <header>
          <h2>Request Received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="!isLoading && hasRequests">
          <request-item v-for="request in receivedRequests" :key="request.id" :email="request.email"
            :message="request.message"></request-item>
        </ul>
        <h3 v-else>You haven't received yet!</h3>
      </base-card>
    </section>
  </div>
</template>
<script>
import RequestItem from '@/components/requests/RequestItem.vue';
import BaseDialog from '../../components/ui/BaseDialog.vue';
import BaseSpinner from '../../components/ui/BaseSpinner.vue';
export default {
  data: () => ({
    isLoading: false,
    error: null,
  }),
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },
  },
  methods: {
    fetchRequests() {
      this.isLoading = true;
      try {
        this.$store.dispatch('requests/fetchRequests');
      } catch (err) {
        this.error = err.message || 'Failed to fetch requests.';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.fetchRequests();
  },
  components: {
    RequestItem,
    BaseDialog,
    BaseSpinner,
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
