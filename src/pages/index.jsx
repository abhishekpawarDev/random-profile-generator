import { useEffect, useState } from "react";
import { randomData } from "../API";

const RandomProfileGeneratorPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const userData = {
    profileImage: "https://via.placeholder.com/150",
    name: "John Doe",
    id: "N/A",
    email: "example@example.com",
    phone: "000-000-0000",
    address: "123 Default St, Default City, Default Country",
    dob: "2000-01-01",
    age: "Unknown",
  };

  useEffect(() => {
    randomData()
      .then((response) => {
        setData(response.results[0]);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load data. Please try again later.</p>;
  }

  return (
    <>
    <div>
      <h1 style={{textAlign:'center', padding:'10px'}}>Random Profile Generator</h1>
    </div>
    <div style={styles.cardContainer}>
      <img
        src={data.picture?.large || userData.profileImage}
        alt="Profile"
        style={styles.profileImage}
      />
      <div style={styles.infoContainer}>
        <h2 style={styles.name}>{data.name?.first || userData.name}</h2>
        <p style={styles.detail}>
          <strong>ID:</strong> {data.login?.uuid || userData.id}
        </p>
        <p style={styles.detail}>
          <strong>Email:</strong> {data.email || userData.email}
        </p>
        <p style={styles.detail}>
          <strong>Phone:</strong> {data.phone || userData.phone}
        </p>
        <p style={styles.detail}>
          <strong>Address:</strong>{" "}
          {`${data.location?.street?.number || ""} ${
            data.location?.street?.name || ""
          }, ${data.location?.city || ""}, ${data.location?.country || ""}` ||
            userData.address}
        </p>
        <p style={styles.detail}>
          <strong>Date of Birth:</strong>{" "}
          {data.dob?.date?.split("T")[0] || userData.dob}
        </p>
        <p style={styles.detail}>
          <strong>Age:</strong> {data.dob?.age || userData.age}
        </p>
        <p style={styles.detail}>
          <strong>Gender:</strong> {data.gender || userData.age}
        </p>
      </div>
    </div>
    </>
  );
};

const styles = {
  cardContainer: {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginBottom: "20px",
  },
  infoContainer: {
    textAlign: "left",
  },
  name: {
    marginBottom: "10px",
  },
  detail: {
    marginBottom: "8px",
    fontSize: "16px",
    lineHeight: "1.5",
  },
};

export default RandomProfileGeneratorPage;
