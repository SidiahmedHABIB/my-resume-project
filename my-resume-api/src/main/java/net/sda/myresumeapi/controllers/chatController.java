package net.sda.myresumeapi.controllers;

import net.sda.myresumeapi.entities.Resume;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class chatController {

    private ChatClient chatClient;

    public chatController(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }
    @GetMapping(value = "chat")
    public  Resume chat(String question){
        return chatClient.prompt()
                .system("""
                i want you generate resume for this job description taken the resume data of user 
                and return result following this json format:
                        {
                            "userId": "672bf5b9fd2e1512bb0b2bdc",
                              fname: Sidi Ahmed,
                              lname: Habib,
                              contact: {
                                email: sidiahmedhabib@gmail.com,
                                phone: 34136507,
                                address: sousse, tunis,
                              },
                              profile: {
                                title: 'Software Engineer',
                                description:
                                  'Designing and developing high-volume, low-latency applications for mission-critical systems. Contributing in all phases of the development lifecycle.',
                              },
                              education: [{
                                degree: 'Bachelor of Science',
                                major: 'Computer Science',
                                university: 'Your University',
                                location: 'Your City, Your Country',
                                relevantCourses: [
                                  'Java 8+',
                                  'JEE 7+',
                                  'Spring Framework',
                                  'Microservices Architecture',
                                  'CI/CD Environment',
                                  'Apache Kafka',
                                ],
                                completionYear: 2024,
                              }],
                              experience: [{
                                title: 'Software Engineer',
                                company: 'ABC Solutions',
                                location: 'Your City, Your Country',
                                start_date: '2024-05-22',
                                end_date: 'Present',
                                description:
                                  'Designing and developing high-volume, low-latency applications for mission-critical systems. Contributing in all phases of the development lifecycle.',
                                skills: [
                                  'Java 8+',
                                  'JEE 7+',
                                  'Spring Framework',
                                  'Microservices Architecture',
                                  'CI/CD Environment',
                                  'Apache Kafka',
                                ],
                              }],
                              projects: [{
                                title: 'Software Engineer',
                                description:
                                  'Designing and developing high-volume, low-latency applications for mission-critical systems. Contributing in all phases of the development lifecycle.',
                                technologies: [
                                  'Java 8+',
                                  'JEE 7+',
                                  'Spring Framework',
                                  'Microservices Architecture',
                                  'CI/CD Environment',
                                  'Apache Kafka',
                                ],
                              }],
                              skills: {
                                technical: [
                                  'Java 8+',
                                  'JEE 7+',
                                  'Spring Framework',
                                  'Microservices Architecture',
                                  'CI/CD Environment',
                                  'Apache Kafka',
                                ],
                                tools: ['Docker', 'Kubernetes'],
                                others: [
                                  'Object-Oriented Design',
                                  'Design Patterns',
                                  'Unit and Integration Testing',
                                  'Database Knowledge',
                                  'Cloud Architectures',
                                  'Troubleshooting',
                                ],
                              },
                              languages: ['Arabic','French'],
                              interests: ["Gaming", "Technology", "Machine Learning"],
                            }
                """)
                .user(question)
                .call()
                .entity(Resume.class);
    }

}
