const API_URL = "https://moviebook-2.onrender.com/api/booking";

const bookingService = {
  bookSeats: async (data) => {
    const response = await fetch(`${API_URL}/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },
};

export default bookingService;
