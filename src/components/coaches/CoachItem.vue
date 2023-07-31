<template>
    <li>
        <h3>{{ fullName }}</h3>
        <h4>${{ rate }}/hour</h4>
        <div>
            <ul>
                <base-badge v-for="area in areas" :key="area.id" :type="area" :title="area"></base-badge>
            </ul>
        </div>
        <div class="actions">
            <base-button mode="outline" link :to="coachContactLink">{{ $t('contact') }}</base-button>
            <base-button link :to="detailsLink">{{ $t('view_details') }}</base-button>
        </div>
    </li>
</template>

<script>
export default {
    props: ['id', 'firstName', 'lastName', 'areas', 'rate'],
    computed: {
        fullName() {
            return `${this.firstName} ${this.lastName}`;
        },
        coachContactLink() {
            return `${this.$route.path}/${this.id}/contact`;
        },
        detailsLink() {
            return `${this.$route.path}/${this.id}`;
        },
    },
};
</script>

<style scoped>
li {
    margin: 1rem 0;
    border: 1px solid #424242;
    border-radius: 12px;
    padding: 1rem;
}

h3 {
    font-size: 1.5rem;
}

h3,
h4 {
    margin: 0.5rem 0;
}

div {
    margin: 0.5rem 0;
}

.actions {
    display: flex;
    justify-content: flex-end;
}
</style>