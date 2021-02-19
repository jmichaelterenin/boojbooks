<template>
  <ul class="book-list">     
        <BookItem v-for="book in books" :key="book.id" :book="book"/>    
  </ul>
</template>

<script>
import BookItem from "./BookItem";

export default {
  name: 'BookList',
  props: {
    books: {
      type: Array,
      required: true
    }
  },
  components: {
    BookItem
  }
};
</script>

<style>
</style>
