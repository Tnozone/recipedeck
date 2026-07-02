<template>
  <div v-if="state.show" class="confirm-overlay">
    <div class="confirm-box shadow">
      <p class="mb-3">{{ state.message }}</p>

      <div class="d-flex justify-content-end gap-2 m-3">
        <button class="btn btn-secondary" @click="cancel">
          Cancel
        </button>

        <button class="btn btn-danger" @click="confirm">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { confirmState, resolveConfirm } from '../stores/confirm'

const state = confirmState

function confirm() {
  resolveConfirm(true)
}

function cancel() {
  resolveConfirm(false)
}
</script>

<style scoped>
.confirm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;
}

.confirm-box {
  background: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  width: min(92vw, 420px);
  max-width: 420px;
  box-sizing: border-box;
}
</style>