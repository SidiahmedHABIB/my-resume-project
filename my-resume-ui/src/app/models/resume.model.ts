export interface Contact {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface Profile {
  title: string;
  description: string;
}

export interface Education {
  degree: string;
  major: string;
  university: string;
  location: string;
  startDate: Date;
  endDate: Date;
  relevantCourses: string[];
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date;
  description: string;
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
}

export interface Skills {
  technical: string[];
  tools: string[];
  others: string[];
}

export interface Resume {
  id: string;
  userId:string;
  fname: string;
  lname: string;
  request: string;
  portfolio: boolean;
  contact: Contact;
  profile: Profile;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skills;
  languages: string[];
  interests: string[];
}
export interface ResumeRequest {
  userId:String;
  fname: string;
  lname: string;
  request: string;
  portfolio: boolean;
  contact: Contact;
  profile: Profile;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skills;
  languages: string[];
  interests: string[];
}
