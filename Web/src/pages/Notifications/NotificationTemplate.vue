<template>
  <span>error</span>
</template>

<script>
export default {
  name: "notification-template",
  props: {
    error: {
      type: String,
      default: "Ocurrio un error inesperado",
    },
  },
};
</script>