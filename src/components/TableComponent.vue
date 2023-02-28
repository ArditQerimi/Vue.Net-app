<script lang="ts">
export default {
  name: "TableComponent",
  props: {
    message: {
      type: String,
      required: false,
    },
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },

    editItem: {
      type: Function,
      required: true,
    },
    deleteItem: {
      type: Function,
      required: true,
    },
    tableRows: {
      type: Object,
      required: true,
    },
  },
  watch: {
    message(value) {
      console.log(value);
    },
  },
  mounted() {},
};
</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th v-for="header in headers" class="text-left" :key="header">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <component
        :is="tableRows"
        :items="items"
        :delete-item="deleteItem"
        :edit-item="editItem"
      />
    </tbody>
  </v-table>
</template>
<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #f5f5f5;
}

.radio-group label,
.checkbox-group label {
  margin-right: 20px;
}
</style>
