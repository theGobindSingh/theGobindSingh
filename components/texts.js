//  DO NOT REMOVE / DELETE ANY VARIABLE !!!

// NOTE:
// declare a variable null then it won't show up
// example:
// export const my_whatsapp = null;
// AGAIN, DO NOT REMOVE / DELETE ANY VARIABLE !!!
// Some vlues cannot be null, lookout carefully for those

// OVERALL INFORMATION
export const my_name = "Gobind Singh"; //cannot be null
export const my_resume_file = "resume.pdf"; // can be null
// if you wanna show your resume put that file in public folder and change my_resume_file value to its name

//SOCIALS
export const my_email = "thesinghgobind@gmail.com"; // can be null
export const my_whatsapp = "+919415507316"; // can be null
export const my_github = "theGobindSingh"; // can be null
export const my_instagram = "theGobindSingh"; // can be null
export const my_linkedin = "theGobindSingh"; // can be null

//HOME PAGE
export const home_hello = "Hi, my name is"; //cannot be null
export const home_sub_heading = "I build things for the web."; //can be null
export const home_desc = "I'm a software engineer specializing in building exceptional digital experiences."; // can be null
export const home_links = [
  {
    text: "exceptional digital experiences",
    link: "https://youtu.be/dQw4w9WgXcQ?t=43"
  }
]; // can be null
//format: an array of objects [{}, {},...], each object will have 2 properties text and link -> {text:"", link: ""}
//    text property will tell what text you want to be selected (every occurance will be selected)
//    link property will tell the hyperlink you want to add to that text

//ABOUT PAGE
// you can use backtick -> ` <- if you want to write multiple lines/paragraphs in about me, just as I have used
export const about_me = `Hello! My name is Gobind and I enjoy creating things that live on the internet; A developer & geek from India, who loves MCU and Anime. I'm currently an intern in Bajaj Finserv Health as a Web Developer. I have previously worked with a startup and a software development company.

Apart from nerdy stuff, I love having a different perspective for seeing things and capturing those with my camera. I try my best to pour life into ideas and bring them to the relm of reality. In the digital world, knowledge is infinite. I wish to keep on learning and practice everyday, but most importantly, I love working with diverse people.`;
// about me cannout be null
export const about_me_links = [
  { text: "Bajaj Finserv Health", link: "https://bajajfinservhealth.in" },
  { text: "startup", link: "https://takemycar.us" },
  { text: "software development company", link: "https://iraitech.com" }
]; //can be null
//format: an array of objects [{}, {},...], each object will have 2 properties text and link -> {text:"", link: ""}
//    text property will tell what text you want to be selected (every occurance will be selected)
//    link property will tell the hyperlink you want to add to that text
export const about_me_exp = ["JavaScript (ES6+)", "React", "TypeScript", "Next.js", "Node.js"];
// about_me_exp is an array of technologies you have worked with
// can only contain maximum of 10 elements
export const about_photo_name = "me.jpg";
// put your photo in "public" folder and store the photos name in about_photo_name

//EXPERIENCE
export const experience_heading = "Where I've Worked";
export const experiences = [
  {
    role: "React Developer - Intern",
    company: "Bajaj Finserv Health",
    duration: "January 2023 - June 2023",
    website: "https://www.bajajfinservhealth.in/", // can be null
    list: ["Maintain the existing codebase.", "Develop new features."]
  },
  {
    role: "Freelance Web Developer",
    company: "TakeMyCar",
    duration: "May 2022",
    website: "https://takemycar.us", // can be null
    list: ["Developed an introductory website for the company.", "Static website made with Next.js and Lottie Files."]
  },
  {
    role: "Front-End Developer - Intern",
    company: "Iraitech",
    duration: "April 2022 - July 2022",
    website: "https://iraitech.com", // can be null
    list: [
      "Write modern, performant, maintainable code for a diverse array of client and internal projects",
      "Worked closely with designers and management team to develop, document, and manage the projects."
    ]
  }
]; // cannot be null
//format: an array of objects [{}, {},...], each object will have 5 properties as follows:
//    role property - your job title/role
//    company - name of company you worked in
//    duration - the time period in which you worked in the company
//    website - the website of the company - it can be null also
//    list - points you wanna mention - its an array of strings - ["", "", ...] - cannot be null

//WORK PAGE
export const work_heading = "Some things I've built";
export const work_projects = [
  {
    title: "Vintageinkk",
    desc: "A blog type website for a small business Vintageinkk. It is a dynamic website made with Next.js and Contentful.",
    tech_stack: ["Next.JS", "React-Query", "GraphQL", "Contentful", "TypeScript"],
    picture: "vintageinkk.jpeg",
    links: {
      github: "https://github.com/theGobindSingh/vintageinkk",
      website: "https://vintageinkk.vercel.app/"
    }
  },
  {
    title: "Sketch Club's Website",
    desc: "A website for my college club. It is a dynamic website made with Next.js and Contentful.",
    tech_stack: ["Next.JS", "React-Query", "GraphQL", "Contentful", "TypeScript"],
    picture: "sketch.jpg",
    links: {
      github: "https://github.com/SketchClub/website",
      website: "https://sketchclub.dev"
    }
  },
  {
    title: "Portfolio Website",
    desc: "It is an static web page which allows you to peek into my unhappening life. The focus of this website is that it can turn into a portfolio generator, just a few changes in the information and you are good to go!",
    tech_stack: ["Next.JS", "Styled components", "SCSS", "Starter theme"],
    picture: "portfolio.png",
    links: {
      github: "https://github.com/theGobindSingh/theGobindSingh",
      website: "https://portfolio-gobindsingh.vercel.app/"
    }
  },
  {
    title: "Expense Tracker",
    desc: "This application allows you to track your day to day expenses and helps gain an insight into your daily income and expenditure.",
    tech_stack: ["React", "Local-Storage managemant"],
    picture: "expense_tracker.png",
    links: {
      github: "https://github.com/theGobindSingh/Expense-Tracker",
      website: "https://expense-tracker-eta-six.vercel.app/"
    }
  }
];

//EXTRA-CURRICULAR PAGE
export const extra_heading = "Photography";
//can be null
//if null, it wont be there on website
// I couldn't think of any way to make this customisable.. so im sorry :(
export const extra_link = "https://photos.app.goo.gl/U8yYDxEZQ5dEuqF19";

//CONTACT PAGE
export const cont_heading_one = "What's Next?"; // cannot be null
export const cont_heading_two = "Get In Touch."; // cannot be null
export const cont_desc = `Although I'm not currently looking for any new long term jobs, my inbox is always open. Please feel free to contact me if any freelance opportunity arrises. \nWhether you have a question or just want to say hi, I'll try my best to get back to you!`; // cannot be null
export const cont_email_btn = "Say Hello";
