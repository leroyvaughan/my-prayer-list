<template>
  <div>

    <div class="modal" :class="{'is-active': isOpen}">
      <div class="modal-content">
        <span id="close-btn" @click="isOpen=false">&times;</span>

        <!-- this is where the content in parent will display -->
        <slot />
      </div>
    </div>

  </div>
</template>



<script>

export default {
  data() {
    return{
      isOpen: false
    }
  },
  methods: {
    closeModal(){
      this.isOpen = false;
    }
  }
}

</script>



<style lang="scss" scoped>

.modal {
  background-color: rgba(0, 0, 0, 0.4);
  display: none;
  overflow: auto;
  width: 100%;

  height: 100vh;
  overflow-y: hidden;

  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;

  &-content {
    background-color: #fefefe;
    border: 1px solid #333;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    margin: 15% auto;
    min-height: 80%;
    padding: 30px 0;
    position: relative;
    width: 60%;
  }

  &.is-active {
    display: flex;
  }

  #close-btn{
    border-radius: 50px;
    border: 1px solid #ccc;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
    line-height: 7px;
    padding: 3px;

    position:absolute;
    top: 7px;
    right: 7px;

    &:hover{
      background-color: #ccc;
      color: #fff;
    }
  }
}//end modal


</style>