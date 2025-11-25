<template>
    <div id="app" class="min-h-screen bg-gray-100">
      <header class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-4">
            <h1 class="text-xl font-semibold text-gray-900">Site Quality
  Checker</h1>
            <nav class="space-x-4">
              <router-link to="/" class="text-gray-600
  hover:text-gray-900">Dashboard</router-link>
              <router-link to="/new" class="bg-blue-600 text-white px-4
  py-2 rounded-md hover:bg-blue-700">New Audit</router-link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <NewAuditView />
      </main>
    </div>
  </template>

  <script setup lang="ts">
import NewAuditView from './pages/NewAuditView.vue';

  // Component logic will go here
  </script>