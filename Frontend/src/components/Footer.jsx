import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

export default function Footer() {
  return (
    <footer>
      <p
        className="text-center m-0 pb-3 pt-5 white-text"
        style={{
          fontSize: 12,
          backgroundColor: "#606D5D",
        }}
      >
        Skolprojekt av JSU23 It-Högskolan. Information och bilder hämtade från
        akademibokhandeln.se.
      </p>
    </footer>
  );
}
