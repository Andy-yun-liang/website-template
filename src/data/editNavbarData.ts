// Centralized data for site info, colors, and text

export type FlashMessage = {
  text: string;
  href?: string;
};

export type TopInfoBar = {
  flashMessages: FlashMessage[];
  barColor: string;
  textColor: string;
};

export type SiteColors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
};

export type NavbarLink = {
  label: string;
  href: string;
};

export type NavbarInfo = {
  title: string;
  links: NavbarLink[];
};

export type NavigationBar = {
  topbar: TopInfoBar;
  colors: SiteColors;
  navbar: NavbarInfo;
};

export const navbarData: NavigationBar = {
  topbar: {
    flashMessages: [
      {
        text: "Book your appointments now!",
        href: "/spa-booking"
      },
      {
        text: "Now offering group discounts – inquire today!"
      },
      {
        text: "Gift cards available for all occasions",
        href: "/gift-cards"
      }
    ]
    ,
    barColor : "#A5D0E0",
    textColor : "#000000"
  },
  colors: {
    primary: "#94bfbe",
    secondary: "#94bfbe",
    accent: "#94bfbe",
    background: "#F3F4F6",
    text: "#94bfbe",
  },
  navbar: {
    title: "VELYBEAUTY",
    links: [
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
    ],
  }
}; 