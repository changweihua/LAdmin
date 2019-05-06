<template>
  <div class="home">
    <!-- <loading /> -->
    <el-row style="margin-top:30px;">
      <el-col :span="24">
        <el-card class="box-card">
          <x-table :table-columns="tableColumns" :table-actions="tableActions" :table-data="configurationList">
            <el-row slot="tools" class="btn-wrap">
              <el-button type="primary" size="small" icon="el-icon-plus" @click="handleCreateClick">Add</el-button>
            </el-row>
          </x-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
import { mapActions, mapState } from 'vuex'
// import { values } from '@/apis/account'
// import { userList } from '@/apis/user'

export default {
  name: 'configurationlist',
  components: {},
  data() {
    return {
      tableColumns: [
        {
          prop: 'configurationName',
          label: 'ConfigurationName'
        },
        {
          prop: 'configurationType',
          label: 'ConfigurationType'
        },
        {
          prop: 'configurationValue',
          label: 'ConfigurationValue'
        },
        {
          prop: 'createdDate',
          label: 'CreatedDate'
        },
        {
          prop: 'createdUser',
          label: 'CreatedUser'
        }
      ],
      tableActions: [{
        name: 'Edit',
        icon: 'el-icon-edit',
        handler: (row) => {
          this.handleEditClick(row)
        },
        authorized: true,
        disabled: (row) => {
          return false
        }
      }]
    }
  },
  mounted() {
    this.fetchList()
    console.log(this.$store.state.configuration.configurationList)
  },
  watch: {},
  computed: {
    // ...mapState(['configuration.configurationList'])
    ...mapState({
      'configurationList': (state) =>
        state.configuration.configurationList
    })
    // ...mapState('configuration', ['configurationList'])
  },
  methods: {
    ...mapActions(['fetchList']),
    handleCreateClick() {
      this.$router.push({
        name: 'configurationCreate'
      })
    },
    handleEditClick(row) {
      this.$router.push({
        name: 'configurationEdit',
        params: {
          id: row.id
        }
      })
    }
  }
}
</script>
