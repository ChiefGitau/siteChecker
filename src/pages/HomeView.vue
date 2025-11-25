<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <!-- Hero Section -->
      <div class="max-w-7xl mx-auto px-4 py-16">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Site Quality
            <span class="text-blue-600">Checker</span>
          </h1>
          <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Analyze your website's performance, SEO, accessibility, and security in seconds.
            Get actionable insights to improve your site's quality.
          </p>
          <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <button
              @click="goToNewAudit"
              class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600
  hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              Start Free Audit
            </button>
          </div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="max-w-7xl mx-auto px-4 pb-16">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <!-- Performance Feature -->
          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Performance</h3>
            <p class="text-gray-600 text-sm">
              Check loading speed, response times, and optimization opportunities.
            </p>
          </div>

          <!-- SEO Feature -->
          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">SEO</h3>
            <p class="text-gray-600 text-sm">
              Analyze meta tags, headings, and search engine optimization factors.
            </p>
          </div>

          <!-- Accessibility Feature -->
          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6
   0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Accessibility</h3>
            <p class="text-gray-600 text-sm">
              Ensure your site is accessible to users with disabilities.
            </p>
          </div>

          <!-- Security Feature -->
          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955
  11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Security</h3>
            <p class="text-gray-600 text-sm">
              Check for security headers, HTTPS, and vulnerability indicators.
            </p>
          </div>

                    <!-- Security Feature -->
          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955
  11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">NOVTI</h3>
            <p class="text-gray-600 text-sm">
              Check for Form configuration .
            </p>
          </div>
        </div>
      </div>

    </div>
  </template>

  <script setup lang="ts">


  const goToNewAudit = () => {
    console.log('Navigate to New Audit page')
    // TODO: When router is set up, use:
    // router.push('/new-audit')
  }
  </script>