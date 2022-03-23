<script setup lang="ts">

</script>

<template>
  <div class="demo">
    <!-- 常规的select下拉框 -->
    <div class="select">
      <p>select 控件</p>
      <select>
        <div class="scroll-to-top">向上滑动</div>
        <option value="1"></option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <div class="scroll-to-bottom">向下滑动</div>
      </select>
    </div>
    <div class="line"></div>
    <!-- 新提案的元素 -->
    <div class="selectmenu">
      <!-- <p>selectmenu 控件-默认样式</p>
      <selectmenu class="selectmenu-one">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </selectmenu>
      <div class="line"></div>
      <selectmenu class="selectmenu-two">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <div slot="button">
          <button behavior="button">Open</button>
          <span class="label">Choose an option</span>
        </div>
      </selectmenu>
      <div class="line"></div> -->
      <selectmenu class="selectmenu">
        <div slot="listbox">
          <popup behavior="listbox">
            <div class="top">向上滑动</div>
            <div class="wrap">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
              <option>Option 4</option>
              <option>Option 5</option>
            </div>
            <div class="bottom">向下滑动</div>
          </popup>
        </div>
      </selectmenu>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo {
  padding: 32px;
  box-sizing: border-box;
  .line {
    margin: 20px;
  }
  .selectmenu-one {
    &::part(button) {
      color: white;
      padding: 5px;
      border-radius: 5px;
    }
    &::part(listbox) {
      padding: 10px;
      margin-top: 5px;
      border-radius: 5px;
    }
  }
  .selectmenu-two {
    [slot='button'] {
      display: flex;
      align-content: center;
    }
    button {
      padding: 5px;
      border: none;
      background: #f06;
      border-radius: 5px 0 0 5px;
      color: white;
      font-weight: bold;
    }
    .label {
      padding: 5px;
      border: 1px solid #f06;
      border-radius: 0 5px 5px 0;
    }
  }
  .selectmenu-three {
    popup {
      width: 300px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 10px;
      padding: 10px;
      box-shadow: none;
      margin: 10px 0;
      border: 1px solid;
      background: #f7f7f7;
    }
  }
}
</style>
