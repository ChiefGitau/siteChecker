<template>
    <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">
          Issues Found ({{ filteredIssues.length }})
        </h2>
      </div>

      <!-- Filters -->
      <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <IssueFilters
          :issues="issues"
          :active-filter="activeFilter"
          @filter-change="handleFilterChange"
        />
      </div>

      <!-- Issues List -->
      <div class="divide-y divide-gray-200">
        <div
          v-for="issue in filteredIssues"
          :key="issue.id"
          class="p-6 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-start space-x-4">
            <!-- Severity Badge -->
            <div :class="severityBadgeClasses(issue.severity)"
                 class="flex-shrink-0 px-2 py-1 rounded-full text-xs
  font-semibold">
              {{ issue.severity.toUpperCase() }}
            </div>

            <!-- Issue Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-base font-medium text-gray-900 truncate">
                  {{ issue.title }}
                </h3>
                <span :class="categoryBadgeClasses(issue.category)"
                      class="flex-shrink-0 px-2 py-1 rounded text-xs
  font-medium">
                  {{ formatCategory(issue.category) }}
                </span>
              </div>

              <p class="text-sm text-gray-600 mb-2">
                {{ issue.description }}
              </p>

              <div class="bg-blue-50 border-l-4 border-blue-400 p-3
  rounded-r">
                <p class="text-sm text-blue-800">
                  <span class="font-medium">How to fix:</span> {{
  issue.recommendation }}
                </p>
              </div>

              <div v-if="issue.selector" class="mt-2 text-xs text-gray-500
  font-mono">
                Selector: {{ issue.selector }}
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredIssues.length === 0" class="p-8 text-center
  text-gray-500">
          <p>No issues found for the selected filter.</p>
        </div>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import IssueFilters from './IssueFilters.vue'
  import type { Issue, ScoreCategory } from '@/types/audit'

  interface Props {
    issues: Issue[]
  }

  const props = defineProps<Props>()

  const activeFilter = ref<string>('all')

  const filteredIssues = computed(() => {
    if (activeFilter.value === 'all') {
      return props.issues
    }
    return props.issues.filter(issue => issue.category ===
  activeFilter.value)
  })

  const handleFilterChange = (filter: string) => {
    activeFilter.value = filter
  }

  const severityBadgeClasses = (severity: string): string => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border border-red-200'
      case 'medium': return 'bg-amber-100 text-amber-800 border border-amber-200'
      case 'low': return 'bg-blue-100 text-blue-800 border border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border border-gray-200'
    }
  }



  const categoryBadgeClasses = (category: ScoreCategory): string => {
    switch (category) {
      case 'performance': return 'bg-purple-100 text-purple-800'
      case 'seo': return 'bg-green-100 text-green-800'
      case 'accessibility': return 'bg-indigo-100 text-indigo-800'
      case 'novti': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCategory = (category: ScoreCategory): string => {
    switch (category) {
      case 'performance': return 'Performance'
      case 'seo': return 'SEO'
      case 'accessibility': return 'Accessibility'
      case 'novti': return 'Novti'
    }
  }
  </script>