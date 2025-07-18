<script setup>
const props = defineProps(["pagecount", "currentpage"]);
</script>

<template>
  <div class="list-pagination">
    <button
      type="button"
      class="btn listpage"
      @click="$emit('prevPageEvent')"
      :disabled="currentpage <= 1"
    >
      &#10096;
    </button>
    <ul class="pages-list">
      <li class="pages-list-item" v-for="page in pagecount">
        <button
          type="button"
          :class="`btn listpage ${page === currentpage ? 'active' : ''}`"
          @click="$emit('goPageEvent', $event.currentTarget.textContent)"
        >
          {{ page }}
        </button>
      </li>
    </ul>
    <button
      type="button"
      class="btn listpage"
      @click="$emit('nextPageEvent')"
      :disabled="currentpage >= pagecount"
    >
      &#10097;
    </button>
  </div>
</template>

<style scoped>
.list-pagination {
  display: flex;
  justify-content: center;
  margin-top: 25px;
}

.pages-list {
  list-style-type: none;
  display: flex;
}
</style>
