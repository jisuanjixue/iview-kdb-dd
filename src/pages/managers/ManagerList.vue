<template>
  <div>
    <Row>
      <Col :xs="{span: 5, offset: 19}" :sm="{span: 3, offset: 21}" :md="{span: 2, offset: 22}" :lg="{span: 2, offset: 22}">
        <Button type="success" icon="plus-round" @click="create">新建</Button>
      </Col>
    </Row>
    <Table border :columns="columns" :data="managers" :stripe="true" class="table"></Table>
    <Modal
      width="300"
      v-model="modal"
      title="删除管理员"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>是否需要删除此管理员？</p>
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      columns: [
        {
          title: '站点',
          key: 'site_id'
        },
        {
          title: '账号',
          key: 'email'
        },
        // {
        //   title: '手机号',
        //   key: 'mobile'
        // },
        {
          title: '角色',
          key: 'role',
          render: (h, params) => {
            if (params.row.role === 'super_admin') {
              return h('div', '超级管理员')
            } else {
              return h('div', '站点管理员')
            }
          }
        },
        {
          title: '创建时间',
          key: 'created_at'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push('/managers/' + params.row.id + '/edit')
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.showModal(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      managers: [],
      total: null,
      modal: false,
      delete: null
    }
  },
  created () {
    this.$http.get('/admin/managers').then((res) => {
      this.managers = res.data.managers
    })
  },
  computed: {
    // ...mapState([
    //   'manager'
    // ])
  },
  methods: {
    create () {
      this.$router.push('/managers/new')
    },
    showModal (row) {
      this.modal = true
      this.delete = row
    },
    ok () {
      this.managers.splice(this.delete._index, 1)
      this.$http.delete('/admin/managers/' + this.delete.id).then((res) => {
        if (this.managers.length === 0) {
          this.getManagers(this.current_page - 1)
        } else {
          this.getManagers(this.current_page)
        }
      })
      this.$Message.info('已删除此管理员！')
    },
    cancel () {
      this.$Message.info('您取消了操作！')
    }
  }
}
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>