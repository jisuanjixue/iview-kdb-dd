<template v-if="promotions">
  <Tabs value="name1" @on-click="changeStatus">
    <TabPane v-for="(tabData, key) in tabDatas" :label="tabData.label" :name="tabData.name" :key="key">
      <!-- <DragableTable
        v-model="promotionsReplace"
        :columns-list="columns"
        @on-start="handleOnstart1"
        @on-end="handleOnend1"
        class="table"
      ></DragableTable> -->
      <Table class="table" border :stripe="true" :data="promotions" :columns="columns"></Table>
      <Modal
        width="300"
        v-model="modal"
        title="删除活动"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>是否需要删除此活动？</p>
      </Modal>
    </TabPane>
    <Button type="success" icon="plus-round" slot="extra" @click="create">新建</Button>
  </Tabs>
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
          title: '活动标题',
          key: 'title'
        },
        {
          title: '活动浏览量',
          key: 'view_count'
        },
        {
          title: '活动卡券发送量',
          key: 'coupons_count'
        },
        {
          title: '活动抽奖用户个数',
          key: 'promotion_users_count'
        },
        {
          title: '活动位置',
          key: 'position'
        },
        {
          title: '创建时间',
          key: 'created_at'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 220,
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
                    this.$router.push('/promotions/' + params.row.id + '/edit')
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
                    this.$router.push('/promotions/' + params.row.id + '/coupon_types')
                  }
                }
              }, '卡卷类型管理')
            ])
          }
        },
        {
          title: '开启活动',
          key: 'open',
          width: 90,
          align: 'center',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'success',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.open(params.row.id)
                }
              }
            }, '开始')
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
      promotions: [],
      promotionsReplace: [],
      modal: false,
      delete: null,
      status: null,
      tabDatas: [
        {
          label: '已开始',
          name: '1'
        },
        {
          label: '未开始',
          name: '0'
        },
        {
          label: '已结束',
          name: '-1'
        }
      ]
    }
  },
  created () {
    this.getPromotions(1)
  },
  methods: {
    getPromotions (status) {
      // console.log(status)
      this.$http.get('/admin/promotions').then((res) => {
        this.promotions = res.data.promotions
        this.changeStatus(status)
      })
    },
    create () {
      this.$router.push('/promotions/new')
    },
    showModal (row) {
      this.modal = true
      this.delete = row
    },
    ok () {
      this.promotions.splice(this.delete._index, 1)
      this.$http.delete('/admin/promotions/' + this.delete.id).then((res) => {
        this.getPromotions(this.status)
      })
      this.$Message.info('已删除此活动！')
    },
    cancel () {
      this.$Message.info('您取消了操作！')
    },
    // handleOnstart1 (from) {
    // },
    // handleOnend1 (e) {
    //   let from = this.promotions.indexOf(this.promotionsReplace[e.from])
    //   let to = this.promotions.indexOf(this.promotionsReplace[e.to])
    //   if (from !== to) {
    //     this.$http.get('/promotions?from=' + from + '&to=' + to).then((res) => {
    //       this.promotions = res.data.promotions
    //       this.changeStatus(this.status)
    //     })
    //   }
    // },
    open (id) {
      this.$http.get('/admin/promotions/' + id + '/open').then((res) => {
        this.$Message.info(res.data.notice)
        this.getPromotions(0)
      })
    },
    changeStatus (status) {
      // 筛选数据
      /* eslint-disable */
      var b = Array()
      var a = this.promotions.map((v) => {
        if (v.status === Number(status)) {
          b.push(v)
          return v
        }
      })
      this.status = status
      this.promotionsReplace = b
    }
  }
}
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>