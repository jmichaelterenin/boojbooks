<template>
    <div class="">      
      <h2 class="left"><router-link to="/">{{ base }}</router-link> / {{ title }}</h2>  
      <!-- https://medium.com/@fagnersaraujo/automated-breadcrumbs-with-vuejs-7e1051de8028 -->    
      <book-layout-details :book="book" v-if="loaded" />
    </div>
</template>

<script>
import BookLayoutDetails from './BookLayoutDetails.vue';

export default {
  components: { BookLayoutDetails },
  name: 'Details',  
  data() {
    return {
        book: {},
        title: 'Book Details',
        base: 'My Book List',
        loaded: false,         
    }
  },    
  created() {
    if (this.$store.state.books.length) {
      this.book = this.$store.state.books[this.$store.state.curr];
      // console.log(this.book);
      this.loaded = true;
    }    
  },  
}
</script>

<style lang="scss" scoped>

</style>
