  <template>
    <div class="max-w-2xl mx-auto p-6">
      <div class="bg-white rounded-lg shadow-sm border p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Site Quality Checker
        </h1>
        <p class="text-gray-600 mb-8">
          Enter a website URL to analyze its performance, SEO, accessibility, and security.
        </p>

        <form @submit.prevent="startAudit" class="space-y-6">
          <!-- URL Input -->
          <div>
            <label for="url" class="block text-sm font-medium text-gray-700 mb-2">
              Website URL
            </label>
            <div class="relative">
              <input
                id="url"
                v-model="url"
                type="url"
                placeholder="https://example.com"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-300': urlError }"
              />
              <div v-if="urlError" class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0
  00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <p v-if="urlError" class="mt-1 text-sm text-red-600">
              {{ urlError }}
            </p>
          </div>

          <!-- Audit Options -->
          <div class="bg-gray-50 p-4 rounded-md">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Audit Options</h3>
            <div class="space-y-2">
              <label class="flex items-center">
                <input
                  v-model="options.includePerformance"
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="ml-2 text-sm text-gray-700">Performance Analysis</span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="options.includeSEO"
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="ml-2 text-sm text-gray-700">SEO Analysis</span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="options.includeAccessibility"
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="ml-2 text-sm text-gray-700">Accessibility Analysis</span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="options.includeSecurity"
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="ml-2 text-sm text-gray-700">Security Analysis</span>
              </label>
               <label class="flex items-center">
                <input
                  v-model="options.includeNovti"
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="ml-2 text-sm text-gray-700">Novti Analysis</span>
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading || !url"
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <span v-if="!isLoading">Start Audit</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135
  5.824 3 7.938l3-2.647z" />
              </svg>
              Running Audit...
            </span>
          </button>
        </form>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import  {ref, reactive} from 'vue';

  // Form state
  const url = ref('');
  const urlError = ref('');
  const isLoading = ref(false);


  //audit options
  const options = reactive({
    includePerformance: true,
    includeSEO: true,
    includeAccessibility: true,
    includeSecurity: true,
    includeNovti: true
  });

  //Methods 
  const startAudit = async () => {
   urlError.value = '';

   //basic URL validation
   if (!isvalidUrl(url.value)) {
     urlError.value = 'Please enter a valid URL.';
     return;
   }

    isLoading.value = true;

    try{
        //todo repalce with actual api call
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Audit started for:', url.value)
        console.log('Options:', options)

              // TODO: Navigate to audit results when router is set up
      // router.push('/audit/results')



    }
    catch(error){
        urlError.value = 'Failed to start audit. Please try again.';
        console.error(error);
    }
    finally{
        isLoading.value = false;
    }
  };

  const isvalidUrl = (string : string): boolean => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };
  </script>



 