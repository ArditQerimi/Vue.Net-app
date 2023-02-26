<script>
import axios from "axios";
import TableComponent from "@/components/TableComponent.vue";
import ProductsTableRow from "@/views/ProductsView/ProductsTableRow.vue";

export default {
  components: { ProductsTableRow, TableComponent },
  data() {
    return {
      ProductsTableRow,
      products: [],
      categories: [],
      sizes: [],
      colors: [],
      form: {
        id: null,
        name: "",
        price: null,
        categoryId: 0,
        sizeId: 0,
        colorIds: [],
      },
      submitting: false,
      submitError: null,
      submitSuccess: false,
      selectedSizeType: "",
      selectedCategory: "",
      selectedColors: [],
      inline: null,
    };
  },

  methods: {
    async submitForm() {
      try {
        const foundedCategory = this.categories.find(
          (category) => category.name === this.selectedCategory
        );
        const foundedSize = this.sizes.find(
          (size) => size.sizeType === this.selectedSizeType.toLowerCase()
        );

        const foundedColors = this.colors.filter((color) =>
          this.selectedColors.includes(color.name)
        );

        const foundedColorsIds = foundedColors.map((color) => color.id);
        const newForm = {
          ...this.form,
          categoryId: foundedCategory.id,
          sizeId: foundedSize.id,
          colorIds: foundedColorsIds,
        };
        let response;
        if (this.form.id !== null) {
          response = await axios.put(
            `http://localhost:5000/api/Products/UpdateProduct`,
            newForm
          );
        } else {
          response = await axios.post(
            "http://localhost:5000/api/Products/CreateOneProduct",
            newForm
          );
        }

        const updatedProduct = response.data;
        const productIndex = this.products.findIndex(
          (p) => p.id === updatedProduct.id
        );

        if (productIndex !== -1) {
          this.products[productIndex] = updatedProduct;
          this.clearForm();
        } else {
          this.products.unshift(updatedProduct);
          this.clearForm();
        }
      } catch (error) {
        console.error(error);
      }
    },

    editItem(id) {
      const product = this.products?.find((p) => p.id === id);
      const { name, price, colors, size, category } = product ?? {};
      const colorIds = colors?.map((color) => color?.id) ?? [];
      const colorNames = colors?.map((color) => color?.name) ?? [];

      this.form.id = product?.id;
      this.form.name = name;
      this.form.price = price;
      this.form.colorIds = colorIds;
      this.form.sizeId = size.id;
      this.form.categoryId = category.id;

      this.selectedSizeType = size?.name;
      this.selectedColors = colorNames;
      this.selectedCategory = category?.name;
    },
    async deleteItem(productId) {
      try {
        const deletedItem = await axios.delete(
          "http://localhost:5000/api/Products/DeleteOneProduct",
          { data: { id: productId } }
        );
        this.products = this.products.filter(
          (p) => p.id !== deletedItem.data.id
        );
      } catch (error) {}
    },
    clearForm() {
      this.form = {
        id: null,
        name: "",
        price: null,
        categoryId: 0,
        sizeId: 0,
        colorIds: [],
      };
      this.selectedSizeType = "";
      this.selectedCategory = "";
      this.selectedColors = [];
    },
  },
  computed: {
    sizesName() {
      return this.sizes.map((size) => size.name);
    },
    colorsName() {
      return this.colors.map((color) => color.name);
    },
    categoriesName() {
      return this.categories.map((category) => category.name);
    },
    // getProducts() {
    //   return this.products;
    // },
    getSizes() {
      return this.sizes;
    },
    products(value) {},
  },
  watch: {
    selectedSizeType(size) {},
    selectedCategory(category) {
      console.log(category);
    },
    products(value) {},
    selectedColor(color) {
      console.log(color);
    },
  },
  async mounted() {
    try {
      const products = await axios.get(
        "http://localhost:5000/api/Products/getAll"
      );
      this.products = products.data.reverse();
      const sizes = await axios.get("http://localhost:5000/api/Size/AllSizes");
      this.sizes = sizes.data;
      const colors = await axios.get(
        "http://localhost:5000/api/Color/AllColors"
      );
      this.colors = colors.data;

      const categories = await axios.get(
        "http://localhost:5000/api/Categories/AllCategories"
      );
      this.categories = categories.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <div>
        <v-text-field
          label="Name:"
          v-model="form.name"
          type="text"
          variant="solo"
          density="comfortable"
          direction="horizontal"
        ></v-text-field>
      </div>
      <div>
        <v-text-field
          label="Price:"
          v-model="form.price"
          type="number"
          step="0.01"
          variant="solo"
          density="comfortable"
        ></v-text-field>
      </div>

      <div>
        <v-select
          label="Category:"
          :items="this.categoriesName"
          variant="solo"
          v-model="selectedCategory"
          density="comfortable"
        ></v-select>
      </div>
      <div>
        <v-select
          label="Size:"
          :items="this.sizesName"
          variant="solo"
          v-model="selectedSizeType"
          density="comfortable"
        ></v-select>
      </div>

      <div>
        <v-autocomplete
          label="Colors:"
          :items="this.colorsName"
          multiple
          variant="solo"
          v-model="selectedColors"
          density="comfortable"
        ></v-autocomplete>
      </div>

      <div style="display: flex; justify-content: flex-end">
        <button class="submit-btn" type="submit">Submit</button>
      </div>
    </form>
  </div>

  <v-container fluid class="spacing-playground pa-6 justify-center">
    <TableComponent
      :delete-item="deleteItem"
      :edit-item="editItem"
      :headers="['Category', 'Product', 'Price', 'Colors', 'Size', 'Actions']"
      :on-submit="submitForm"
      :tableRows="ProductsTableRow"
      :items="this.products"
    ></TableComponent>
  </v-container>
</template>

<style scoped>
.v-input__details {
  padding-inline-start: 6px;
  padding-inline-end: 6px;
}
#styled-input {
  height: 40px;
  font-size: 20pt;
}
.styled-input label[for] {
  height: 40px;
  font-size: 20pt;
}
.select .v-select__slot {
  height: 40px;
}
.table-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  overflow: hidden;
}
table {
  border-collapse: collapse;
  width: 80%;
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
  /*width: 40%;*/
  margin: 20px auto;
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
