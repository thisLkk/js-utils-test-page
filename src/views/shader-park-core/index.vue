<script setup lang="ts">
import { onMounted } from '@vue/runtime-core';
import { sculptToMinimalRenderer } from 'shader-park-core'
function spCode() {
  //Put your Shader Park Code here
  setStepSize(0.2);
  let buttonHover = input();
  let click = input();
  setStepSize(0.3);

  rotateY(time * 0.2);
  let warpedSpace = warpSpace(getSpace());
  metal(0.9);
  shine(1);
  color(1 - warpedSpace);
  sphere(0.2 + length(warpedSpace) * 0.2);
  expand(buttonHover * 0.08);

  // inspired by https://www.shadertoy.com/view/ttlGDf
  function warpSpace(p) {
    let t = time / 4;
    rotateY(getRayDirection().y * (1 - click) * 12);
    p = getSpace().x * 8.0 * (vec3(0.5, 0.2, 0.1) + p);
    for (let i = 1.0; i < 3.0; i += 1.0) {
      p.x = p.x + buttonHover * sin(2.0 * t + i * 1.5 * p.y) + t * 0.5;
      p.y = p.x + buttonHover * cos(2.0 * t + i * 1.5 * p.x);
    }
    return 0.5 + 0.5 * cos(time + vec3(p.x, p.y, p.x) + vec3(0, 2, 4));
  }
}


onMounted(() => {
  let canvas = document.querySelector('.my-canvas');
  
  const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = 200;
    canvas.height = 200;
    // canvas.width = 200 * devicePixelRatio;
    // canvas.height = 200 * devicePixelRatio;
    
    let state = {
      buttonHover: 0.0,
      currButtonHover: 0.0,
      click: 0.0,
      currClick: 0.0
    };
    let test = 5;
    
    canvas.addEventListener('mouseover', () => state.buttonHover = 5, false);
    canvas.addEventListener('mouseout', () => state.buttonHover = 0.0, false);
    canvas.addEventListener('mousedown', () => state.click = 1.0, false);
    canvas.addEventListener('mouseup', () => state.click = 0.0, false);
    
    // This converts your Shader Park code into a shader and renders it to the my-canvas element
    sculptToMinimalRenderer(canvas, spCode, () => {
      state.currButtonHover = state.currButtonHover*.999 + state.buttonHover*.001;
      state.currClick = state.currClick*.92 + state.click*.08;
      return {
        'buttonHover' : state.currButtonHover,
        'click' : state.currClick
      };
    });
})

</script>

<template>
  <div class="demo">
    <canvas class="my-canvas"></canvas>
  </div>
</template>

<style lang="scss" scoped>

</style>
