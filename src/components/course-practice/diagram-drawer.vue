<template>
  <div id="canvas">
    <canvas ref="canvas" width="10000" height="10000" />
  </div>
</template>

<script>
// import axios from 'axios';
import Drawer from '@/lib/drawer';

export default {
  name: 'DiagramDrawer',
  props: {
    tree: Object
  },
  data() {
    return {
      // tree: {},
      drawer: null
    }
  },
  // watch: {
  //   tree(value) {
  //     Object.keys(value).forEach((key) => {
  //       this.drawer.drawEllipse(key);
  //       this.createBlock(value[key])
  //     });
  //     // this.drawer.drawEllipse('some text', true);
  //     // this.drawer.drawRectangle('some text2');
  //     // this.drawer.drawRectangle('some text2');
  //   }
  // },
  watch: {
    tree(value) {
      this.drawer.clear();

      Object.entries(value).forEach(([key, value]) => {
        this.drawer.drawEllipse(`${key}(${value.params})`);
        this.createBlock(value)
        this.drawer.drawLines();
      });
    }
  },
  mounted() {
    const ctx = this.$refs.canvas.getContext('2d');
    this.drawer = new Drawer(ctx);
    // console.log(ctx);

    // const code =
    //   // 'a = 0\r\n' +
    //   // 'while a < 5:\r\n' +
    //   // '\tif a > 2:\r\n' +
    //   // '\t\ta = a + 2\r\n' +
    //   // '\telse:\r\n' +
    //   // '\t\ta = a + 1\r\n' +
    //   // '\t\tprint(a)\r\n' +
    //   // '\tprint(a)\r\n' +
    //   // 'b = 5\r\n' +
    //   // 'while b < 10:\r\n' +
    //   // '\tb += 1';
    //   'def sum(count):\r\n' +
    //   '\tres = 0\r\n' +
    //   '\ti = 0\r\n' +
    //   '\twhile i < count:\r\n' +
    //   '\t\tres += i\r\n' +
    //   '\treturn res';
    // axios
    //   .post('http://localhost:3000/api/v1/code_commands/generate_tree', { code })
    //   .then((response) => {
    //     const { tree } = response.data;

    //     Object.entries(tree).forEach(([key, value]) => {
    //       this.drawer.drawEllipse(`${key}(${value.params})`);
    //       this.createBlock(value)
    //       this.drawer.drawLines();
    //     });
    //   })
  },
  methods: {
    createBlock(element, parentArray = [], index = 0) {
      if (Object.prototype.hasOwnProperty.call(element, 'lines')) {
        if (element.type === 'condition' && element.subtype === 'else') {
          const count = parentArray[index - 1].lines.length;
          Array.from(Array(count)).forEach(() => {
            this.drawer.moveUp();
          });
          this.drawer.addElsePosition(count);
        }

        if (Object.prototype.hasOwnProperty.call(element, 'value') && element.value !== '') {
          this.drawer.drawRhombus(element.value, element.type);
          if (element.type !== 'cycle') {
            this.drawer.moveLeft();
          }
        }

        element.lines.forEach((value, index) => {
          this.createBlock(value, element.lines, index);
        });

        if (element.type === 'cycle') {
          this.drawer.addCycleLine();
        }

        if (element.type === 'condition' && element.subtype === 'else') {
          this.drawer.moveLeft();
          this.drawer.moveDown();
        }

        if (Object.prototype.hasOwnProperty.call(element, 'value') && element.value !== '') {
          this.drawer.moveRight();
        }

        return;
      }

      if (Object.prototype.hasOwnProperty.call(element, 'value')) {
        switch(element.type) {
          case 'print':
            this.drawer.drawParallelogram(element.value);
            break;
          case 'function_call':
            this.drawer.drawRectangleWithLines(element.value);
            break;
          case 'function_return':
            if (element.value !== '') {
              this.drawer.drawRectangle(element.value);
            }
            this.drawer.drawEllipse('Возврат');
            break;
          default:
            this.drawer.drawRectangle(element.value);
            break;
        }
      }
    }
  }
}
</script>

<style scoped>
  #canvas {
    max-height: 500px;
    max-width: 950px;
    overflow-y: scroll;
  }
</style>
