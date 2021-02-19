<template>
  <div>
    <h1>My Book List</h1>
    <br>
    <!--displays list -->
    <table class="table striped">   
    <tr>
      <th class="main-column">
        <a href="" class="sort-link" @click.prevent="handleSort(0)">Name</a> 
        <v-icon name="caret-down" v-if="sortCol == 0 && sortDir == 1" label="Alphabetical"/>
        <v-icon name="caret-up" v-if="sortCol == 0 && sortDir == -1" label="Alphabetical"/>
      </th>
      <th>
        <a href="" class="sort-link" @click.prevent="handleSort(1)">Date Pub.</a>
        <v-icon name="caret-down" v-if="sortCol == 1 && sortDir == 1" label="Alphabetical"/>
        <v-icon name="caret-up" v-if="sortCol == 1 && sortDir == -1" label="Alphabetical"/>
      </th>
      <th class="center">Actions</th>
    </tr>
      <MyBookItem v-for="book in books" :key="book.id" :book="book" :currPosition="book.sort" :totalBooks="books.length" @delete="onDeleteBook(book.id)" />
    </table>
  </div>
</template>

<script>
import { EventBus } from '../event-bus.js';
import MyBookItem from "./MyBookItem";
import Icon from 'vue-awesome/components/Icon'

export default {
  name: 'BookList',
  components: {
    MyBookItem,
    'v-icon': Icon
  }, 
  data () {
    return {    
      books: [],
      sortCol: -1,
      sortDir: 1,
    }  
  },
  created (){
    EventBus.$on('add-book', (data) => {
        console.log('Inside add-book');
        console.log(data);
        if (!this.books.filter(function (b) { // prevent duplicates
              return (b.id == data.id);
        }).length) {
          this.books.push(data);          
          this.performSort();        
        }
    })
  },
  methods: {
      onDeleteBook (bookID) {          
          this.books = this.books.filter(function (b) {
              return (b.id != bookID);
          });
          this.performSort();
      },
      handleSort(sortCol) {
          if (this.books.length) {
            console.log('Inside handleSort '+sortCol);
            if (this.sortCol == sortCol) this.sortDir = this.sortDir * -1;
            else this.sortCol = sortCol;            
            this.performSort();
          }          
      },
      performSort() {
          if (this.sortCol >= 0) {
            let sortDir = this.sortDir;          
            switch(this.sortCol) {
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
              console.log(this.books[i].volumeInfo.title+' WAS: '+this.books[i].sort);
              this.books[i].sort = i;
              console.log('NOW: '+this.books[i].sort);
          }
      }
  }   
}
</script>

<style lang="scss">
    .table {
      min-width: 600px;
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