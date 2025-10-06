<template>
  <div class="mt-8">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-xl font-semibold text-gray-800">User List</h2>
      <button @click="load" class="bg-blue-600 text-white px-4 py-2 rounded">
        Refresh
      </button>
    </div>

    <div class="overflow-x-auto border rounded">
      <table class="min-w-full text-sm">
        <thead class="bg-blue-100 text-gray-700">
          <tr>
            <th class="px-4 py-2 text-left">#</th>
            <th class="px-4 py-2 text-left">Name</th>
            <th class="px-4 py-2 text-left">Email</th>
            <th class="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(u, i) in users" :key="u.id" class="hover:bg-blue-50">
            <td class="px-4 py-2">{{ i + 1 }}</td>

            <!-- editable fields -->
            <td class="px-4 py-2">
              <input
                v-if="editingId === u.id"
                v-model="editName"
                class="border rounded p-1 w-full"
              />
              <span v-else>{{ u.name }}</span>
            </td>

            <td class="px-4 py-2">
              <input
                v-if="editingId === u.id"
                v-model="editEmail"
                class="border rounded p-1 w-full"
              />
              <span v-else>{{ u.email }}</span>
            </td>

            <td class="px-4 py-2">
              <button
                v-if="editingId !== u.id"
                @click="startEdit(u)"
                class="text-blue-600 underline"
              >
                Edit
              </button>
              <button
                v-else
                @click="save(u.id)"
                class="text-green-600 underline mr-2"
              >
                Save
              </button>
              <button
                v-if="editingId === u.id"
                @click="cancelEdit"
                class="text-red-500 underline"
              >
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="users.length === 0" class="text-center text-gray-500 mt-4">
      No users found
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const users = ref([]);
const editingId = ref(null);
const editName = ref("");
const editEmail = ref("");

// Load users
async function load() {
  const res = await $fetch("/api/users");
  users.value = res.users || [];
}
await load();

// Start editing
function startEdit(u) {
  editingId.value = u.id;
  editName.value = u.name;
  editEmail.value = u.email;
}

// Cancel editing
function cancelEdit() {
  editingId.value = null;
  editName.value = "";
  editEmail.value = "";
}

// Save edited user
async function save(id) {
  await $fetch(`/api/users/${id}`, {
    method: "PUT",
    body: { name: editName.value, email: editEmail.value },
  });

  await load(); // refresh list
  cancelEdit();
}
</script>
