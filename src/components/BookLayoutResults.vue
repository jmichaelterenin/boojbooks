<template>
  <li class="book" :data-id="this.$vnode.key">      
    <div class="book-item">
        
    <div class="header overflow">        
        {{ volumeInfo.title }}
    </div>    
    <div class="content">
        <a :href="volumeInfo.previewLink" target="_blank" title="Click to preview on Google">
        <template v-if="volumeInfo.imageLinks">
            <img :src="volumeInfo.imageLinks.thumbnail" :alt="volumeInfo.title">
        </template>
        <template v-else>
            <img
            src="../assets/med-no-photo.jpg"
            :alt="volumeInfo.title"
            width="128"
            >
        </template>   
        </a>
    </div>   
    <div class="footer overflow">
            <p class="author">
                <span v-if="!volumeInfo.authors">No authors to display</span>
                <span v-else>
                By
                <span v-for="(author, index) in volumeInfo.authors" :key="index">
                    <em>
                    {{
                    index + 1 !== volumeInfo.authors.length && index + 1 !== book.volumeInfo.authors.length-1 ? author + ', ' : index + 1 == book.volumeInfo.authors.length && index+1 !== 1 ? ' and ' + author : author
                    }}
                    </em>
                </span>
                </span>
            </p>
    </div>    
    <div class="add-section">
        <button @click="handleClick()">Add to my List</button>
    </div>    
    </div>
  </li> 
</template>

<script>
import Book from './Book.vue';
import { EventBus } from '../event-bus.js';

export default {
  name: 'BookLayoutResults',  
  extends: Book,  
  methods: {
    handleClick() {        
        console.log(this.book.id);   
        EventBus.$emit('add-book', this.book);     
    }
  },  

}
</script>

<style scoped>
ul {
  padding: 0;
}

ul li {
  display: inline-block;
}

ul li {
  list-style: none;
}
.author {
  font-size: 12px;
}

.overflow {
  margin: 5px;  
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;    
  -webkit-box-orient: vertical;
}

.book-item {
  display: flex;
  flex-direction: column;
  height: 310px;
  width: 200px;
}

.header {
  min-height: 36px;
  max-height: 36px;    
  font-weight: bold;  
  -webkit-line-clamp: 2;
}

.content {
  flex: 1 0 auto;
}

.footer {
  min-height: 26px;
  max-height: 26px;    
  -webkit-line-clamp: 1;
}

.add-section {
  height: 20px;  
}

</style>
