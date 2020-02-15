<template>
  <div class="test-btn">
    <div class="btn-shadow-inset"></div>
    <div class="btn-text">
      <span>按钮</span>
    </div>
    <div class="btn-shadow"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
@border-color: #e7e7e7;
@border-middle-color: mix(@border-color, #fff, 50%);
@border-last-color: mix(@border-color, #fff, 100%);
@border-color-default: linear-gradient(
  to right,
  #e7e7e7 0%,
  #e7e7e7 50%,
  #fff 50%,
  #fff 100%
);
.test-btn {
  position: relative;
  margin: 60px;
  // background: @border-color;
  width: 60px;
  height: 60px;
  // border-radius: 15px;
  // box-shadow: 5px 0 3px mix(@border-color, #fff, 60%);
  .btn-text {
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    // display: flex;
    // justify-items: center;
  }
  .btn-shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 60px;
    border-radius: 10px;
    box-shadow: 15px 15px 15px mix(@border-color, #fff, 40%);
    transition: box-shadow 3s ease-in 1s;
    // &:hover {
    //   box-shadow: 10px 10px 15px mix(@border-color, #fff, 40%) inset;
    // }
    &:active {
      box-shadow: 16px 16px 20px mix(@border-color, #fff, 80%) inset;
    }
  }
  
  .btn-shadow-inset {
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 60px;
    border-radius: 10px;
    box-shadow: 15px 15px 15px mix(@border-color, #fff, 60%);
    transition: box-shadow 3s ease-in 1s;
    // &:hover {
    //   box-shadow: 10px 10px 15px mix(@border-color, #fff, 60%) inset;
    // }
    &:active {
      box-shadow: 16px 16px 20px mix(@border-color, #fff, 80%) inset;
    }
  }
}
</style>