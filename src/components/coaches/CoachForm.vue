<template>
    <form @submit.prevent="submitForm">
        <div class="form-control" :class="{ invalid: !firstName.isValid }">
            <label for="first-name">First Name</label>
            <input type="text" id="first-name" v-model.trim="firstName.value" @blur="clearValidity('firstName')" />
            <p v-if="!firstName.isValid">Please enter a valid first name!</p>
        </div>
        <div class="form-control" :class="{ invalid: !lastName.isValid }">
            <label for="last-name">Last Name</label>
            <input type="text" id="last-name" v-model.trim="lastName.value" @blur="clearValidity('lastName')" />
            <p v-if="!lastName.isValid">Please enter a valid last name!</p>
        </div>
        <div class="form-control" :class="{ invalid: !description.isValid }">
            <label for="description">Description</label>
            <textarea id="description" rows="5" v-model.trim="description.value"
                @blur="clearValidity('description')"></textarea>
            <p v-if="!description.isValid">Please enter a valid description (at least 5 characters)!</p>
        </div>
        <div class="form-control" :class="{ invalid: !hourlyRate.isValid }">
            <label for="areas">Hourly Rate</label>
            <input type="number" id="areas" v-model.number="hourlyRate.value" @blur="clearValidity('hourlyRate')" />
            <p v-if="!hourlyRate.isValid">Please enter a valid hourly rate (between $20 and $200)!</p>
        </div>
        <div class="form-control" :class="{ invalid: !areas.isValid }">
            <label for="areas">Areas of Expertise</label>
            <div>
                <input type="checkbox" id="frontend" value="frontend" v-model="areas.value"
                    @blur="clearValidity('areas')" />
                <label for="frontend">Frontend</label>
            </div>
            <div>
                <input type="checkbox" id="backend" value="backend" v-model="areas.value" @blur="clearValidity('areas')" />
                <label for="backend">Backend</label>
            </div>
            <div>
                <input type="checkbox" id="career" value="career" v-model="areas.value" @blur="clearValidity('areas')" />
                <label for="career">Career</label>
            </div>
            <p v-if="!areas.isValid">Please select at least one area of expertise!</p>
        </div>
        <p v-if="!isFormValid">Please fix above errors and submit again..</p>
        <base-button>Register</base-button>
    </form>
</template>

<script>
export default {
    emits: ['save-data'],
    data() {
        return {
            firstName: {
                value: '',
                isValid: true,
            },
            lastName: {
                value: '',
                isValid: true,
            },
            description: {
                value: '',
                isValid: true,
            },
            hourlyRate: {
                value: '',
                isValid: true,
            },
            areas: {
                value: [],
                isValid: true,
            },
            isFormValid: true,
        };
    },
    methods: {
        validateForm() {
            this.isFormValid = true;
            if (this.firstName.value.trim() === '') {
                this.firstName.isValid = false;
                this.isFormValid = false;
            }
            if (this.lastName.value.trim() === '') {
                this.lastName.isValid = false;
                this.isFormValid = false;
            }
            if (this.description.value.trim() === '') {
                this.description.isValid = false;
                this.isFormValid = false;
            }
            if (this.hourlyRate.value === '') {
                this.hourlyRate.isValid = false;
                this.isFormValid = false;
            }
            if (!this.areas.value || this.areas.value.length < 0) {
                this.areas.isValid = false;
                this.isFormValid = false;
            }
            if (this.areas.value.length < 0) {
                this.areas.isValid = false;
                this.isFormValid = false;
            }
        },
        clearValidity(input) {
            this[input].isValid = true;
        },
        submitForm() {
            this.validateForm();
            if (!this.isFormValid) {
                return;
            }
            const formData = {
                firstName: this.firstName.value,
                lastName: this.lastName.value,
                description: this.description.value,
                hourlyRate: this.hourlyRate.value,
                areas: this.areas.value,
            };
            this.$emit('save-data', formData);
        },
    }
};
</script>

<style scoped>
.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
}

input[type='checkbox']+label {
    font-weight: normal;
    display: inline;
    margin: 0 0 0 0.5rem;
}

input,
textarea {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    font: inherit;
}

input:focus,
textarea:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #3d008d;
}

input[type='checkbox'] {
    display: inline;
    width: auto;
    border: none;
}

input[type='checkbox']:focus {
    outline: #3d008d solid 1px;
}

h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
}

.invalid label {
    color: red;
}

.invalid input,
.invalid textarea {
    border: 1px solid red;
}
</style>