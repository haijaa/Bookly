import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  return (
    <footer>
      <p
        className="text-center m-0 pt-5"
        style={{
          fontSize: 12,
          backgroundColor: "#F2E9DC",
        }}
      >
        Skolprojekt av JSU23 It-Högskolan. Information och bilder hämtade från
        akademibokhandeln.se.
      </p>
    </footer>
  );
}
