<template>
  <div v-if="foodType">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="foodType" :label-width="100" ref="foodType" :rules="ruleInline">
      <FormItem label="分类名称" prop="name">
        <Input v-model="foodType.name" placeholder="例如: 热门菜"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('foodType')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formTitle: null,
      foodType: {
        name: null
      },
      ruleInline: {
        name: [
          { required: true, message: '请填写菜品分类', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (this.$route.name === 'FoodTypeNew') {
      this.formTitle = '新建菜品分类'
    } else {
      this.formTitle = '编辑菜品分类'
      this.$http.get('/admin/food_types/' + this.$route.params.id).then((res) => {
        this.foodType = res.data.food_type
      })
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.commitSave()
        }
      })
    },
    commitSave () {
      if (this.$route.name === 'FoodTypeNew') {
        this.$http.post('/admin/food_types', {food_type: this.foodType}).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('新建成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.push('/foods_types')
        })
      } else {
        this.$http.put('/admin/food_types/' + this.$route.params.id, this.foodType).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('修改成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.push('/foods_types')
        })
      }
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
