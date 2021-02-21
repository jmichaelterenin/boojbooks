<template>
    <div class="">      
      <h2 class="left"><router-link to="/">My Book List</router-link> / Book Details</h2>      
      <div class="container" v-if="loaded == true">
        <div class="container__title">
          <h3>{{ volumeInfo.title }}</h3>
        </div> 
        <div class="container__details">
          <template v-if="volumeInfo.imageLinks">
              <img :src="volumeInfo.imageLinks.thumbnail" :alt="volumeInfo.title" class="container__image">
          </template>
          <template v-else>
              <img
              src="../assets/med-no-photo.jpg"
              :alt="volumeInfo.title"
              width="128"
              class="container__image"
              >
          </template>  
          <table class="container__table">
          <tr>
            <td class="left">
                <p><span v-if="volumeInfo.publisher && volumeInfo.publisher.length">{{ volumeInfo.publisher }},</span> {{ volumeInfo.publishedDate }} <span v-if="volumeInfo.categories">- {{ volumeInfo.categories[0] }}</span></p>
            </td>
          </tr>
          <tr>
            <td class="left">
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
            </td>
          <tr>       
            <td class="left content__description">
                <p v-if="volumeInfo.description">{{ volumeInfo.description }}</p>
                <p v-if="!volumeInfo.description">No description available</p>
            </td>
          </tr>  
          </table>   
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'MyBookItem',  
  data() {
    return {
        loaded: false, 
        book: {}
    }
  },  
  computed: {  
      volumeInfo(){
        return this.book.volumeInfo
      }  
  },
  created() {
    if (this.$store.state.books.length) {
      this.book = this.$store.state.books[this.$store.state.curr];
      console.log(this.book);
      this.loaded = true;
    }    
  },  
}
</script>

<style lang="scss" scoped>

.container {
  margin: 0 auto;
  border: 3px solid blue;
  padding: 20px 40px 40px;
  max-width: 640px;  

  &__title {
    width: 100%;
    text-align: left;
  }
  &__details {
    display: flex;
    flex: 0 0 100%; /* flex-grow, flex-shrink, flex-basis */
    flex-wrap: nowrap;
  }
  &__image {    
    margin: 20px 30px 0 0;
    width: 200px;
    object-fit: contain;
    align-self: flex-start;
  }
  &__table {
    flex: 1 1 auto;
  }

  .content {

    &__description {
      white-space: pre-line;
    }
  }

}

</style>
