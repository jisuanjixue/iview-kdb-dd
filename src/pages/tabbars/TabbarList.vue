<template>
  <div>
    <Row>
      <Col :xs="{span: 5, offset: 19}" :sm="{span: 3, offset: 21}" :md="{span: 2, offset: 22}" :lg="{span: 2, offset: 22}">
        <Button type="success" icon="plus-round" @click="create">新建</Button>
      </Col>
    </Row>
    <!-- <DragableTable
        v-model="tabbars"
        :columns-list="columns"
        @on-start="handleOnstart1"
        @on-end="handleOnend1"
        class="table"
    ></DragableTable> -->
    <Table border :columns="columns" :data="tabbars" :stripe="true" class="table"></Table>
    <Modal
      width="300"
      v-model="modal"
      title="删除导航"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>是否需要删除此导航？</p>
    </Modal>
  </div>
</template>

<script>
// import DragableTable from '@/components/dragableTable.vue'
export default {
  // components: {
  //   DragableTable
  // },
  data () {
    return {
      columns: [
        {
          title: '导航名称',
          key: 'name'
        },
        {
          title: '默认图标',
          key: 'icon',
          render: (h, params) => {
            return h('img', {
              domProps: {
                src: params.row.icon
              },
              style: {
                width: '30px',
                height: '30px'
              }
            })
          }
        },
        {
          title: '激活图标',
          key: 'icon_on',
          render: (h, params) => {
            return h('img', {
              domProps: {
                src: params.row.icon_on
              },
              style: {
                width: '30px',
                height: '30px'
              }
            })
          }
        },
        {
          title: '链接',
          key: 'link'
        },
        {
          title: '链接名',
          key: 'link_name'
        },
        {
          title: '是否激活',
          key: 'active',
          render: (h, params) => {
            return h('div', params.row.active === true ? '已激活' : '未激活')
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
                    this.$router.push('/tabbars/' + params.row.id + '/edit')
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
        // {
        //   title: '拖拽排序',
        //   key: 'drag',
        //   width: 90,
        //   align: 'center',
        //   render: (h) => {
        //     return h(
        //       'Icon',
        //       {
        //         props: {
        //           type: 'arrow-move',
        //           size: 24
        //         }
        //       }
        //     )
        //   }
        // }
      ],
      tabbars: [],
      modal: false,
      delete: null
    }
  },
  created () {
    this.getTabbars()
  },
  methods: {
    getTabbars () {
      this.$http.get('/admin/tabbars').then((res) => {
        this.tabbars = res.data.tabbars
      })
    },
    create () {
      this.$router.push('/tabbars/new')
    },
    showModal (row) {
      this.modal = true
      this.delete = row
    },
    ok () {
      this.tabbars.splice(this.delete._index, 1)
      this.$http.delete('/admin/tabbars/' + this.delete.id).then((res) => {
        this.getTabbars()
      })
      this.$Message.info('已删除此导航！')
    },
    cancel () {
      this.$Message.info('您取消了操作！')
    }
    // handleOnstart1 (from) {
    //   // console.log('from')
    //   // console.log(from)
    // },
    // handleOnend1 (e) {
    //   if (e.from !== e.to) {
    //     this.$http.get('/tabbars?from=' + e.from + '&to=' + e.to).then((res) => {
    //       this.tabbars = res.data.tabbars
    //     })
    //   }
    // }
  }
}
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>