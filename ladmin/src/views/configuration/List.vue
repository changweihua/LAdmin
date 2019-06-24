<template>
  <div class="home">
    <!-- <loading /> -->
    <el-row style="margin-top:30px;">
      <el-col :span="24">
        <el-card class="box-card">
          <el-form :model="form" label-width="100px" class="normal-form">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-form-item label="L('启动日期')">
                  <el-input size="medium" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-form-item label="L('启动日期')">
                  <el-input size="medium" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-form-item label="L('启动日期')">
                  <el-input size="medium" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-form-item label="L('启动日期')">
                  <el-input size="medium" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-form-item label="L('启动日期')">
                  <el-input size="medium" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-row class="btn-wrap">
            <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearchClick">Search</el-button>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card class="box-card">
          <x-table :table-columns="tableColumns" :table-pager="tablePager" :table-actions="tableActions" :table-data="configurationList" :table-query="tableQuery" @size-change="handleSizeChange" @current-change="handleCurrentChange">
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
  // components: {},
  data() {
    return {
      form: {},
      tablePager: {
        page: 1,
        limit: 10,
        skipCount: 0,
        total: 0
      },
      tableQuery: {
      },
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
    var query = Object.assign({}, this.tableQuery, this.tablePager)
    this.fetchList(query)
  },
  watch: {
    'pager': function(newVal, oldVal) {
      this.tablePager.total = newVal.totalCount
    }
  },
  computed: {
    // ...mapState(['configuration.configurationList'])
    ...mapState({
      'configurationList': (state) =>
        state.configuration.configurationList,
      'pager': (state) =>
        state.configuration.pager
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
    },
    handleSizeChange(val) {
      this.tablePager.limit = val
      this.tablePager.skipCount = (this.tablePager.page - 1) * this.tablePager.maxResultCount
      var query = Object.assign({}, this.tableQuery, this.tablePager)
      this.fetchList(query)
    },
    handleCurrentChange(val) {
      this.tablePager.page = val
      this.tablePager.skipCount = (this.tablePager.page - 1) * this.tablePager.maxResultCount
      var query = Object.assign({}, this.tableQuery, this.tablePager)
      this.fetchList(query)
    },
    handleSearchClick() {
      this.tablePager.page = 1
      this.tablePager.skipCount = (this.tablePager.page - 1) * this.tablePager.maxResultCount
      var query = Object.assign({}, this.tableQuery, this.tablePager)
      this.fetchList(query)
    }
  }
}
</script>
