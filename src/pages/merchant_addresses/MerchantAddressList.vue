<template>
  <div>
    <Row>
      <!-- <Col :xs="5" :sm="3" :md="2" :lg="2">
        <Button type="success" icon="plus-round" @click="create">新建</Button>
      </Col> -->
      <Col :xs="{span: 5, offset: 19}" :sm="{span: 3, offset: 21}" :md="{span: 2, offset: 22}" :lg="{span: 2, offset: 22}" >
        <Button type="success" icon="plus-round" @click="create">新建</Button>
      </Col>
    </Row>
    <Table border :columns="columns" :data="merchant_addresses" :stripe="true" class="table"></Table>
    <Modal
      width="300"
      v-model="modal"
      title="删除信息"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>是否需要删除此信息？</p>
    </Modal>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  data () {
    return {
      columns: [
        {
          title: '门店名称',
          key: 'name'
        },
        // {
        //   title: '门店介绍',
        //   key: 'content'
        // },
        {
          title: '联系电话',
          key: 'tel'
        },
        {
          title: '门店地址',
          key: 'location'
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
                    this.$router.push('/merchant_addresses/' + params.row.id + '/edit')
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
      merchant_addresses: [],
      merchantAddress:null,
      delete: null,
      modal: false
    }
  },
  created () {
    this.getMerchantAddresses()
  },
  computed: {
    // ...mapState([
    //   'manager'
    // ])
  },
  methods: {
    getMerchantAddresses () {
      this.$http.get('/admin/merchant_addresses').then((res) => {
        this.merchant_addresses = res.data.merchant_addresses
      })
    },
    create () {
      this.$router.push('/merchant_addresses/new')
    },
    showModal (row) {
    this.modal = true
    this.delete = row
  },
  ok () {
      this.merchant_addresses.splice(this.delete._index, 1)
      this.$http.delete('/admin/merchant_addresses/' + this.delete.id).then((res) => {
        this.getMerchantAddresses()
        let msg = res.data.notice
        this.showInfos('已删除此地址', msg)
      })
    },
    cancel () {
      this.$Message.info('您取消了操作')
    },
    showInfos (title, msg) {
      this.$Message.info({
        title: title,
        desc: msg
      })
    }
  }
}
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>