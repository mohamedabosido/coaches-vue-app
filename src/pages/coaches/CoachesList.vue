<template>
    <coach-filter @change-filter="setFilters"></coach-filter>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline" link @click="loadCoaches">{{ $t('refresh') }}</base-button>
                <base-button link to="/register" v-if="!isCoach">{{ $t('register_as_coach') }}</base-button>
            </div>
            <ul v-if="hasCoaches">
                <li v-for="coach in filteredCoaches" :key="coach.id">
                    <coach-item :id="coach.id" :first-name="coach.firstName" :last-name="coach.lastName"
                        :areas="coach.areas" :rate="coach.hourlyRate"></coach-item>
                </li>
            </ul>
            <h3 v-else>{{ $t('no_coaches') }}</h3>
        </base-card>
    </section>
</template>

<script>
import CoachItem from '@/components/coaches/CoachItem.vue';
import CoachFilter from '@/components/coaches/CoachFilter.vue';
export default {
    data() {
        return {
            activeFilters: {
                frontend: true,
                backend: true,
                career: true,
            },
        };
    },
    computed: {
        filteredCoaches() {
            const coaches = this.$store.getters['coaches/coaches'];
            return coaches.filter((coach) => {
                if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
                    return true;
                }
                if (this.activeFilters.backend && coach.areas.includes('backend')) {
                    return true;
                }
                if (this.activeFilters.career && coach.areas.includes('career')) {
                    return true;
                }
                return false;
            });
        },
        hasCoaches() {
            return this.$store.getters['coaches/hasCoaches'];
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach'];
        },
    },
    components: {
        CoachItem,
        CoachFilter,
    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        },
        loadCoaches() {
            this.$store.dispatch('coaches/loadCoaches');
        },
    },
    created() {
        this.loadCoaches();
    },
};
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>