import React from "react";

function CustomerReviews() {
  const reviews = [
    {
      rating: 5,
      reviewText: "Excellent service and quality!",
      customerImage:
        "https://th.bing.com/th?id=OIP.LfBtLCx5jWjmzpI_LDs5TwHaL-&w=196&h=317&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2",
      customerName: "John Doe",
      reviewDate: "2024-09-01",
    },
    {
      rating: 4,
      reviewText: "Very good product. Slightly overpriced.",
      customerImage:
        "https://th.bing.com/th?id=OIP.LfBtLCx5jWjmzpI_LDs5TwHaL-&w=196&h=317&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2",
      customerName: "Jane Smith",
      reviewDate: "2024-08-28",
    },
    {
      rating: 3,
      reviewText: "Average experience. Could be improved.",
      customerImage:
        "https://th.bing.com/th?id=OIP.LfBtLCx5jWjmzpI_LDs5TwHaL-&w=196&h=317&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2",
      customerName: "Alice Johnson",
      reviewDate: "2024-08-25",
    },
    {
      rating: 2,
      reviewText: "Not satisfied with the service.",
      customerImage:
        "https://th.bing.com/th?id=OIP.LfBtLCx5jWjmzpI_LDs5TwHaL-&w=196&h=317&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=",
      customerName: "Bob Brown",
      reviewDate: "2024-08-20",
    },
  ];

  return (
    <div style={{ padding: "3rem", backgroundColor: "white" }}>
      <h3
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          fontSize: "1.2rem",
          fontWeight: "600",
          marginTop: "-20px",
        }}
      >
        Customer Reviews
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "nowrap",
          overflowX: "auto",
        }}
      >
        {reviews.map((review, index) => (
          <div
            key={index}
            style={{
              width: "23%",
              background: "#F0F0F0",
              padding: "1rem",
              boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
              marginRight: "1rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                color: "#FFD700",
                marginBottom: "0.5rem",
              }}
            >
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>
            <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
              {review.reviewText}
            </p>
            <div style={{ marginBottom: "0.5rem" }}>
              <img
                src={review.customerImage}
                alt={`${review.customerName}'s avatar`}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "0.5rem",
                }}
              />
            </div>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              {review.customerName}
            </p>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>
              {review.reviewDate}
            </p>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignItems: "center",
        }}
      >
        {/* <p>See personalised recommendation</p>
        <button
          style={{
            padding: "0.3rem 6.5rem",
            borderRadius: "5px",
            marginTop: "0.6rem",
          }}
        >
          Login
        </button> */}
        {/* <p>New Customer?<span style={{color:"blue", lineHeight:"3rem"}}>Start here.</span></p> */}
      </div>
    </div>
  );
}

export default CustomerReviews;
