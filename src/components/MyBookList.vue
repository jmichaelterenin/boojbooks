<template>
  <div class="booklist">
    <h1>My Book List</h1>
    <br>
    <!--displays list -->
    <table class="table striped">   
    <tr>
      <th class="main-column">
        <a href="" class="sort-link" @click.prevent="handleSort(0)">Name</a> 
        <v-icon name="caret-down" v-if="sortCol == 0 && sortDir == 1" />
        <v-icon name="caret-up" v-if="sortCol == 0 && sortDir == -1" />
      </th>
      <th>
        <a href="" class="sort-link" @click.prevent="handleSort(1)">Date Pub.</a>
        <v-icon name="caret-down" v-if="sortCol == 1 && sortDir == 1" />
        <v-icon name="caret-up" v-if="sortCol == 1 && sortDir == -1" />
      </th>
      <th class="center">Actions</th>
    </tr>
      <book-layout-table v-for="book in books" :key="book.id" :book="book" :currPosition="book.sort" :totalBooks="books.length" 
                  @delete="onDeleteBook(book.id)" @shiftBook="performShift" />
    </table>
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>

<script>
import { EventBus } from '../event-bus.js';
import BookLayoutTable from "./BookLayoutTable";
import Icon from 'vue-awesome/components/Icon'
import { mapMutations } from 'vuex'

export default {
  name: 'BookList',
  components: {
    BookLayoutTable,
    'v-icon': Icon
  }, 
  data () {
    return {    
      books: [],
    }  
  },
  computed: {  
      sortCol(){
        return this.$store.state.sortCol;
      }, 
      sortDir(){
        return this.$store.state.sortDir;
      }
  },    
  created (){
    // console.log('INSIDE created for BookList');
    if (this.$store.state.books.length) {
      this.books = this.$store.state.books;
    }       

    EventBus.$on('add-book', (data) => {
        if (!this.books.filter(function (b) { // prevent duplicates
              return (b.id == data.id);
        }).length) {
          this.books.push(data);          
          this.performSort();        
        }
    })    
  },
  methods: {   
      ...mapMutations(['setBooks']),
    
      onDeleteBook (bookID) { 

          this.books = this.books.filter(function (b) {
              return (b.id != bookID);
          });
          if (this.books.length < 2) this.$store.state.sortCol = -1; // Remove Sort arrow
          this.performSort();
      },
      handleSort(sortCol) {
          if (this.books.length > 1) {
            if (this.$store.state.sortCol == sortCol) this.$store.state.sortDir = this.$store.state.sortDir * -1;
            else this.$store.state.sortCol = sortCol;            
            this.performSort();
          }          
      },
      swap(x, y){
          const xx = this.books[x];
          const yy = this.books[y];
          this.$set(this.books, x, yy);
          this.$set(this.books, y, xx);
      },      
      performShift(currPos, isDown) {
          let desiredPos = (isDown ? currPos+1 : currPos-1);
          // console.log(desiredPos);
          // Reset sortCol
          this.$store.state.sortCol = -1;
          // Apply swap
          this.swap(currPos, desiredPos);          
          // Set the new sort value
          this.performSort();
      },
      performSort() {
          if (this.$store.state.sortCol >= 0) {            
            let sortDir = this.$store.state.sortDir;          
            switch(this.$store.state.sortCol) {
              case 0:
                this.books.sort((a, b) => (a.volumeInfo.title > b.volumeInfo.title) ? sortDir : (sortDir * -1));
                break;
              case 1:
                this.books.sort((a, b) => (a.volumeInfo.publishedDate > b.volumeInfo.publishedDate) ? sortDir : (sortDir * -1));
                break;
              default:
                break;  
            }
          }
          // Set the sort value, since deleting will create gaps
          for (var i=0; i < this.books.length; i++) {
              // console.log(this.books[i].volumeInfo.title+' WAS: '+this.books[i].sort);
              this.books[i].sort = i;
              // console.log('NOW: '+this.books[i].sort);
          }
          this.setBooks({ books: this.books });
      }
  }   
}
</script>

<style lang="scss">
    .booklist {
      margin-bottom: 40px;
    }

    .table {
      width: 640px;
      margin: 0 auto;
    }

    td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;    
    }

    tr:nth-child(even) {
      background-color: #dddddd;
    }

    .center {
      text-align: center;
    }

    .sort-link {
      text-decoration: none;
    }

    .main-column {
      min-width: 280px;
    }
</style>