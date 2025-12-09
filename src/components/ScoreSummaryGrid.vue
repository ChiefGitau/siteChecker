  <template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <ScoreCard
        v-for="(score, category) in categoryScores"
        :key="category"
        :label="formatLabel(category)"
        :score="score"
        :category="category"
      />
    </div>
  </template>

  <script setup lang="ts">
  import { computed } from 'vue'
  import ScoreCard from './ScoreCard.vue'
  import type { Scores, ScoreCategory } from '@/types/audit'

  interface Props {
    scores: Scores
  }

  const props = defineProps<Props>()

  const categoryScores = computed(() => ({
    performance: props.scores.performance,
    seo: props.scores.seo,
    accessibility: props.scores.accessibility,
    novti: props.scores.novti
  }))

  const formatLabel = (category: ScoreCategory): string => {
    switch (category) {
      case 'performance': return 'Performance'
      case 'seo': return 'SEO'
      case 'novti': return 'Novti'
      case 'accessibility': return 'Accessibility'
      case 'security': return 'Security'
    }
  }
  </script>