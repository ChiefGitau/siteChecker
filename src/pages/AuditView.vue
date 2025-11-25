  <template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <!-- Header Section -->
           <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ audit.url}}</h1>
            <p class="text-sm text-gray-600 mt-1">
              Analyzed on {{ formatDate(audit.createdAt) }}
            </p>
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold text-gray-900">{{audit.scores.overall }}/100</div>
            <div class="text-sm text-gray-600">Overall Score</div>
          </div>
        </div>
      </div>

      <!-- Score Summary Grid -->
    <div class="mb-8">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Quality Scores</h2>
            <ScoreSummaryGrid :scores="audit.scores" />
          </div>

      <!-- Issues Summary -->
       <div class="mb-8">
        <IssuesTable :issues="audit.issues" />
      </div>
    </div>
  </template>

    <script setup lang="ts">
  import ScoreSummaryGrid from '@/components/ScoreSummaryGrid.vue'
  import IssuesTable from '@/components/IssuesTable.vue'
  import { mockAudit } from '@/mock/audit_example'

  // For now, using mock data
  const audit = mockAudit

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  </script>