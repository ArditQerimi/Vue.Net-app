<script lang="ts">
export default {
  name: "TableRowComponent",
  props: {
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
    message: {
      type: String,
      required: false,
    },
  },
  watch: {
    message(value) {
      console.log(value);
    },
  },
  mounted() {
    // console.log(this.message);
    // console.log(this.headers);
    // console.log(this.items);
  },
};
</script>

<template>
  <tr v-for="item in items" :key="item.name">
    <td>{{ item.category.name }}</td>
    <td>{{ item.name }}</td>
    <td>{{ item.price }}$</td>
    <td>
      <div style="display: flex">
        <div v-for="color in item.colors" :style="{ marginRight: '4px' }">
          <v-chip>{{ color.name }}</v-chip>
        </div>
      </div>
    </td>
    <td>
      {{ item.size.name }}
    </td>
    <td>
      <div class="d-flex justify-content-start gap-2">
        <v-btn @click="editItem(item, item.id)">
          <v-icon icon="mdi-pencil" color="#4CAF50" />
        </v-btn>
        <v-btn @click="deleteItem(item, item.id)">
          <v-icon icon="mdi-delete" color="#F44336" />
        </v-btn>
      </div>
    </td>
  </tr>
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
