import {create} from "zustand"

export const useProductStore = create((set) => ({
    products: [],

    setProducts: products => set({products}),

    createProduct:   async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image) {
            return {success: false, message: "Please input all the fields."}
        }

        try {
            const resp = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct)
            })

            const data = await resp.json();

            set(state => ({products: [...state.products, data.data]}))
            return {success: true, message: "Product created successfully."}

        } catch (error) {
            console.error(`error: ${error?.message}`)
            return {success: false, message: error.message || "Server error"}
        }
        
    },

    getProducts: async() => {
        try {
            const resp = await fetch("/api/products")
            const data = await resp.json();
            set({products: data.data})
            return{success: true, message: "Products fetched successfully"}
        } catch (error) {
            console.error(`error: ${error?.message}`)
            return {success: false, message: error.message}
        }
        

    },

    deleteProduct: async(pId) => {
        try {
            const resp = await fetch("/api/products/" + pId, {
                method: "DELETE"
            })
            const data = await resp.json(); 
            if(!data.success) {
                return {success: false, message: data.message}
            } else {
                set(state => ({products: state.products.filter(product => product._id !== pId)}))
                return {success: data.success, message: data.message}
            }
            
        } catch (error) {
            return {success: false, message: error.message}
        }

    },

    updateProduct: async(pId, updatedProduct) => {

        try {
            const resp = await fetch("/api/products/" + pId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedProduct)
            })

            const data = await resp.json();

            if(!data.success) return {success: data.success, message: data.message}

            set(state => ({products: state.products.map(product => product._id === pId ? data.data : product )}))

            return {success: true, message: "Product updated successfully"}

        } catch (error) {
            console.log(`error: ${error?.message}`)
            return { success: false, message: error.message };
        }
    }
}))
