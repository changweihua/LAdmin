<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <loading />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'dashboard',
  components: {},
  data() {
    return {
      tableColumns: [
        {
          prop: 'configurationName',
          label: 'ConfigurationName'
        }
      ]
    }
  },
  mounted() {
    this.fetchList()
  },
  watch: {},
  computed: {},
  methods: {
    ...mapActions(['fetchList'])
  }
}
</script>
