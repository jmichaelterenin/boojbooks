<template>
    <tr>       
      <td class="left">        
          {{ volumeInfo.title }}
      </td> 
      <td class="left">
          {{ volumeInfo.publishedDate }}
      </td>
      <td>
          <span class="gapit">
            <v-icon name="arrow-down" v-show="notAtBottom" @click="handleMove()" />
          </span>  
          <span class="gapit">
            <v-icon name="arrow-up" v-show="notAtTop" @click="handleMove()" />
          </span>  
          <span class="gapit">
            <v-icon name="eye" label="View Details" @click="handleDebug()" />          
          </span>
          <span class="gapit">
            <v-icon name="trash" class="red" label="Remove Book" @click="handleRemove()" />          
          </span>  
      </td>   
    </tr> 
</template>

<script>
import Icon from 'vue-awesome/components/Icon'

export default {
  name: 'MyBookItem',  
  components: {
    'v-icon': Icon
  },
  props: {
    totalBooks: {
      type: Number,
    },
    currPosition: {
      type: Number
    },
    book: {
      type: Object,
      required: true
    },    
  },
  computed: {
    volumeInfo(){
      return this.book.volumeInfo
    },
    notAtTop() {
      return (this.currPosition != 0 && this.totalBooks > 1);
    },
    notAtBottom() {
      return (this.currPosition < (this.totalBooks-1) && this.totalBooks > 1);
    }
  },
  methods: {
    handleRemove() {
        console.log('TODO: Handle remove');        
        console.log(this.book.id);  
        this.$emit('delete');         
    },
    handleMove() {
        console.log('TODO: Handle move');        
        console.log(this.totalBooks);
        console.log('current pos='+this.book.sort);
    },
    handleDebug() {
      console.log('INSIDE handleDebug');
      console.log(this.book.sort); 
      console.log((this.book.sort != 0 && this.totalBooks > 1));     
      console.log((this.book.sort < (this.totalBooks-1) && this.totalBooks > 1));     
    }
  },    
}
</script>

<style scoped>
.left {
  text-align: left;
}

td {
  padding: 2px 5px;
}

.red {
  color: red;
}

.gapit {
  display: inline-block;
  padding: 0 5px;
  min-width: 16px;
}

</style>
