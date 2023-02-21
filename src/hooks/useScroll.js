import { onActivated, onMounted, onUnmounted, ref } from "vue";
import { throttle } from "underscore";

export default function useScroll(elRef) {
  let el = window;
  const isReachBottom = ref(false);
  const scrollTop = ref(0);
  const clientHeight = ref(0);
  const scrollHeight = ref(0);
  //监听window的滚动
  const scrollListenerHandler = () => {
    if(el === window) {
      clientHeight.value = document.documentElement.clientHeight;
      scrollTop.value = document.documentElement.scrollTop;
      scrollHeight.value = document.documentElement.scrollHeight;
    }else{
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
    }
    console.log(clientHeight.value + scrollTop.value, scrollHeight.value);
    if (clientHeight.value + scrollTop.value >= scrollHeight.value - 1) {
      console.log('到底了');
      isReachBottom.value = true;
    }
  };
  onMounted(() => {
    if (elRef) el = elRef.value
    el.addEventListener("scroll", throttle(scrollListenerHandler, 300));
  });
  // onActivated(() => {
  //   el.removeEventListener("scroll", throttle(scrollListenerHandler, 300));
  // });
  onUnmounted(() => {
    el.removeEventListener("scroll", throttle(scrollListenerHandler, 300));
  });

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}
