<template>
  <div class="max-w-sm mx-auto p-6 space-y-3">
    <h1 class="text-xl font-semibold">Create User</h1>

    <input v-model="name" type="text" placeholder="Name" class="w-full border rounded p-2" />
    <input v-model="email" type="email" placeholder="Email" class="w-full border rounded p-2" />

    <button @click="createUser" class="w-full bg-blue-500 text-white rounded p-2">
      Create
    </button>
    
  </div>

 <div class="text-center">
 <NuxtLink to="/usersList" class="bg-blue-600 text-2xl text-white">Views Users</NuxtLink>
  
 </div>
</template>

<script setup lang="ts">
import UsersList from './usersList.vue';

UsersList
//import { ref } from "vue";

const name = ref("");
const email = ref("");

async function createUser() {
  // very basic client check (server also validates)
  if (!name.value || !email.value) {
    alert("Please enter name and email");
    return;
  }

  try {
    const res = await $fetch("/api/users", {
      method: "POST",
      body: { name: name.value, email: email.value },
    });

    // success: clear inputs and show a simple message
    name.value = "";
    email.value = "";
    alert("User created successfully ✅");
  } catch (e: any) {
    // show whatever the server said (your route returns 400/409 messages)
    alert(e?.statusMessage || "Failed to create user");
  }
}
</script>
