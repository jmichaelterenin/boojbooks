<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <div class="content">
      <div class="loading" v-if="loadState == 'loading'"></div>
      <div class="noresults" v-if="loadState == 'noresults'">No results found</div>
      <BookList v-if="loadState == 'success'" :books="books"/>
    </div>        
    <div class="query">
      <form @submit.prevent="search">
        <div>
          <input type="text" v-model="keyword" placeholder="Search..." class="input" required>
          <input type="submit" value="Search" class="button">
        </div>
      </form>
    </div>
    <div class="mylist">
        <my-book-list />
    </div>  
  </div>
</template>
<script>


import axios from 'axios'
import BookList from './BookList'
import MyBookList from './MyBookList.vue'

export default {
  name: 'home',
  components: {
    BookList,
    MyBookList
  },
  data () {
    return {
      msg: 'Welcome to Your Booj Book App',
      books: [],
      keyword: '',      
      maxResults: '3',
      loadState: ''
    }
  },
methods: {
    search() {
      this.loadState = 'loading';
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${
            this.keyword
          }&orderBy=relevance&maxResults=${this.maxResults}`
        )
        .then(response => {
          console.log(response.data)
          this.books = response.data.items;          
          this.loadState = (response.data.totalItems ? 'success' : 'noresults');          
        })
    }
  },  
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
  .content {
      min-height: 310px;      
      position: relative;

      .loading {
        background:url('../assets/ajax-loader.gif') center center no-repeat;
        width: 32px;
        height: 32px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -16px 0px 0px -16px;
      }

      .noresults {
        font-weight: bold;
      }

      .book {
        height: 100%;
      }

  }
</style>