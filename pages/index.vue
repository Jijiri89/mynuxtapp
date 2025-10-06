<template>
    <div>
    <p class="b">{{ counter }}</p>
    <button @click="increaseCounter">+</button>
    <button @click="decreaseCounter">-</button>

    </div>
</template>

<script setup lang="ts">
let counter=ref(0)
function increaseCounter(){
    counter.value +=1
}
function decreaseCounter(){
   if(counter.value>0){
     counter.value -=1
   }
}

</script>

<style scoped>
.b{
    background-color: blue;
    color: white;
    text-align: center;
    margin: auto;
    padding: 50px;
}
button{
    background-color: blue;
    color: white;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: block;
     margin: 2rem auto; 
}
</style>