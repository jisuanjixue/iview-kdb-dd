<template>
  <div>
    <Row>
      <Col :xs="19" :sm="21" :md="22" :lg="22">
        <Input clearable placeholder="输入搜索内容" style="width: 40%; margin-right: 10px;" v-model="search"></Input>
        <Button type="primary" icon="ios-search" @click="getUsers(1)">搜索</Button>
      </Col>
    </Row>
    <Table border :columns="columns" :data="users" :stripe="true" class="table"></Table>
    <Page :page-size="25" :total="total" show-elevator :current="current_page" @on-change="getUsers" show-total style="text-align: right;margin-top: 20px;"></Page>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          title: '头像',
          key: 'headimgurl',
          width: 220,
          render: (h, params) => {
            return h('img', {
              domProps: {
                src: params.row.headimgurl
              },
              style: {
                width: '180px',
                height: '60px'
              }
            })
          }
        },
        {
          title: '昵称',
          key: 'nickname'
        },
        {
          title: '卡号',
          key: 'card_no'
        },
        // {
        //   title: '姓名',
        //   key: 'real_name'
        // },
        {
          title: '电话',
          key: 'mobile'
        },
        {
          title: '是否会员',
          key: 'isMember',
          render: (h, params) => {
            if (params.row.isMember === 0) {
              return h('div', '非会员')
            } else {
              return h('div', '会员')
            }
          }
        },
        {
          title: '性别',
          key: 'sex',
          render: (h, params) => {
            if (params.row.sex === 1) {
              return h('div', '男性')
            } else if (params.row.sex === 2) {
              return h('div', '女性')
            } else if (params.row.sex === 3) {
              return h('div', '未知')
            }
          }
        },
        {
          title: '积分',
          key: 'credit'
        },
        {
          title: '现金红包',
          key: 'cash'
        },
        {
          title: '关注时间',
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
                    this.$router.push('/users/' + params.row.id)
                  }
                }
              }, '查看')
            ])
          }
        }
      ],
      users: [],
      total: null,
      current_page: null,
      search: ''
    }
  },
  created () {
    this.getUsers(1)
  },
  methods: {
    getUsers (page) {
      this.$http.get('/admin/users?page=' + page + '&search=' + this.search).then((res) => {
        this.users = res.data.users
        this.total = res.data.total
        this.current_page = res.data.current_page
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