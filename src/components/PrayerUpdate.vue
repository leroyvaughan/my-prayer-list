<template>
  <form>

    <div id="dropdowns">
      <div class="field">
        <label class="label">Prayer Progress</label>
        <select ref="progress" class="select">
          <option v-for="p in progress"
            :key="p._id"
            :value="p._id"
            :selected="p._id == prayer.progress"
          >
            {{ p.text }}
          </option>
        </select>
      </div>

      <div class="field">
        <label class="label">Category</label>
        <select ref="category" class="select">
          <option v-for="cat in categories"
            :key="cat._id"
            :value="cat._id"
            :selected="cat._id == prayer.category"
          >
            {{ cat.text }}
          </option>
        </select>
      </div>
    </div>

    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input
          v-model="prayer.title"
          class="input"
          type="text"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Prayer Notes</label>
      <div class="control">
        <textarea
          v-model="prayer.notes"
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
        @click.prevent="saveUpdatedPrayer"
      >Update Prayer</button>
    </div>

    <div class="control">
      <button class="button is-text" @click="closeEditModal">
        Cancel
      </button>
    </div>
  </div>

  </form>
</template>



<script>

export default {
  props: {
    prayer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      categories: this.$store.state.categories,
      progress: this.$store.state.progress
    }
  },
  computed: {
    isFormValid() {
      return this.prayer.title && this.prayer.notes ? true : false;
    },
  },
  methods: {
    saveUpdatedPrayer() {
      this.prayer.category = this.$refs.category.value;
      this.prayer.progress = parseInt(this.$refs.progress.value);
      this.$emit("updatePrayerItem");
    },
    closeEditModal() {
      this.$emit("toggleFormDisplay");
    }
  }
}
</script>



<style lang="scss" scoped>

@media all and (min-width: 400px) {
  #dropdowns{
    display: flex;
    justify-content: space-between;

    .field:not(:last-child) {
      margin-bottom: 0;
    }
  }
}

</style>