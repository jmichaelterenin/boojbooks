<script>

export default {
  name: 'Book',  
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  computed: {
    volumeInfo(){
      return this.book.volumeInfo
    }
  }
}
</script>