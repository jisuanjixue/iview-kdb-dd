<template>
  <div>
    <Row>
      <Col :xs="{span: 5, offset: 19}" :sm="{span: 3, offset: 21}" :md="{span: 2, offset: 22}" :lg="{span: 2, offset: 22}">
        <Button type="success" icon="plus-round" @click="create">新建</Button>
      </Col>
    </Row>
    <Table class="table" border :stripe="true" :data="categories" :columns="columns"></Table>
    <!-- <DragableTable
        v-model="categories"
        :columns-list="columns"
        @on-start="handleOnstart1"
        @on-end="handleOnend1"
        class="table"
    ></DragableTable> -->
    <Modal
      width="300"
      v-model="modal"
      title="删除内容分类"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>是否需要删除此内容分类？</p>
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
          title: '名称',
          key: 'name'
        },
        {
          title: '类型',
          key: 'type',
          render: (h, params) => {
            if (params.row.type === 0) {
              return h('div', '链接')
            } else if (params.row.type === 1) {
              return h('div', '文章列表')
            } else {
              return h('div', '相册列表')
            }
          }
        },
        {
          title: '图标',
          key: 'icon',
          render: (h, params) => {
            return h('img', {
              domProps: {
                src: params.row.icon
              },
              style: {
                width: '40px',
                height: '40px'
              }
            })
          }
        },
        // {
        //   title: '是否激活',
        //   key: 'active',
        //   render: (h, params) => {
        //     return h('div', params.row.active === true ? '已激活' : '未激活')
        //   }
        // },
        {
          title: '创建时间',
          key: 'created_at'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 200,
          render: (h, params) => {
            if (params.row.type === 0) {
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
                      this.$router.push('/categories/' + params.row.id + '/edit')
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
            } else if (params.row.type === 1) {
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
                      this.$router.push('/categories/' + params.row.id + '/edit')
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
                }, '删除'),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push('/categories/' + params.row.id + '/pages')
                    }
                  }
                }, '文章管理')
              ])
            } else {
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
                      this.$router.push('/categories/' + params.row.id + '/edit')
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
                }, '删除'),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push('/categories/' + params.row.id + '/photos')
                    }
                  }
                }, '相册管理')
              ])
            }
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
      categories: [],
      modal: false,
      delete: null
    }
  },
  created () {
    this.getCategories()
  },
  methods: {
    getCategories () {
      this.$http.get('/admin/categories').then((res) => {
        this.categories = res.data.categories
      })
    },
    create () {
      this.$router.push('/categories/new')
    },
    showModal (row) {
      this.modal = true
      this.delete = row
    },
    ok () {
      this.categories.splice(this.delete._index, 1)
      this.$http.delete('/admin/categories/' + this.delete.id).then((res) => {
        this.getCategories()
      })
      this.$Message.info('已删除此内容分类！')
    },
    cancel () {
      this.$Message.info('您取消了操作！')
    }
    // handleOnstart1 (from) {
    // },
    // handleOnend1 (e) {
    //   if (e.from !== e.to) {
    //     this.$http.get('/categories?from=' + e.from + '&to=' + e.to).then((res) => {
    //       this.categories = res.data.categories
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