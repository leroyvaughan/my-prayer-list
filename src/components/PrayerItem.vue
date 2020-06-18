<template>
  <article class="post">
    <div class="header">
      <h4>{{ prayer.title }}</h4>

      <div>
        <span>Category: {{ getCategoryText(prayer.category) }}</span>
        <span class="action-links">
          <span class="edit-link" title="edit" @click="editPrayer">&#10000;</span>
          <span class="delete-link" title="delete" @click="deletePrayer">&#10006;</span>
        </span>
      </div>

    </div>

    <div class="body">
      <p>
        {{ prayer.notes }}
      </p>
      <p v-if="prayer.progressUpdate" class="progressUpdate">
        {{ prayer.progressUpdate }}
      </p>
    </div>

    <div class="media">
      <div class="media-content">
        <div class="content">
          <small>
            started {{ getCreatedDate(prayer.createdAt) }} &nbsp;
          </small>
          <small>
            updated {{ getUpdatedDaysAgo(prayer.updatedAt) }} days ago &nbsp;
          </small>
        </div>
      </div>
    </div>

    <modal ref="modal">
      <prayer-update
        :prayer="prayer"
        @toggleFormDisplay="cancelEdit"
        @updatePrayerItem="saveEdit"
      />
    </modal>

  </article>

</template>


<script>
import Modal from './Modal';
import PrayerUpdate from './PrayerUpdate';

export default {
  components: {
    Modal, PrayerUpdate
  },
  props: {
    prayer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      categories: this.$store.state.categories
    }
  },
  computed: {
    modal() {
      return this.$refs.modal;
    }
  },
  methods: {
    getCategoryText(catID) {
      //categoryID conversion to text
      return this.categories[catID].text;
    },
    getCreatedDate(createdAt_timestamp){
      var dateIn = new Date(createdAt_timestamp);
      return dateIn.toDateString();
    },
    getUpdatedDaysAgo(updatedAt_timeStamp){
      //timestamp to days ago conversion
      return this.timeDifference(updatedAt_timeStamp);
    },
    timeDifference(timeStampIn) {
      var currentTimeStamp = new Date().getTime();
      var difference = timeStampIn - currentTimeStamp;
      var daysDifference = Math.round(difference / 1000 / 60 / 60 / 24);

      return Math.abs(daysDifference);
    },
    editPrayer(){
      this.modal.isOpen = true;
    },
    saveEdit(){
      //emit/'bubble up' saveEvent to App.vue
      this.$emit("savePrayer", this.prayer);
      this.modal.isOpen = false;
    },
    cancelEdit(){
      this.modal.isOpen = false;
    },
    deletePrayer(){
      this.$emit("removePrayer", this.prayer);
    }
  }
};
</script>



<style lang="scss" scoped>

article.post{
  padding-top: 0;
}

h4{
  color: #2196F3;
  margin-bottom: 0;
}

.header {
  display: flex;
  justify-content: space-between;

  > div {
    display: inline-block;
    position: relative;

    > span:first-child {
      color: #4caf50;
    }
  }
}

.action-links {
  font-size: .6rem;
  color: #777;
  cursor: pointer;
  display: inline-block;
  margin-left: 1rem;

  span {
    margin-left: 0.5rem;
  }

  .edit-link {
    color: blue;
  }

  .delete-link {
    color: red;
  }
}

.body{
  margin-top: 0.8rem;
  width: 80%;

  .progressUpdate{
    color: #777;
    font-size: .9rem;
    font-style: italic;
  }
}

.media{
  margin-top: 24px;
  text-align: right;

  .content small{
    color: #777;
    display: block;
    font-size: 0.7rem;
    margin: 0;
  }
}

@media screen and (max-width: 896px) {
  .header{
    display: block;

    > div {
      display: flex;
      justify-content: space-between;
    }
  }
}

</style>
