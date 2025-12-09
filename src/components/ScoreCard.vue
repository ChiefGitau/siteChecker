<template>
    <div :class="cardClasses" class="rounded-lg p-6 shadow-md">
        <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-gray-600">{{ label }}</h3>
            <div :class="badgeClasses" class="px-2 py-1 rounded-full text-xs font-semibold">
                {{ scoreLabel }}
            </div>
        </div>

        <div class="flex items-baseline"> 
            <span class="text-3xl font-bold" :class="scoreTextClasses"> 
                {{ score }}
                </span>
                <span class="text-lg text-gray-500 ml-1">/ 100</span>
        </div>
        
        <p class="text-sm text-gray-600 mt-2">
            {{ description }}
        </p>
    </div> 
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type {ScoreCategory} from  '@/types/audit'

interface Prop {
    label: string
    score: number
    category: ScoreCategory
}

const props = defineProps<Prop>();

const scoreLevel = computed(() => {
    if (props.score >= 80) return 'good';
    if (props.score >= 50) return 'average';
    return 'poor';
});

const scoreLabel = computed(() => {
    switch (scoreLevel.value) {
        case 'good':
            return 'Good';
        case 'average':
            return 'Average';
        case 'poor':
            return 'Poor';
    }
});

const description = computed( () => {
    switch (scoreLevel.value) {
        case 'good':
            return 'Your site is performing well in this area.';
        case 'average':
            return 'There is room for improvement in this area.';
        case 'poor':
            return 'Significant improvements are needed in this area.';
    }
})

  const cardClasses = computed(() => {
    const base = 'bg-white'
    switch (scoreLevel.value) {
      case 'good': return `${base} border-green-200 bg-green-50`
      case 'average': return `${base} border-amber-200
  bg-amber-50`
      case 'poor': return `${base} border-red-200 bg-red-50`
    }
  })

  const scoreTextClasses = computed(() => {
    switch (scoreLevel.value) {
      case 'good': return 'text-green-700'
      case 'average': return 'text-amber-700'
      case 'poor': return 'text-red-700'
    }
  })

  const badgeClasses = computed(() => {
    switch (scoreLevel.value) {
      case 'good': return 'bg-green-100 text-green-800'
      case 'average': return 'bg-amber-100 text-amber-800'
      case 'poor': return 'bg-red-100 text-red-800'
    }
  })
  </script>