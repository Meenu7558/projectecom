import React, { useState } from "react";


const ManageProduct = () => {
  const [view, setView] = useState("add"); // default view

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <button onClick={() => setView("add")} className="btn btn-primary">Add Product</button>
        <button onClick={() => setView("delete")} className="btn btn-error">Delete Product</button>
        <button onClick={() => setView("edit")} className="btn btn-warning">Edit Product</button>
      </div>

      {view === "add" && <AddProduct />}
      {view === "delete" && <DeleteProduct />}
      {view === "edit" && <EditProduct />}
    </div>
  );
};

export default ManageProduct;
