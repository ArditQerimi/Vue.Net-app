<script>
import axios from "axios";
import TableComponent from "@/components/TableComponent.vue";
import SizesTableRow from "@/views/SizesView/SizesTableRow.vue";
export default {
  components: { TableComponent, SizesTableRow },

  data() {
    return {
      SizesTableRow,
      sizes: [],
      form: {
        id: null,
        name: "",
      },
      categoryName: "",
      submitting: false,
      submitError: null,
      submitSuccess: false,
    };
  },
  methods: {
    async onSubmit() {
      const newForm = {
        ...this.form,
        sizeType: this.form.name.toLowerCase(),
      };

      const foundedIndex = this.sizes.findIndex((c) => c.id === newForm.id);
      let response;

      if (this.form.id !== null) {
        response = await axios.put(
          `http://localhost:5000/api/Size/UpdateSize`,
          newForm
        );
        this.clearForm();

        this.sizes.splice(foundedIndex, 1, response.data);
      } else {
        response = await axios.post(
          "http://localhost:5000/api/Size/CreateSize",
          newForm
        );

        this.sizes.unshift(response.data);
        this.clearForm();
      }
    },
    editItem(id) {
      const size = this.sizes?.find((size) => size.id === id);
      const { name } = size ?? {};
      this.form.id = size.id;
      this.form.name = name;
      debugger;
    },
    clearForm() {
      this.form = {
        id: null,
        name: "",
      };
    },
    async deleteItem(id) {
      try {
        const foundedIndex = this.sizes.findIndex((c) => c.id === this.form.id);
        const deletedItem = await axios.delete(
          "http://localhost:5000/api/Size/DeleteSize",
          { data: { id: id } }
        );
        this.sizes = this.sizes.filter((c) => c.id !== deletedItem.data.id);
      } catch (error) {}
    },
  },

  async mounted() {
    try {
      const sizes = await axios.get("http://localhost:5000/api/Size/AllSizes");
      this.sizes = sizes.data.reverse();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<template>
  <v-container fluid class="spacing-playground pa-6 justify-center">
    <div style="width: 100%; display: flex; justify-content: center">
      <v-col class="align-self-center" style="max-width: 50%">
        <label>Add Size:</label>
        <v-text-field
          label="Label"
          variant="solo"
          v-model="form.name"
          class="flex-grow-1"
        ></v-text-field>
        <div style="display: flex; justify-content: flex-end">
          <v-btn @click="onSubmit">Submit</v-btn>
        </div>
      </v-col>
    </div>

    <TableComponent
      :delete-item="deleteItem"
      :edit-item="editItem"
      :headers="['Size', 'Actions']"
      :on-submit="onSubmit"
      :tableRows="SizesTableRow"
      :items="this.sizes"
    ></TableComponent>
  </v-container>
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

.form-container {
  max-width: 500px;
  margin: 0 auto;
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #dddddd;
  border-radius: 10px;
}

.form-group {
  margin-bottom: 20px;
  width: 100%;
}

.form-label {
  width: 100%;
}

.form-label-container {
  width: 50px;
}

.text-input {
  padding: 15px 10px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #dddddd;
  width: 100%;
}

.number-input {
  padding: 15px 10px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #dddddd;
  width: 100%;
}
.radio-group {
  display: flex;
}

.radio-group,
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.radio-group label,
.checkbox-group label {
  margin-right: 20px;
}

.submit-btn {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #444;
}
</style>
