export type AboutSubSection = {
    title: string;
    content: string | string[];  
    isList?: boolean;            
  };
  
  export type AboutSection = {
    title: string;
    content?: string | string[];   
    isList?: boolean;              
    subsections?: AboutSubSection[]; 
  };


  export const aboutData: AboutSection[] = [
    {
      title: "What We Stand For",
      content: `We believe that great organizations are built on trust, purpose, and service.
      Whether we’re helping clients solve problems, supporting our team, or growing our business,
      we lead with integrity and always aim to make a lasting impact. Our work is rooted in empathy,
      accountability, and a deep commitment to excellence.`,
    },
    {
      title: "How We Work",
      content: [
        `True success is shaped by the small, consistent actions we take every day.
        We believe that mastery of the fundamentals — clear communication, thoughtful execution,
        and a strong work ethic — is what sets exceptional teams apart.`,
      ],
      isList: false,
      subsections: undefined,
    },
    {
      title: "How We Work (List)",
      content: [
        "Personal growth",
        "Professional excellence",
        "Collaborative success",
      ],
      isList: true,
    },
    {
      title: "Mission Statement",
      subsections: [
        {
          title: "Our Clients",
          content: `We exist to create real value — offering practical, forward-thinking solutions that help our clients reach their goals.`,
        },
        {
          title: "Our Team",
          content: `We support our people through mentorship, meaningful work, and fair compensation — because when they succeed, so does everything else.`,
        },
        {
          title: "Our Future",
          content: `We’re building something sustainable — evolving with intention, guided by leadership, strategy, and vision.`,
        },
      ],
    },
  ];

  

  
