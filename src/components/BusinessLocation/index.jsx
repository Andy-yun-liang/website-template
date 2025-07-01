import { useEffect, useRef, useState } from "react";

const GOOGLE_MAPS_API_KEY = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY;

const INITIAL_COORDS = { lat: 49.2699213, lng: -123.0444667 };
const BUSINESS_NAME = "Vely Beauty";

function BusinessLocationMap() {
  const mapRef = useRef(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;

        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Google Maps failed to load"));

        document.head.appendChild(script);
      });
    };

    loadGoogleMapsScript()
      .then(() => {
        if (!mapRef.current) return;

        const map = new google.maps.Map(mapRef.current, {
          center: INITIAL_COORDS,
          zoom: 16,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "greedy",
        });

        const marker = new google.maps.Marker({
          position: INITIAL_COORDS,
          map,
          title: BUSINESS_NAME,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scaledSize: new google.maps.Size(40, 40),
          },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="font-family: Inter, sans-serif; padding: 2px 4px; max-width: 260px;">
              <strong style="font-size: 15px;">${BUSINESS_NAME}</strong>
            </div>
          `,
        });

        infoWindow.open(map, marker);

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: INITIAL_COORDS }, (results, status) => {
          if (status === "OK" && results[0]) {
            setAddress(results[0].formatted_address);
          } else {
            setAddress("Unable to retrieve address");
          }
        });
      })
      .catch((err) => {
        console.error("Map error:", err);
        setAddress("Map failed to load.");
      });
  }, []);

  return (
    <section
      style={{
        padding: "2rem",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 20px 16px rgba(0, 0, 0, 0.05)",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          marginBottom: "1rem",
          fontWeight: "600",
          color: "#333",
        }}
      >
        📍 Business Location
      </h2>

      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "500px",
          borderRadius: "16px",
          border: "3px solid #e0e0e0",
          overflow: "hidden",
        }}
      />

      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          background: "#f8f8f8",
          borderRadius: "8px",
          fontSize: "0.95rem",
          color: "#444",
          lineHeight: "1.5",
          userSelect: "text",
        }}
      >
        <strong style={{ display: "block", marginBottom: "0.25rem" }}>Address:</strong>
        {address || "Loading..."}
      </div>
    </section>
  );
}

export default BusinessLocationMap;
