<template>
    <div class="flex flex-wrap gap-2 mb-4">
      <button
        v-for="filter in filters"
        :key="filter.key"
        @click="$emit('filter-change', filter.key)"
        :class="filterButtonClasses(filter.key)"
        class="px-3 py-2 text-sm font-medium rounded-md transition-colors"
      >
        {{ filter.label }}
        <span v-if="filter.count" class="ml-1 text-xs opacity-75">
          ({{ filter.count }})
        </span>
      </button>
    </div>
  </template>

  <script setup lang="ts">
  import { computed } from 'vue'
  import type { Issue, ScoreCategory } from '@/types/audit'

  interface Props {
    issues: Issue[]
    activeFilter: string
  }

  interface FilterOption {
    key: string
    label: string
    count: number
  }

  const props = defineProps<Props>()

  defineEmits<{
    'filter-change': [filter: string]
  }>()

  const filters = computed((): FilterOption[] => {
    const allCount = props.issues.length
    const categoryCount = (category: ScoreCategory) =>
      props.issues.filter(issue => issue.category === category).length

    return [
      { key: 'all', label: 'All Issues', count: allCount },
      { key: 'performance', label: 'Performance', count:
  categoryCount('performance') },
      { key: 'seo', label: 'SEO', count: categoryCount('seo') },
      { key: 'accessibility', label: 'Accessibility', count:
  categoryCount('accessibility') },
      { key: 'security', label: 'Security', count:
  categoryCount('security') }
    ]
  })

  const filterButtonClasses = (filterKey: string): string => {
    const isActive = props.activeFilter === filterKey

    if (isActive) {
      return 'bg-blue-600 text-white shadow-sm'
    }

    return 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
  }
  </script>
