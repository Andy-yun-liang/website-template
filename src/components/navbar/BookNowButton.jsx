import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

export default function BookNowButton({ className = "", href = "/book" }) {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center justify-center overflow-hidden md:px-6 h-[52px] px-6 rounded-2xl w-full border-2 border-transparent text-white bg-tangerine transition-all duration-700 hover:bg-white hover:border-tangerine gap-3 text-base md:text-sm font-semibold tracking-wider min-w-[150px] ${className}`}
    >
      <span className="absolute inset-0 w-0 bg-white transition-all duration-700 ease-out group-hover:w-full z-0" />
      <FontAwesomeIcon
        icon={faCalendar}
        className="relative z-10 group-hover:text-tangerine transition-colors duration-700"
        aria-hidden="true"
      />
      <span className="relative z-10 group-hover:text-tangerine transition-colors duration-700">
        BOOK NOW
      </span>
    </a>
  );
}
