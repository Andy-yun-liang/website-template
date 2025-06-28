import { useState } from "react";
import handshake from "../../assets/handshake.jpg";

const Subscribe = ({ backgroundImage }) => {
  const [email, setEmail] = useState("");
  const bg = backgroundImage || handshake.src;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    console.log("Submitted email:", email);
    setEmail("");
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat text-white py-20 px-6 md:px-12 transition-all duration-300"
      style={{ backgroundImage: `url('${bg}')` }}
      aria-label="Subscribe section"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" aria-hidden="true"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center animate-fade-in space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
          Join Our Community
        </h2>
        <p className="text-lg md:text-xl text-white/90">
          Get 20% off your first purchase and receive exclusive offers.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center"
        >
          <label htmlFor="email" className="sr-only">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full sm:w-2/3 px-4 py-3 bg-white text-gray-700 placeholder-gray-500 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-tiffanyblue transition-all"
            required
          />

          {/* Slide transition button */}
          <button
            type="submit"
            className="group relative overflow-hidden cursor-pointer px-6 py-3 rounded-lg border-2 border-transparent text-white bg-tiffanyblue transition-all duration-700 flex items-center justify-center font-medium tracking-wide w-full sm:w-auto"
          >
            {/* Sliding background span */}
            <span className="absolute inset-0 left-0 w-0 bg-white transition-all duration-700 ease-out group-hover:w-full z-0"></span>

            {/* Button text foreground */}
            <span className="relative z-10 group-hover:text-tiffanyblue transition-colors duration-700">
              Sign Up
            </span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Subscribe;
