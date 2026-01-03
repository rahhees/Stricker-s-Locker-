

import api from "../Api/AxiosInstance";


export const orderService = {

    getMyOrders: async () => {
    const response = await api.get("/orders/my-orders");

    return response.data;
  },

  //place order 

  placeOrder: async (orderData) => {
    const response = await api.get("/orders",orderData);
    return response.data;
  },

  getOrderById :async (id) =>{
    const response = await api.post(`/orders/${id}`);
    return response.data;
  },

  cancelOrder :async (orderId)=>{
    const response = await api.put(`/orders/cancel/${orderId}`);
    return response.data;


}
}