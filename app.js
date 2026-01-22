import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3030;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const blogPosts = [
  {
    id: 1,
    title: "Breaking the Code: My Journey into Web Development",
    excerpt:
      "Transitioning into tech isn't just about learning syntax; it's about learning a new way to solve problems.",
    content:
      "When I started my first Node.js project, I felt overwhelmed. The idea of a server 'listening' for requests felt like magic. But as I built my first Express app, I realized that programming is just like building with LEGO bricks. You start with a small foundation—like an app.get route—and gradually add layers like EJS templates and CSS Grid. Today, I'm proud of how far I've come in understanding the full-stack flow.",
  },
  {
    id: 2,
    title: "Why Every Developer Should Embrace the Terminal",
    excerpt:
      "BASH might look intimidating at first, but it is the secret weapon of every efficient software engineer.",
    content:
      "Learning BASH (Bourne Again SHell) changed the way I interact with my computer. Instead of clicking through dozens of folders, I can now create projects, move files, and manage servers with simple text commands. It's not just about looking like a 'hacker'; it's about automation and speed. Once you master 'cd', 'mkdir', and 'npm install', there is no going back to a purely mouse-driven workflow.",
  },
  {
    id: 3,
    title: "Finding Balance: Why I Head to the Mountains to Ski",
    excerpt:
      "Coding requires intense mental focus. Sometimes, the best way to solve a difficult bug is to step away and go skiing.",
    content:
      "There is a deep connection between physical activity and mental clarity. When I am skiing, I am completely in the moment. The crisp air and the rhythm of the slopes help clear the 'cache' in my brain. Often, the solution to a coding problem I've been struggling with for hours suddenly appears while I'm on a chairlift. Remember: 'Ski' is the action, but 'Skiing' is the passion that keeps me energized for my desk job.",
  },
  {
    id: 4,
    title: "The Underrated Skill: Communication in Engineering",
    excerpt:
      "Being a great engineer is 50% about the code you write and 50% about how you explain that code to your team.",
    content:
      "In the tech world, we often focus solely on our technical skills. However, I've learned that 'intelligibility'—the ability to be clearly understood—is just as important. Whether it's during a morning stand-up or writing documentation, clear communication reduces social friction and ensures that projects move forward smoothly. My goal is to develop a global tech accent: clear, professional, and confident.",
  },
  {
    id: 5,
    title: "The Capstone Project: Bringing It All Together",
    excerpt:
      "This blog is more than just a school assignment; it's a reflection of everything I've learned this semester.",
    content:
      "Building this Capstone project required me to combine Node.js logic, Express routing, and EJS templating. I had to learn how to handle errors (like the famous MODULE_NOT_FOUND!), how to structure my folders, and how to create a responsive CSS Grid that looks good on any device. This project marks the beginning of my professional portfolio, and I can't wait to see where these skills take me next.",
  },
  {
    id: 6,
    title: "The Power of Lifelong Learning",
    excerpt:
      "In the rapidly evolving world of technology, your most valuable asset isn't what you know today, but how fast you can learn tomorrow.",
    content:
      "Technology moves at a lightning pace. Frameworks that were popular three years ago are being replaced by newer, more efficient tools today. I've realized that being a developer isn't about reaching a destination where you 'know everything.' Instead, it's about staying curious and embracing the unknown. Whether it's picking up a new language or deep-diving into cloud architecture, the ability to learn effectively is what defines a successful career in tech.",
  },
];

app.get("/", (req, res) => {
  res.render("index.ejs", {
    title: "My Express App",
    message: "Welcome to My Blog!",
    posts: blogPosts,
  });
});

// dynamic route: handles clicks for specific posts
app.get("/post/:id", (req, res) => {
  const requestedId = parseInt(req.params.id);
  const foundPost = blogPosts.find((post) => post.id === requestedId);

  if (foundPost) {
    res.render("post", { post: foundPost });
  } else {
    res.status(404).render("error/404", {
      title: "Post Not Found",
      message: "This article doesn't exist",
    });
  }
});

app.use((req, res) => {
  res.status(404).render("error/404", {
    title: "404 - Not Found",
    message: "Page Missing",
  });
});

app.listen(PORT, () => {
  console.log(`✅ Success! My blog is live at http://localhost:${PORT}`);
});
