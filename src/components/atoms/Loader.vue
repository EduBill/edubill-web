<template>
  <div class="ui-loader" :style="style">
    <div class="spinner" :class="classNames">
      <div v-if="type == 'cube'"></div>
      <div v-if="type == 'cube'"></div>
      <div v-if="type == 'cube'"></div>
      <div v-if="type == 'cube'"></div>
      <div v-if="type == 'cube'"></div>
      <div v-if="type == 'cube'"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    type: {
      type: String,
      default: 'basic',
    },
    size: {
      type: Number,
      default: 1.0,
    },
  },
  computed: {
    classNames() {
      let classNames = ['animation'];
      classNames.push(this.type);
      return classNames;
    },
    style() {
      return `transform: scale(${this.size}, ${this.size});`;
    },
  },
};
</script>

<style lang="scss" scoped>
.ui-loader {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  > .spinner {
    width: unit(56);
    height: unit(56);
    border-radius: 50%;

    &.animation {
      &.basic {
        border: 9px solid;
        border-color: #dbdcef;
        border-right-color: #e4b0e3;
        animation: spinner-basic 1s infinite linear;

        @keyframes spinner-basic {
          to {
            transform: rotate(1turn);
          }
        }
      }

      &.comet {
        background: conic-gradient(#0000 10%, #e4b0e3);
        -webkit-mask: radial-gradient(
          farthest-side,
          #0000 calc(100% - 9px),
          #000 0
        );
        animation: spinner-comet 1s infinite linear;

        @keyframes spinner-comet {
          to {
            transform: rotate(1turn);
          }
        }
      }

      &.round-comet {
        border-radius: 50%;
        background:
          radial-gradient(farthest-side, #e4b0e3 94%, #0000) top/9px 9px
            no-repeat,
          conic-gradient(#0000 30%, #e4b0e3);
        -webkit-mask: radial-gradient(
          farthest-side,
          #0000 calc(100% - 9px),
          #000 0
        );
        animation: spinner-round-comet 1s infinite linear;

        @keyframes spinner-round-comet {
          to {
            transform: rotate(1turn);
          }
        }
      }

      &.material {
        border: 9px solid #e4b0e3;
        animation:
          spinner-material-outter 0.8s infinite linear alternate,
          spinner-material-inner 1.6s infinite linear;

        @keyframes spinner-material-outter {
          0% {
            clip-path: polygon(
              50% 50%,
              0 0,
              50% 0%,
              50% 0%,
              50% 0%,
              50% 0%,
              50% 0%
            );
          }

          12.5% {
            clip-path: polygon(
              50% 50%,
              0 0,
              50% 0%,
              100% 0%,
              100% 0%,
              100% 0%,
              100% 0%
            );
          }

          25% {
            clip-path: polygon(
              50% 50%,
              0 0,
              50% 0%,
              100% 0%,
              100% 100%,
              100% 100%,
              100% 100%
            );
          }

          50% {
            clip-path: polygon(
              50% 50%,
              0 0,
              50% 0%,
              100% 0%,
              100% 100%,
              50% 100%,
              0% 100%
            );
          }

          62.5% {
            clip-path: polygon(
              50% 50%,
              100% 0,
              100% 0%,
              100% 0%,
              100% 100%,
              50% 100%,
              0% 100%
            );
          }

          75% {
            clip-path: polygon(
              50% 50%,
              100% 100%,
              100% 100%,
              100% 100%,
              100% 100%,
              50% 100%,
              0% 100%
            );
          }

          100% {
            clip-path: polygon(
              50% 50%,
              50% 100%,
              50% 100%,
              50% 100%,
              50% 100%,
              50% 100%,
              0% 100%
            );
          }
        }

        @keyframes spinner-material-inner {
          0% {
            transform: scaleY(1) rotate(0deg);
          }

          49.99% {
            transform: scaleY(1) rotate(135deg);
          }

          50% {
            transform: scaleY(-1) rotate(0deg);
          }

          100% {
            transform: scaleY(-1) rotate(-135deg);
          }
        }
      }

      &.counter-arcs {
        display: grid;
        animation: spinner-counter-arcs 4s infinite;

        &::before,
        &::after {
          content: '';
          grid-area: 1/1;
          border: 9px solid;
          border-radius: 50%;
          border-color: #e4b0e #e4b0e3 #0000 #0000;
          mix-blend-mode: darken;
          animation: spinner-counter-arcs 1s infinite linear;
        }

        &::after {
          border-color: #0000 #0000 #e4b0e3 #e4b0e3;
          opacity: 0.3;
          animation-direction: reverse;
        }

        @keyframes spinner-counter-arcs {
          100% {
            transform: rotate(1turn);
          }
        }
      }

      &.activity {
        border-radius: 50%;
        display: grid;
        -webkit-mask: radial-gradient(farthest-side, #0000 40%, #e4b0e3 41%);
        background:
          linear-gradient(0deg, rgba(#e4b0e3, 0.5) 50%, rgba(#e4b0e3, 1) 0)
            center/4.5px 100%,
          linear-gradient(90deg, rgba(#e4b0e3, 0.25) 50%, rgba(#e4b0e3, 0.75) 0)
            center/100% 4.5px;
        background-repeat: no-repeat;
        animation: spinner-activity 1s infinite steps(12);

        &::before,
        &::after {
          content: '';
          grid-area: 1/1;
          border-radius: 50%;
          background: inherit;
          opacity: 0.915;
          transform: rotate(30deg);
        }

        &::after {
          opacity: 0.83;
          transform: rotate(60deg);
        }

        @keyframes spinner-activity {
          100% {
            transform: rotate(1turn);
          }
        }
      }

      &.double-arc {
        border: 9px solid;
        border-color: #e4b0e3 #0000;
        animation: spinner-double-arc 1s infinite;

        @keyframes spinner-double-arc {
          to {
            transform: rotate(0.5turn);
          }
        }
      }

      &.borders {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        &::before,
        &::after {
          border: 6.7px solid #e4b0e3;
          border-radius: 50%;
          position: absolute;
          content: '';
          display: block;
        }

        &::before {
          width: 33.6px;
          height: 33.6px;
          border-bottom-color: transparent;
          border-left-color: transparent;
          animation: spinner-borders 0.75s infinite linear reverse;
        }

        &::after {
          animation: spinner-borders 0.5s infinite linear;
          height: 56px;
          width: 56px;
          border-right-color: transparent;
          border-top-color: transparent;
        }

        @keyframes spinner-borders {
          to {
            transform: rotate(360deg);
          }
        }
      }

      &.cube {
        width: unit(44.8);
        height: unit(44.8);
        animation: spinner-cube 2s infinite ease;
        transform-style: preserve-3d;

        > div {
          background-color: rgba(71, 75, 255, 0.2);
          height: 100%;
          position: absolute;
          width: 100%;
          border: 2.2px solid #e4b0e3;

          &:nth-of-type(1) {
            transform: translateZ(-22.4px) rotateY(180deg);
          }

          &:nth-of-type(2) {
            transform: rotateY(-270deg) translateX(50%);
            transform-origin: top right;
          }

          &:nth-of-type(3) {
            transform: rotateY(270deg) translateX(-50%);
            transform-origin: center left;
          }

          &:nth-of-type(4) {
            transform: rotateX(90deg) translateY(-50%);
            transform-origin: top center;
          }

          &:nth-of-type(5) {
            transform: rotateX(-90deg) translateY(50%);
            transform-origin: bottom center;
          }

          &:nth-of-type(6) {
            transform: translateZ(22.4px);
          }
        }

        @keyframes spinner-cube {
          0% {
            transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
          }

          50% {
            transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
          }

          100% {
            transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
          }
        }
      }
    }
  }
}
</style>
