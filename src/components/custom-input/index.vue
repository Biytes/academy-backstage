<template lang="html">
  <span class="customInput">
    <input :class="pattern"
           :id="label"
           :type="type"
           :placeholder="placeholder"
           :autofocus="focus"
           :value="bindValue"
           @input="handleInput"/>
    <label for="label">{{ label }}</label>
  </span>
</template>

<script>
export default {
  name: 'customInput',
  data () {
    return {
      bindValue: this.value
    }
  },
  conputed: {
  },
  // type:input类型
  // label:
  // placeholder
  props: ['type', 'label', 'placeholder', 'pattern', 'value', 'focus'],
  methods: {
    // 双向绑定
    handleInput (event) {
      let value = event.target.value
      this.$emit('input', value)
    }
  }
}

</script>

<style lang="scss" scoped>

$input-color: #377D6A;
$input-background-color: #efefef;
$label-color: #fff;
$label-background-color: #7AB893;
$input-width: 310px;
$text-indent: 100px;

.customInput{
  position: relative;
  display: inline-block;
  margin: 30px 10px;
  .basic {
    @extend %basic-slide;
  }

  .clean {
    @extend %clean-slide;
  }

  .gate {
    @extend %gate-skew;
  }

  .skinny {
    @extend %skinny-scale;
  }

  .up {
    @extend %up-slide;
  }

  .swing {
    @extend %swing-rotate;
  }

  .balloon {
    @extend %balloon-slide;
  }
}

%basic-slide {
  display: inline-block;
  width: $input-width;
  padding: 12px 0 12px 15px;
  font-family: "Open Sans", sans;
  font-weight: 400;
  color: $input-color;
  background: $input-background-color;
  border: 0;
  border-radius: 3px;
  outline: 0;
  text-indent: 70px; // Arbitrary.
  transition: all .3s ease-in-out;

  &::-webkit-input-placeholder {
    color: #efefef;
    text-indent: 0;
    font-weight: 300;
  }

  + label {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 15px;
    text-shadow: 0 1px 0 rgba(19,74,70,.4);
    color: $label-color;
    background: $label-background-color;
    transition: all .3s ease-in-out;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  &:focus,
  &:active {
    color: #377D6A;
    text-indent: 0;
    background: #fff;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    &::-webkit-input-placeholder {
      color: #aaa;
    }
    + label {
      transform: translateX(-100%);
    }
  }
}

%clean-slide {
  position: relative;
  display: inline-block;
  width: $input-width;
  padding: 10px 0 10px 15px;
  font-family: "Open Sans", sans;
  font-weight: 400;
  color: #377D6A;
  background: #efefef;
  border: 0;
  border-radius: 3px;
  outline: 0;
  text-indent: 60px; // Arbitrary.
  transition: all .3s ease-in-out;

  &::-webkit-input-placeholder {
    color: #efefef;
    text-indent: 0;
    font-weight: 300;
  }

  + label {
    display: inline-block;
    position: absolute;
    transform: translateX(0);
    top: 0;
    left: 0;
    bottom: 0;
    padding: 11px 15px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: #032429;
    text-align: left;
    text-shadow: 0 1px 0 rgba(255,255,255,.4);
    transition: all .3s ease-in-out, color .3s ease-out;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    overflow: hidden;

    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 100%;
      bottom: 0;
      width: 100%;
      background: #7AB893;
      z-index: -1;
      transform: translate(0);
      transition: all .3s ease-in-out;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
  }

  &:focus,
  &:active {
    color: #377D6A;
    text-indent: 0;
    background: #fff;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    &::-webkit-input-placeholder {
      color: #aaa;
    }

    + label {
      color: #fff;
      text-shadow: 0 1px 0 rgba(19,74,70,.4);
      transform: translateX(-100%);

      &:after {
        transform: translate(100%);
      }
    }
  }
}

%gate-skew {
  display: inline-block;
  width: $input-width;
  padding: 12px 0 12px 15px;
  font-family: "Open Sans", sans;
  font-weight: 400;
  color: #377D6A;
  background: #efefef;
  border: 0;
  border-radius: 3px;
  outline: 0;
  text-indent: $text-indent; // Arbitrary.
  transition: all .3s ease-in-out;

  &::-webkit-input-placeholder {
    color: #efefef;
    text-indent: 0;
    font-weight: 300;
  }

  + label {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 15px;
    text-shadow: 0 1px 0 rgba(19,74,70,.4);
    color: $label-color;
    background: $label-background-color;
    transition: all .4s ease-in-out;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    transform-origin: left bottom;
    z-index: 99;

    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 3px;
      background: #377D6A;
      transform-origin: left bottom;
      transition: all .4s ease-in-out;
      pointer-events: none;
      z-index: -1;
    }
    &:before {
      background: rgba(3,36,41,.2);
      z-index: -2;
      right: 20%;
    }
  }

  &:focus,
  &:active {
    color: #377D6A;
    text-indent: 0;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;

    &::-webkit-input-placeholder {
      color: #aaa;
    }
    + label {
      transform: rotate(-66deg);
      border-radius: 3px;

      &:before {
        transform: rotate(10deg);
      }
    }
  }
}

