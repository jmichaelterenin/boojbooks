<template>
    <tr>       
      <td class="left title">        
          {{ volumeInfo.title }}
      </td> 
      <td class="left">
          {{ volumeInfo.publishedDate }}
      </td>
      <td>
          <span class="gapit">
            <v-icon name="arrow-down" class="clickable" title="Move Down" v-show="notAtBottom" @click="handleMove(1)" />
          </span>  
          <span class="gapit">
            <v-icon name="arrow-up" class="clickable" title="Move Up" v-show="notAtTop" @click="handleMove(0)" />
          </span>  
          <span class="gapit">
            <v-icon name="eye" class="clickable" title="View Details" @click="handleDisplay()" />          
          </span>
          <span class="gapit">
            <v-icon name="trash" class="clickable red" title="Remove Book" @click="handleRemove()" />                      
          </span>  
      </td>   
    </tr>     
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import { mapMutations } from 'vuex'

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
    ...mapMutations(['setCurr']),

    handleRemove() {   
        let self = this     
        this.$confirm (
        {
          message: `Are you sure?`,
          button: {
            no: 'No',
            yes: 'Yes'
          },
          /**
          * Callback Function
          * @param {Boolean} confirm
          */
          callback: confirm => {
            if (confirm) {
              self.$emit('delete');         
            }
          }
        }
      )
        
    },
    handleMove(isDown) {
        let currPos = this.book.sort
        this.$emit('shiftBook', currPos, isDown);
    },
    handleDisplay() {
      // console.log('INSIDE handleDisplay');
      this.setCurr({ curr: this.book.sort });
      this.$router.push({ path: 'bookdetails' })
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

.title {
  max-width: 400px;
}

.clickable {
  cursor: pointer;
}

.red {
  color: red;
}

.gapit {
  display: inline-block;
  padding: 0 5px;
  min-width: 15px;
}

</style>
