<template>
  <ul class="book-list">     
        <book-layout-results v-for="book in books" :key="book.id" :book="book"/>    
  </ul>
</template>

<script>
import BookLayoutResults from './BookLayoutResults.vue';

export default {
  name: 'BookList',
  props: {
    books: {
      type: Array,
      required: true
    }
  },
  components: {    
    BookLayoutResults
  }
};
</script>

<style>
</style>
