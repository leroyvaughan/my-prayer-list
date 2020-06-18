<template>
  <div id="my-prayer-list">

    <nav class="navbar is-white top-nav">
      <div class="container">
        <div class="navbar-brand">
          <h1>My Prayer List</h1>
        </div>
      </div>
    </nav>
    <nav class="navbar is-white links-nav">
      <div class="container">
        <div class="navbar-menu">
          <div class="progress-btns">
            <button
              :class="{active: inProgressFilter}"
              @click="setProgressFilter('inProgress')"
            >In Progress</button>

            <button
              :class="{active: ongoingFilter}"
              @click="setProgressFilter('ongoing')"
              >Ongoing</button>

            <button
              :class="{active: answeredFilter}"
              @click="setProgressFilter('answered')"
            >Answered Prayers</button>
          </div>
        </div>
      </div>
    </nav>

    <section class="container">
      <div class="columns">

        <div class="column is-2">
          <a class="button is-primary is-block is-alt is-large"
              href="#"
              @click="showCreatePrayerForm"
          >New Prayer</a>
        </div>

        <div class="column is-9">
          <div class="box content">
            <prayer-item v-for="prayer in prayers"
              :key="prayer.id"
              :prayer="prayer"
              @savePrayer="updatePrayer"
              @removePrayer="deletePrayer"
              ></prayer-item>
          </div>
        </div>

      </div>
    </section>

    <modal ref="modal">
      <prayer-create @createNew="createPrayer" @cancelCreateNew="closeModal" />
    </modal>
  </div>
</template>


<script>
import PrayerItem from "@/components/PrayerItem";
import PrayerCreate from "@/components/PrayerCreate";
import Modal from "@/components/Modal";

export default {
  name: "App",
  components: { Modal, PrayerItem, PrayerCreate },
  data() {
    return {
      curProgressFilter: "inProgress",
      inProgressFilter: true,
      ongoingFilter: false,
      answeredFilter: false,
      /* using this so I can filer the view without
        modifying state object to keep indexes intact */
      prayersView: [],
      isOpen: false
    }
  },
  computed: {
    prayers: function() {
      return this.prayersView;
    },
    categories: function() {
      return this.$store.state.categories
    },
    modal() {
      return this.$refs.modal;
    }
  },
  created() {
    this.$store.dispatch("initStore")
      .then(() => {
        this.setProgressFilter();
      });
  },
  methods: {
    showCreatePrayerForm() {
      this.modal.isOpen = true;
    },
    createPrayer(newPrayer){
      this.$store.dispatch("savePrayer", newPrayer)
        .then(() => {
          this.setProgressFilter("inProgress");
          this.closeModal();
        });
    },
    closeModal() {
      this.modal.isOpen = false;
    },
    updatePrayer(updatedPrayer){
      this.$store.dispatch("updatePrayer", updatedPrayer)
        .then(() => {
          this.setProgressFilter();
        });
    },
    deletePrayer(prayerItem){
      this.$store.dispatch("deletePrayer", prayerItem)
        .then(() => {
          this.setProgressFilter();
        });
    },
    setProgressFilter(textIn) {
      this.inProgressFilter = false;
      this.ongoingFilter = false;
      this.answeredFilter = false;

      //set default "inProgress"
      let progressID = 1;
      let filterText;

      if(!textIn){
        filterText = this.curProgressFilter;
      }
      else{//re-set progressFilter
        this.curProgressFilter = filterText = textIn;
      }

      switch(filterText) {
        case "inProgress":
          this.inProgressFilter = true;
          break;
        case "ongoing":
          this.ongoingFilter = true;
          progressID = 2;
          break;
        case "answered":
          this.answeredFilter = true;
          progressID = 3;
          break;

        default:
          this.inProgressFilter = true;
      }

      this.$store.dispatch("filterPrayers", progressID)
        .then(response => {
          this.prayersView  = response;
        })
    }
  }
};
</script>



<style lang="scss">
html {
  background-attachment: fixed;
  background-image: url(/blue-silhouette-prayer.png);
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100%;
}

html,
body {
  font-family: "Open Sans", serif;
}


.top-nav {
  .container {
    border-bottom: 1px solid #e6eaee;
  }

  h1 {
    color: purple;
    font-size: 31px;
    font-weight: bold;
    padding: 20px;
    text-shadow: 1px 2px 2px #444;
  }
}


.links-nav > .container {
  max-width: 100%;
}

.container .columns {
  margin: 3rem 0;
}

.navbar.is-white {
  background: none;
}
.navbar-menu {
  display: flex !important;
  border-bottom: 1px solid #dedede;
}


.progress-btns {
  display: flex;
  justify-content: space-evenly;
  width: 100%;

  button {
    background-color: #F5F5F5;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 3px #777;
    color: #999;
    flex-grow: 1;
    cursor: pointer;
    outline:none;
    padding: 0.1rem 1.3rem;

    &:hover{
      color: #FF9800;
    }
  }
}

button.active {
  background-color: #FF9800;
  color: white;
  cursor: none;

  &:hover{
    color: white;
  }
}

aside.menu {
  padding-top: 3rem;
}
aside.menu .menu-list {
  line-height: 1.5;
}
aside.menu .menu-label {
  padding-left: 10px;
  font-weight: 700;
}
.button.is-primary.is-alt {
  background: #00c6ff;
  background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
  background: linear-gradient(to bottom, #0072ff, #00c6ff);
  font-weight: 700;
  font-size: 14px;
  height: 3rem;
  line-height: 2.8;
}
.media-left img {
  border-radius: 50%;
}
.media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8f99a3;
}
article.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
}
article.post:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
.menu-list li {
  padding: 5px;
}


/* overrides to Bulma */
.box{
  border: 1px solid #ddd;
}

#my-prayer-list form {
  display: block;
  height: 100%;
  padding-bottom: 1rem;
  width: 90%;

  > .field:not(:first-child){
    margin-top: 1.7rem;
  }

  .select{
    border-color: #ccc;
    border-radius: 3px;
    padding: 3px;
  }

  label{
    color: #607D8B;
    margin: 0;
  }

  label, select, input{
    font-size: 0.9rem;
  }

  select, input{
    height: 2em;
  }
}


@media all and (max-width: 1023px) {
  html {
    background-size: 100%;
    background-position: center center;
  }

  .navbar-menu {
    box-shadow: none;
  }
}


@media all and (max-width: 401px) {
  .field.is-grouped{
    display: block;
  }
}


</style>
