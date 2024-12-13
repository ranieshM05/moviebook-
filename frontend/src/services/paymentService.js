const API_URL = "https://moviebook-2.onrender.com/api/payment";

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
