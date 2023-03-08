<script>
import axios from "axios";
import TableComponent from "@/components/TableComponent.vue";
import ProductsTableRow from "@/views/ProductsView/ProductsTableRow.vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  components: { ProductsTableRow, TableComponent },
  data() {
    return {
      ProductsTableRow,
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
  created() {
    this.$store.dispatch("products/fetchProducts");
    this.$store.dispatch("products/fetchCategories");
    this.$store.dispatch("products/fetchColors");
    this.$store.dispatch("products/fetchSizes");
  },
  methods: {
    async saveProduct(actionType) {
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
        // userId:+this.user.UserId
      };
      debugger
      this.$store.dispatch(`products/${actionType}`, newForm);
    },

    async saveAdd() {
      await this.saveProduct("addProduct");
    },
    async saveEdit() {
      await this.saveProduct("editProduct");
    },

    editProduct(item) {
      const { name, price, colors, size, category } = item ?? {};
      const colorIds = colors?.map((color) => color?.id) ?? [];
      const colorNames = colors?.map((color) => color?.name) ?? [];
      this.form.id = item?.id;
      this.form.name = name;
      this.form.price = price;
      this.form.colorIds = colorIds;
      this.form.sizeId = size.id;
      this.form.categoryId = category.id;
      debugger;
      this.selectedSizeType = size?.name;
      this.selectedColors = colorNames;
      this.selectedCategory = category?.name;
    },
    async deleteProduct(item) {
      this.$store.dispatch("products/deleteProduct", item);
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
    logInput(event) {
      console.log(event.target.value);
    },
    category(event) {
      console.log(event.target.value);
    },
  },

  computed: {
    ...mapState({
      products: (state) => state.products.products,
      categories: (state) => state.products.categories,
      colors: (state) => state.products.colors,
      sizes: (state) => state.products.sizes,
      user: (state) => state.auth.user,
      // loading: (state) => state.loading,
      // error: (state) => state.error,
    }),
    // ...mapGetters("products", {
    //   products: "cartProducts",
    //   price: "cartTotalPrice",
    // }),
    sizesName() {
      return this.sizes.map((size) => size.name);
    },
    colorsName() {
      return this.colors.map((color) => color.name);
    },
    categoriesName() {
      return this.categories.map((category) => category.name);
    },
  },
  watch: {
    selectedSizeType(size) {},
    selectedCategory(category) {
      console.log(category);
    },
    products(value) {},
    user(value) {
      console.log(value)
    },
    selectedColor(color) {
      console.log(color);
    },
  },
  async mounted() {
    try {
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<template>
  <div class="form-container">
    <div>User:{{ this.user &&this.user}}</div>
    <form @submit.prevent="!this.form.id ? saveAdd() : saveEdit()">
      <div>
        <v-text-field
          label="Name:"
          v-model="form.name"
          @change="logInput"
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
          onchange="category"
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
        <button v-if="this.form.id" class="submit-btn" type="submit">
          Save Edit
        </button>
        <button v-if="!this.form.id" class="submit-btn" type="submit">
          Save Product
        </button>
      </div>
    </form>
  </div>

  <v-container fluid class="spacing-playground pa-6 justify-center">
    <TableComponent
      :delete-item="deleteProduct"
      :edit-item="editProduct"
      :headers="['Category', 'Product', 'Price', 'Colors', 'Size', 'Actions']"
      :tableRows="ProductsTableRow"
      :items="products"
    ></TableComponent>
  </v-container>
</template>

<style scoped>
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
  margin: 20px auto;
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #dddddd;
  border-radius: 10px;
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
