import { httpWithoutCredentials } from "./axios";

export interface IReview {
  reviewerName: string;
  rating: number;
  description: string;
}
interface Product {
  id: string;
  title: string;
  description: string;
  methods: string;
  ingredients: string;
  sizeWithPrice: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

interface ISearchProduct {
  id: string;
  title: string;
}
interface ProductsByCategoryResponse {
  categoryName: string;
  products: Product[];
}

interface OrderData {
  Name: string;
  phoneNumber: number;
  place: string;
}
export interface IProductType {
  id: string;
  title: string;
  imageUrl: string;
  sizeWithPrice?: { size: string; price: number }[];
  methods: string;
  ingredients: string;
  howToStore: string;
  description: string;
  category: string;
}
  
  

const fetchCategories = async (): Promise<any[]> => {
  try {
    const response = await httpWithoutCredentials.get<any[]>(
      "/category/getcategories"
    );

    const categories = response.data.map((category) => ({
      ...category,
      // If imageURL is missing, provide a fallback
      imageURL: category.imageURL || "/default-category.jpg",
    }));

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // return an empty list on failure
  }
};
export const getReviews = async (): Promise<IReview[]> => {
  try {
    const response = await httpWithoutCredentials.get<{ reviews: IReview[] }>(
      "/reviews/getReviews"
    );
    console.log("responsedata", response.data);
    return response.data.reviews; // Return the reviews property
  } catch (error: any) {
    // Handle error
    throw error.response?.data?.message || "Failed to fetch reviews.";
  }
};

export const fetchProducts = async (): Promise<IProductType[]> => {
    try {
      const response = await httpWithoutCredentials.get<any>(
        "product/getAllProducts"
      );
      console.log("response", response);

      return response.data.products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
    };

const fetchProductDetailById = async (productId: string) => {
  try {
    const response = await httpWithoutCredentials.get<IProductType>(
      `/product/fetchProductByID/${productId}`
    );

    const product = response.data;

    return {
      ...product,
      imageUrl: product.imageUrl, 
    };
  } catch (error) {
    throw error;
  }
};
export const getProductsByCategory = async (
  categoryId: string
): Promise<ProductsByCategoryResponse> => {
  try {
    const response = await httpWithoutCredentials.get<any>(
      `/product/getProductsByCategory/${categoryId}`
    );

    return {
      categoryName: response.data.category.categoryName,
      products: response.data.products.map((product: any) => ({
        ...product,
        imageUrl: product.imageUrl, // ✅ Use direct Cloudinary URL
      })),
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};


export const getSearchProducts = async (
  searchTerm: string
): Promise<ISearchProduct[]> => {
  try {
    const response = await httpWithoutCredentials.get<any[]>(
      "/product/searchProduct",
      {
        params: { searchTerm }, // Send searchTerm as query parameter
      }
    );
    return response.data; // Assuming products are returned as an array
  } catch (error: any) {
    // Handle error
    throw error.response?.data?.message || "Failed to fetch products.";
  }
};

const createOrder = async (data: OrderData): Promise<any> => {
  try {
    const response = await httpWithoutCredentials.post(
      "/order/createOrder",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export { fetchCategories, fetchProductDetailById, createOrder };
  