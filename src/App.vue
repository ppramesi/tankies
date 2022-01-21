<template>
  <div id="app">
    <canvas id="pixi" ref="pixi"></canvas>
  </div>
</template>

<script>
import Engine from "./engine/engine.js";

export default {
  name: "ConnectionsLayer",
  methods: {
    drawPixi() {
      //   drawGrid(document.getElementById("pixi"));
      this.engine = new Engine(
        this.$refs.pixi,
        window.innerWidth,
        window.innerHeight
      );
      this.engine.drawGrids(30, 2)
      this.engine.insertTank("asdfasdasdf", 38, 38);
      console.log(this.engine)
    },
  },
  mounted() {
    this.drawPixi();
  },
  data() {
    return {
      grid: [],
      engine: null,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
body {
  margin: 0;
  /* background-color: black; */
}
</style>
