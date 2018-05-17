<template>
  <div>
    <Row>
      <Col :xs="{span: 5, offset: 19}" :sm="{span: 3, offset: 21}" :md="{span: 2, offset: 22}" :lg="{span: 2, offset: 22}">
        <Button type="success" icon="plus-round" @click="create">新建</Button>
      </Col>
    </Row>
    <Table border :columns="columns" :data="sites" :stripe="true" class="table"></Table>
    <Page :page-size="25" :total="total" show-elevator :current="current_page" @on-change="getSites" show-total style="text-align: right;margin-top: 20px;"></Page>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  data () {
    return {
      columns: [
        {
          title: '站点名称',
          key: 'name'
        },
        {
          title: '域名',
          key: 'domain'
        },
        // {
        //   title: 'URL',
        //   key: 'url'
        // },
        {
          title: 'token',
          key: 'weixin_token'
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
            // if (this.manager.role === 'super_admin') {
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
                      this.$router.push('/sites/' + params.row.id + '/show')
                    }
                  }
                }, '查看'),
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
                      this.$router.push('/sites/' + params.row.id + '/edit')
                    }
                  }
                }, '编辑')
              ])
            // }
          }
        }
      ],
      sites: [],
      total: null,
      current_page: null
    }
  },
  created () {
    this.getSites(1)
  },
  computed: {
    // ...mapState([
    //   'manager'
    // ])
  },
  methods: {
    getSites (page) {
      this.$http.get('/admin/sites?page=' + page).then((res) => {
        this.sites = res.data.sites
        this.total = res.data.total
        this.current_page = res.data.current_page
      })
    },
    create () {
      this.$router.push('/sites/new')
    }
  }
}
</script>

<style scoped>
.table {
  margin-top: 20px;
}