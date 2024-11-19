import { Component } from '@angular/core';
import { Resume } from '../../models/resume.model';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ResumeService } from '../../services/resume.service';
import { Router } from '@angular/router';
import { Constants } from '../../../constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  resume!: Resume;
  resumeList!: Resume[];
  inGenerated: boolean = false;
  generatedResumeSaved: boolean = false;
  ResumeSaved: boolean = false;
  style: number = 1;
  searchFormGroup!: FormGroup;
  userId: string | null = null;
  userName: string | null = null;
  loadingUserResumes: boolean = false;
  LoadingGeneratingResume: boolean = false;

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserFromLocalStorage();

    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(null, Validators.required),
    });
    this.handleGetAllUserResumes();
  }
  getUserFromLocalStorage(): void {
    this.userName = localStorage.getItem(Constants.userName);
    this.userId = localStorage.getItem(Constants.userId);
  }
  handleEditResume() {
    this.router.navigateByUrl('/main/edit/' + this.resume.id);
  }
  public handleChangeResumeStyle(style: number) {
    this.style = style;
  }

  public handleGetAllUserResumes() {
    this.loadingUserResumes = true;
    return this.resumeService.getAllUserResumes(this.userId!).subscribe({
      next: (resp: Resume[]) => {
        console.log(resp);
        this.resumeList = resp;
        this.loadingUserResumes = false;
      },
      error: (error) => {
        this.loadingUserResumes = false;
      },
    });
  }
  public handleGenerateResume() {
    this.LoadingGeneratingResume = true;
    let jobDescription = this.searchFormGroup.value.keyword;
    return this.resumeService
      .generateResume(this.userId!, jobDescription)
      .subscribe({
        next: (resp: Resume) => {
          console.log(resp);
          this.resume = resp;
          this.inGenerated = true;
          this.ResumeSaved = false;
          this.generatedResumeSaved = false;
          this.LoadingGeneratingResume = false;

          console.log(resp);
        },
        error: (error) => {
          console.log(error.message);
          this.inGenerated = false;
          this.LoadingGeneratingResume = false;
        },
      });
  }
  public handleGetResumeById(id: string) {
    return this.resumeService.getResumeById(id).subscribe({
      next: (resp: Resume) => {
        console.log(resp);
        this.resume = resp;
        this.inGenerated = true;
        this.generatedResumeSaved = true;
        this.ResumeSaved = true;

        console.log(this.inGenerated);
      },
      error: (error) => {
        console.log(error.message);
        this.inGenerated = false;
      },
    });
  }
  public handleSaveResume() {
    this.resume.id = '';
    this.resume.userId = this.userId!;
    console.log(this.resume);
    return this.resumeService.createResume(this.resume).subscribe({
      next: (resp: Resume) => {
        this.resume = resp;
        this.handleGetAllUserResumes();
        this.generatedResumeSaved = true;
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }

  generatePDF() {
    const elementToPrint = document.getElementById('resumeId');
    if (elementToPrint) {
      html2canvas(elementToPrint, { scale: 2 }).then((canvas) => {
        var pdf = new jsPDF('p', 'pt', 'a5');
        pdf.addImage(
          canvas.toDataURL('image/png'),
          'PNG',
          0,
          0,
          pdf.internal.pageSize.getWidth(),
          pdf.internal.pageSize.getHeight()
        );
        pdf.save('myfile.pdf');
      });
    }
  }

}
