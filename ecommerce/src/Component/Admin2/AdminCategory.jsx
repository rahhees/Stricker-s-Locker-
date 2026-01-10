import React, { useState, useEffect, useCallback } from "react";
import { adminService } from "../../Services/AdminService";
import { productService } from "../../Services/ProductService"; 
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { 
  FolderPlus, Edit, Trash2, Search, 
  FolderTree, Loader2, RefreshCw, X, Package, ArrowRight
} from "lucide-react";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // States for Category Items display
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const BASE_URL = "https://localhost:5174"; // Match your backend URL

  // Helper to format Image URL correctly
  const getFullImageUrl = (path) => {
    if (!path) return "/placeholder-image.png";
    if (path.startsWith("http")) return path;
    // Ensure no double slashes
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${BASE_URL}${cleanPath}`;
  };

  // 1. Load Categories
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllCategories();
      // Handle the nested data structure from typical C# API responses
      const data = response.data?.data || response.data || response.result || response;
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // 2. Fetch Products for a specific Category using the provided ID-based logic
  const handleCategoryClick = async (category) => {
    // Toggle off if clicking the same category
    if (selectedCategory?.id === category.id) {
      setSelectedCategory(null);
      setCategoryProducts([]);
      return;
    }

    setSelectedCategory(category);
    setLoadingProducts(true);
    
    try {
    
      const responseData = await productService.getProductByCategoryId(category.id);
      
      console.log("Raw API Response:", responseData);

    
      const extractedList = responseData?.data && Array.isArray(responseData.data) 
    ? responseData.data 
    : (Array.isArray(responseData) ? responseData : []);
      
      console.log("Extracted List:", extractedList);

      // Set the list (ensure it's an array)
      setCategoryProducts(Array.isArray(extractedList) ? extractedList : []);
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      console.error("Error fetching products:", err);
      setCategoryProducts([]);
      toast.error(`Error: ${errorMsg}`);
    } finally {
      setLoadingProducts(false);
    }
  };

  // 3. Create Category
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    try {
      setIsAdding(true);
      await adminService.createCategory({ name: newCategoryName });
      toast.success("Category created successfully");
      setNewCategoryName("");
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Creation failed");
    } finally {
      setIsAdding(false);
    }
  };

  // 4. Update Category
  const handleEdit = async (category) => {
    const { value: updatedName } = await Swal.fire({
      title: "Rename Category",
      input: "text",
      inputLabel: "New name for " + category.name,
      inputValue: category.name,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return "You need to write something!";
      }
    });

    if (updatedName && updatedName !== category.name) {
      try {
        await adminService.updateCategory(category.id, { name: updatedName });
        toast.success("Category updated");
        if(selectedCategory?.id === category.id) setSelectedCategory({...category, name: updatedName});
        fetchCategories();
      } catch (err) {
        toast.error("Update failed");
      }
    }
  };

  // 5. Delete Category
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This might affect products linked to this category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await adminService.deleteCategory(id);
        toast.success("Category removed");
        if(selectedCategory?.id === id) setSelectedCategory(null);
        fetchCategories();
      } catch (err) {
        toast.error("Delete failed. Category might be in use.");
      }
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20">
      <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
      <p className="text-gray-500 font-medium">Loading Categories...</p>
    </div>
  );

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center space-x-2">
          <FolderTree className="text-blue-600" size={28} />
          <h2 className="text-2xl font-bold text-gray-800">Category & Inventory</h2>
        </div>
        <button onClick={fetchCategories} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Add Form & Table */}
        <div className={`${selectedCategory ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-6 transition-all duration-300`}>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Add Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center text-sm uppercase tracking-wider">
                <FolderPlus size={18} className="mr-2 text-blue-500" /> Add New
              </h3>
              <form onSubmit={handleCreate} className="space-y-4">
                <input
                  type="text" placeholder="e.g. LaLiga"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  required
                />
                <button type="submit" disabled={isAdding} className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 disabled:bg-blue-300 transition-all shadow-md">
                  {isAdding ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Create"}
                </button>
              </form>
            </div>

            {/* Table & Search */}
            <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center relative">
                <Search className="absolute left-7 text-gray-400" size={18} />
                <input
                  type="text" placeholder="Search categories..."
                  className="w-full pl-12 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-0 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase sticky top-0">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Category Name</th>
                      <th className="px-6 py-3 font-semibold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredCategories.map((cat) => (
                      <tr 
                        key={cat.id} 
                        className={`group transition-all cursor-pointer ${selectedCategory?.id === cat.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                        onClick={() => handleCategoryClick(cat)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-between">
                            <span className={`font-medium ${selectedCategory?.id === cat.id ? 'text-blue-700' : 'text-gray-800'}`}>
                              {cat.name}
                            </span>
                            <ArrowRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${selectedCategory?.id === cat.id ? 'text-blue-500' : 'text-gray-300'}`} />
                          </div>
                        </td>
                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-center space-x-2">
                            <button onClick={() => handleEdit(cat)} className="p-1 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-all"><Edit size={16} /></button>
                            <button onClick={() => handleDelete(cat.id)} className="p-1 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-all"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Products Preview */}
        {selectedCategory && (
          <div className="lg:col-span-5 space-y-4 animate-in slide-in-from-right duration-300">
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden flex flex-col h-full max-h-[700px]">
              <div className="p-4 bg-blue-600 text-white flex justify-between items-center shadow-md">
                <div>
                  <h3 className="font-bold text-lg">{selectedCategory.name}</h3>
                  <p className="text-blue-100 text-xs">{categoryProducts.length} items found</p>
                </div>
                <button onClick={() => { setSelectedCategory(null); setCategoryProducts([]); }} className="p-1 hover:bg-blue-500 rounded-full transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
                {loadingProducts ? (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <Loader2 className="animate-spin mb-2 text-blue-500" size={30} />
                    <p>Fetching inventory...</p>
                  </div>
                ) : categoryProducts.length > 0 ? (
                  categoryProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-xl hover:shadow-md transition-all bg-white group">
                      <div className="w-16 h-16 rounded-lg bg-gray-50 flex-shrink-0 overflow-hidden border border-gray-100 shadow-sm">
                        <img 
                          src={getFullImageUrl(product.image || product.imageUrl)} 
                          alt={product.name} 
                          className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => e.target.src = "/placeholder-image.png"}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-800 truncate text-sm">{product.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-blue-600 font-bold text-sm">₹{product.price.toLocaleString()}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <Package size={40} className="mb-2 opacity-20" />
                    <p>No products in this category yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ManageCategories;