const API_URL = "http://localhost:3001/api/payment";

const paymentService = {
  createPayment: async (data) => {
    const response = await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },
};

export default paymentService;
