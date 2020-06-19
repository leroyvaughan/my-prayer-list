<template>
  <form>

  <div class="field">
    <label class="label">Select Category</label>
    <select ref="category" class="select">
    <option
      v-for="cat in categories"
      :key="cat._id"
      :value="cat._id"
      :selected="cat._id == 1430415"
    >
      {{ cat.text }}
    </option>
    </select>
  </div>

  <div class="field">
    <label class="label">Title</label>
    <div class="control">
    <input
      v-model="newPrayer.title"
      class="input"
      type="text"
      placeholder="Enter prayer title/description"
    />
    </div>
  </div>

  <div class="field">
    <label class="label">Prayer Notes</label>
    <div class="control">
    <textarea
      v-model="newPrayer.notes"
      class="textarea"
      placeholder="Enter prayer notes here"
    ></textarea>
    </div>
  </div>

  <div class="field is-grouped">
    <div class="control">
    <button
      class="button is-link"
      :disabled="!isFormValid"
      @click.prevent="createPrayer"
    >Create Prayer</button>
    </div>

    <div class="control">
    <button class="button is-text" @click="toggleFormDisplay">
      Cancel
    </button>
    </div>
  </div>

  </form>
</template>


<script>

export default {
  data() {
    return {
      isFormDisplayed: false,
      newPrayer: {
        title: "",
        notes: "",
        progress: 1
      },
      categories: this.$store.state.categories
    }
  },
  computed: {
    isFormValid() {
      return this.newPrayer.title && this.newPrayer.notes;
    }
  },
  methods: {
    toggleFormDisplay() {
      //reset object & category first
      this.newPrayer = { "progress": 1 };
      this.$refs.category.selectedIndex = 0;

      //close modal via App.vue
      this.$emit("cancelCreateNew");
    },
    createPrayer() {
      this.newPrayer.category = this.$refs.category.value;
      this.$emit("createNew", this.newPrayer);
      this.newPrayer = { "progress": 1 };
    }
  }
};
</script>