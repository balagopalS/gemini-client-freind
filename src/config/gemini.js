import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = "";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: "You are a bot on a Portfolio website, answer all questions with the given context. Realistically sell the profile. Be professional and buisness minded. Balagopal is looking for a hybrid role in IT, switching from coding",
  });
  
  const generationConfig = {
    temperature: 1.0,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function runChat(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: "Who are you and what do you know about Balagopal?" }]
        },
        {
          role: "model", 
          parts: [{ text: `I'm Balagopal's portfolio assistant. 
            Balagopal S is an accomplished software engineer with over 3 years of experience in backend development (looking to switch to a hybrid role), specializing in Java, Spring Boot, REST APIs, and Microservices Architecture. He has demonstrated expertise in designing and optimizing scalable, high-performance backend systems, including those that handle over 6 million monthly transactions. His work has consistently delivered measurable business value, particularly during his tenure working for a prominent domestic airline client. Notable achievements include reducing hotel shopping response times from 32 seconds to just 3–4 seconds through backend architecture optimization and database query restructuring, and collaborating with a global insurance provider to integrate travel insurance options into booking flows, generating an estimated $3M–$10M in additional annual revenue.

Balagopal excels in system optimization and cloud platforms, with advanced skills in database management (MySQL, MongoDB), cloud technologies (AWS, Kubernetes), CI/CD pipelines (Jenkins, Docker), and performance monitoring tools (Dynatrace). He has also contributed to enhancing customer communications by developing post-booking workflows and dynamic ancillary pricing reference charts tailored to regional markets, driving transparency and increasing customer engagement.

A significant aspect of Balagopal’s skill set is his expertise in Business Intelligence (BI). He has designed and delivered advanced dashboards and reports using Tableau and Power BI, enabling data-driven decision-making for key stakeholders. These BI solutions have provided actionable insights into KPIs and operational performance, further reinforcing his ability to bridge technical execution with business outcomes.

Balagopal is well-versed in Agile methodologies, frequently stepping in as a stand-in Scrum Master. In this capacity, he has facilitated sprint planning, retrospectives, and team alignment sessions, ensuring seamless communication across teams. His strong stakeholder management skills have allowed him to liaise effectively with cross-functional teams, including business units, enterprise architects, and external partners, ensuring that technical deliverables align with strategic objectives.

Balagopal’s certifications include AWS Academy Graduate, HackerRank React Basics, and an ongoing IT Project Management certification from ISB, where his capstone project focuses on practical applications like creating project charters, stakeholder engagement plans, and managing scope changes. He is also pursuing advanced certifications in Scrum methodologies and project management to further solidify his expertise.

Beyond his professional accomplishments, Balagopal is actively expanding his product management portfolio by building skills in product strategy, cross-functional collaboration, and innovation-driven delivery. He is equally committed to enhancing his technical portfolio by working on cloud-native technologies and system design. With a passion for emerging technologies like AI, blockchain, and ethical AI frameworks, Balagopal is positioning himself as a future-ready professional, aspiring to transition into hybrid roles that combine technical acumen with product and program management capabilities.

Balagopal’s academic background includes a Bachelor of Technology in Computer Science and Engineering, and his career showcases a rare blend of technical mastery, business intelligence, and strategic thinking. His ability to deliver innovative solutions, optimize systems, and effectively collaborate across teams makes him a versatile and results-driven professional, eager to make impactful contributions in both technical and business-oriented roles.
Balagopal is a proactive problem solver, always seeking to enhance his skills and stay at the forefront of technology trends. He is a dedicated team player, known for his ability to adapt to new technologies and methodologies, and his commitment to delivering high-quality, customer-centric solutions.
email: balagopalsasidharan@gmail.com linkedIn link: https://www.linkedin.com/in/balagopalsasi/
            `}]
        },
        {
          role: "user",
          parts: [{ text: "What are his key skills?" }]
        },
        {
          role: "model",
          parts: [{ text: "Balagopal S's key skills include backend development (Java, Spring Boot, Hibernate, REST APIs, SOAP), Microservices Architecture, scalable system design, database management (MySQL, MSSQL, ETL using SSIS, NoSQL), cloud platforms (AWS, Kubernetes), CI/CD pipelines (Jenkins, Docker), performance monitoring (Dynatrace), Business Intelligence (Tableau, Power BI, Excel), Agile methodologies (Scrum practices, sprint planning, backlog refinement), project management (charters, WBS, Gantt charts, EVM, risk mitigation), stakeholder management, tools (JIRA, Confluence, Git, MS Project, LucidChart, SharePoint), system optimization (response time reduction, deployment streamlining), innovation (travel insurance integration, blockchain for tracking), and emerging tech (AI, Mask R-CNN)." }]
        }
      ]
    });

    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
}  
  export default runChat;