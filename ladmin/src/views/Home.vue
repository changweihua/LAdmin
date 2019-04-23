<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <hello-world :msg="configurationList.length+''"/>
    <loading />
    <x-table :table-columns="tableColumns" :table-data="configurationList" />
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
import { mapActions, mapState } from 'vuex'
// import { values } from '@/apis/account'
// import { userList } from '@/apis/user'

export default {
  name: 'home',
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
    console.log(this.$store.state.configuration.configurationList)
  },
  watch: {},
  computed: {
    ...mapState(['configuration.configurationList'])
    // ...mapState({
    //   'configurationList': (state) =>
    //     state.configuration.configurationList
    // })
    // ...mapState('configuration', ['configurationList'])
  },
  methods: {
    ...mapActions(['fetchList'])
  }
}
</script>
