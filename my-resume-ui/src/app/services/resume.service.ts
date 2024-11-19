import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resume, ResumeRequest } from '../models/resume.model';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  private apiUrl = 'http://localhost:8088/api/v1/resumes'; // Change this to your backend API URL

  constructor(private http: HttpClient) {}

  getResumeById(resumeId: string): Observable<Resume> {
    const url = `${this.apiUrl}/${resumeId}`;
    return this.http.get<Resume>(url);
  }

  getAllUserResumes(userId: string): Observable<Resume[]> {
    const url = `${this.apiUrl}/get-all-user-resumes/${userId}`;
    return this.http.get<Resume[]>(url);
  }

  generateResume(userId: string, jobDescription: string): Observable<Resume> {
    const url = `${this.apiUrl}/generate`;
    const body = { userId, jobDescription };

    return this.http.post<Resume>(url, body);
  }
  // Method to create a new resume
  createResume(resumeData: Resume): Observable<Resume> {
    const url = `${this.apiUrl}`;
    return this.http.post<Resume>(url, resumeData);
  }
  createUserPortfolio(resumeData: ResumeRequest): Observable<any> {
    console.log(resumeData);
    const url = `${this.apiUrl}/create-user-portfolio`;
    return this.http.post<any>(url, resumeData);
  }
  // Method to update an existing resume
  updateResume(resumeId: string, resumeData: any): Observable<any> {
    const url = `${this.apiUrl}/${resumeId}`;
    return this.http.put<any>(url, resumeData);
  }

  // Method to delete a resume
  deleteResume(resumeId: string): Observable<any> {
    const url = `${this.apiUrl}/${resumeId}`;
    return this.http.delete<any>(url);
  }
}
