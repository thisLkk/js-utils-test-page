<script setup lang="ts">
import { getScript } from '@/lib/utils';
import { onMounted, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import { Field, Button } from 'vant';
const $route = useRoute()


// 以下是变量
const JS_UTILS_MIN_API = 'https://jintingyo.com/web/js-utils/js-utils-min.js'
const JS_UTILS_API = 'https://jintingyo.com/web/js-utils/js-utils-api.js'
const methodName = $route.query.sdkId || '' // 方法名
let loading = false // 按钮是否处于加载中
let JSUTILS = {} // JSUTILS 源码
let JSUTILSAPI: jsUtilsApiType[] = [] // JSUTILS 方法集合
let curDataSource: Ref<jsUtilsApiType> = ref({}) // 当前页面所需的渲染数据
let inputValue = ref('') // 输入框的值
let result:Ref<resultType> = ref({}) // 验证结果


// 以下是函数注册
// 获取 JSUTILS 源码
const getSdkJs = () => {
  getScript(JS_UTILS_MIN_API, () => { JSUTILS = window.JSUTILS || {} })
}
// 获取 JSUTILS 方法集合 用于匹配扫码展示
const getSdkApi = () => {
  getScript(JS_UTILS_API, () => {
      JSUTILSAPI = window.JSUTILSAPI || []
      if (JSUTILSAPI && JSUTILSAPI.length) {
        findMethodNameData(JSUTILSAPI)
      }
    }
  )
}
// 查找当前url方法名所对应的数据
const findMethodNameData= (list: jsUtilsApiType[]) => {
  let data = list.find(item => item.name.trim() == methodName)
  if (data && data.name) {
    curDataSource.value = data
    inputValue.value = data.parameter || ''
  }
}
// 按钮点击函数
const submitHandle = () => {
  // 判断是什么类型的调用 是Boolean 还是 promise
  let name: any = methodName
  if (inputValue.value) {
    let isTrue = JSUTILS[name](inputValue.value.trim())
    result.value.status = '成功'
    if (isTrue) {
      result.value.msg = 'true'
      return
    }
    result.value.msg = 'false'
    return
  }
  result.value.status = '失败'
  result.value.msg = '请检查入参'
}


// 以下是函数调佣
getSdkJs()
getSdkApi()


// 以下是生命周期
onMounted(() => {
  // console.log('methodName----', methodName)
})
</script>

<template>
  <div class="index">
    <div class="index-box"><h4>方法：</h4><p>{{ methodName }}</p></div>
    <div class="index-box"><h4>版本：</h4><p>{{ curDataSource.version }}</p></div>
    <div class="index-box"><h4>描述：</h4><p>{{ curDataSource.description }}</p></div>
    <div class="index-box index-param">
      <h4>参数：</h4>
      <div class="index-param-wrap">
        <div
          class="index-param-wrap-param"
          v-for="(item, index) in curDataSource.param"
          :key="index"
        >
          <p>【{{ item.type }}】 {{ item.key }}: {{ item.value }}</p>
        </div>
      </div>
    </div>
    <div class="index-box">
      <h4>入参：</h4>
      <Field v-model="inputValue" type="textarea" label="" placeholder="请输入留言" rows="3" autosize />
    </div>
    <div class="message">
      <p>调用状态：{{ result.status || '等待执行' }}</p>
      <p>回调结果：{{ result.msg || '暂无' }}</p>
    </div>
    <div class="btn">
      <Button
        block
        :loading="loading"
        size="small"
        type="primary"
        text="点击验证"
        @click="submitHandle"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.index {
  box-sizing: border-box;
  min-height: 100vh;
  padding: 40px;
  background: #f1f1f1;
  padding-bottom: 160px;
  font-size: 28px;
  .index-box {
    margin-bottom: 24px;
    h4 {
      text-align: left;
      font-weight: 700;
      font-size: 32px;
      span {
        color: #ff5555;
        font-size: 24px;
        font-weight: 400;
      }
    }
    p {
      text-align: left;
      padding-left: 2em;
    }
    &.index-summary {
      color: #ff5555;
    }
    &.index-param {
      position: relative;
      .index-param-wrap {
        min-height: 120px;
        max-height: 360px;
        box-shadow: 0 0 10px 0 #ffffff;
        border-radius: 2px;
        overflow-y: scroll;
        padding-top: 10px;
        &-param {
          margin-bottom: 8px;
          p {
            padding-left: 0;
            text-align: left;
          }
        }
      }
    }
  }
  textarea {
    width: 100%;
  }
  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #f1f1f1;
    box-sizing: border-box;
    padding: 0 40px 64px;
  }
  .message {
    text-align: left;
  }
}
</style>
