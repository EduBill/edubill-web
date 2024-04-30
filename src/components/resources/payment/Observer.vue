<template>
    <div ref="observerElement"></div>
</template>

<script setup lang="ts">
import { emit } from 'process';
import { onBeforeMount, onMounted, ref,getCurrentInstance  } from 'vue';


let observer:IntersectionObserver | null = null;
const observerOptions = {
    rootMargin:'0px',
    threshold:1.0
};

onMounted(()=>{
    createObserver();
});

onBeforeMount(()=>{
    if(observer){
        observer.disconnect();
    }
})

const createObserver = () =>{
    const instance = getCurrentInstance();
    const observerElement =ref<HTMLElement | null>(null);
    observer = new IntersectionObserver((entries)=>{
        if(entries[0].isIntersecting){
            instance?.emit('show');
        }else{
            instance?.emit('hidden');
        }

    },observerOptions);
    if (observerElement.value) { 
        observer.observe(observerElement.value);
    }
}
</script>

<style scoped>

</style>