%skinny-scale {
  display: inline-block;
  width: $input-width;
  padding: 12px 0 12px 15px;
  font-family: "Open Sans", sans;
  font-weight: 400;
  color: #377D6A;
  background: #efefef;
  border: 0;
  border-radius: 3px;
  outline: 0;
  text-indent: 75px; // Arbitrary.
  transition: all .3s ease-in-out;

  &::-webkit-input-placeholder {
    color: #efefef;
    text-indent: 0;
    font-weight: 300;
  }

  + label {
    display: inline-block;
    position: absolute;
    transform: translateX(0);
    top: 0;
    left: 0;
    padding: 10px 15px;
    text-shadow: 0 1px 0 rgba(19,74,70,.4);
    transition: all .3s ease-in-out;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    overflow: hidden;

    &:before,
    &:after {
      content: "";
      position: absolute;
      right: 0;
      left: 0;
      z-index: -1;
      transition: all .3s ease-in-out;
    }

    &:before {
      // Skinny bit here
      top: 5px;
      bottom: 5px;
      background: #377D6A; // change this to #134A46
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }

    &:after {
      top: 0;
      bottom: 0;
      background: #377D6A;
    }
  }

  &:focus,
  &:active {
    color: #377D6A;
    text-indent: 0;
    background: #fff;

    &::-webkit-input-placeholder {
      color: #aaa;
    }
    + label {
      transform: translateX(-100%);

      &:after {
        transform: translateX(100%);
      }
    }
  }
}

%up-slide {
  display: inline-block;
  width: $input-width;
  padding: 12px 0 12px 15px;
  font-family: "Open Sans", sans;
  font-weight: 400;
  color: #377D6A;
  background: #efefef;
  border: 0;
  border-radius: 3px;
  outline: 0;
  text-indent: 80px; // Arbitrary.
  transition: all .3s ease-in-out;

  &::-webkit-input-placeholder {
    color: #efefef;
    text-indent: 0;
    font-weight: 300;
  }

  + label {
    display: inline-block;
    position: absolute;
    transform: translateX(0);
    top: 0;
    left: 0;
    padding: 10px 15px;
    text-shadow: 0 1px 0 rgba(19,74,70,.4);
    transition: all .3s ease-in-out;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    overflow: hidden;

    &:before,
    &:after {
      content: "";
      position: absolute;
      right: 0;
      left: 0;
      z-index: -1;
      transition: all .3s ease-in-out;
    }

    &:before {
      // Skinny bit here
      top: 6px;
      left: 5px;
      right: 5px;
      bottom: 6px;
      background: #377D6A; // change this to #134A46
    }

    &:after {
      top: 0;
      bottom: 0;
      background: #377D6A;
    }
  }

  &:focus,
  &:active {
    color: #377D6A;
    text-indent: 0;
    background: #fff;

    &::-webkit-input-placeholder {
      color: #aaa;
    }
    + label {
      transform: translateY(-100%);

      &:before {
        border-radius: 5px;
      }
      &:after {
        transform: translateY(100%);
      }
    }
  }
}

%swing-rotate {
  display: inline-block;
  width: $input-width;
  padding: 12px 0 12px 15px;
  font-family: "Open Sans", sans;
  font-weight: 400;
  color: #377D6A;
  background: #efefef;
  border: 0;
  border-radius: 3px;
  outline: 0;
  text-indent: 60px; // Arbitrary.
  transition: all .3s ease-in-out;

  &::-webkit-input-placeholder {
    color: #efefef;
    text-indent: 0;
    font-weight: 300;
  }

  + label {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 15px;
    text-shadow: 0 1px 0 rgba(19,74,70,.4);
    color: $label-color;
    background: $label-background-color;
    background: #7AB893;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    transform-origin: 2px 2px;
    transform: rotate(0);
    // There should be a better way
    animation: swing-back .4s 1 ease-in-out;
  }

  &:focus,
  &:active {
    color: #377D6A;
    text-indent: 0;
    background: #fff;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    &::-webkit-input-placeholder {
      color: #aaa;
    }

    + label {
      animation: swing 1.4s 1 ease-in-out;
      transform: rotate(82deg);
    }
  }

  @keyframes swing {
    0% {
      transform: rotate(0);
    }
    20% {
      transform: rotate(116deg);
    }
    40% {
      transform: rotate(60deg);
    }
    60% {
      transform: rotate(98deg);
    }
    80% {
      transform: rotate(76deg);
    }
    100% {
      transform: rotate(82deg);
    }
  }
  @keyframes swing-back {
    0% {
      transform: rotate(82deg);
    }
    100% {
      transform: rotate(0);
    }
  }
}

%balloon-slide {
  // As suggested by https://twitter.com/dbox/status/365888496486985728
  display: inline-block;
  width: $input-width;
  padding: 12px 0 12px 15px;
  font-family: "Open Sans", sans;
  font-weight: 400;
  color: #377D6A;
  background: #efefef;
  border: 0;
  border-radius: 3px;
  outline: 0;
  text-indent: 60px; // Arbitrary.
  transition: all .3s ease-in-out;

  &::-webkit-input-placeholder {
    color: #efefef;
    text-indent: 0;
    font-weight: 300;
  }

  + label {
    display: inline-block;
    position: absolute;
    top: 8px;
    left: 0;
    bottom: 8px;
    padding: 5px 15px;
    color: #032429;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    text-shadow: 0 1px 0 rgba(19,74,70,0);
    transition: all .3s ease-in-out;
    border-radius: 3px;
    background: rgba(122,184,147,0);

    &:after {
      position: absolute;
      content: "";
      width: 0;
      height: 0;
      top: 100%;
      left: 50%;
      margin-left: -3px;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      border-top: 3px solid rgba(122,184,147,0);
      transition: all .3s ease-in-out;
    }
  }

  &:focus,
  &:active {
    color: #377D6A;
    text-indent: 0;
    background: #fff;

    &::-webkit-input-placeholder {
      color: #aaa;
    }
    + label {
      color: #fff;
      text-shadow: 0 1px 0 rgba(19,74,70,.4);
      background: rgba(122,184,147,1);
      transform: translateY(-40px);

      &:after {
        border-top: 4px solid rgba(122,184,147,1);
      }
    }
  }
}
</style>
