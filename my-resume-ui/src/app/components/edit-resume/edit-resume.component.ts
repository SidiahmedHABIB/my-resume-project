import { Component } from '@angular/core';
import { Resume } from '../../models/resume.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import { ResumeService } from '../../services/resume.service';
import { ActivatedRoute } from '@angular/router';
import { start } from 'node:repl';

@Component({
  selector: 'app-edit-resume',
  templateUrl: './edit-resume.component.html',
  styleUrls: ['./edit-resume.component.css'],
})
export class EditResumeComponent {
  userId!: string;
  resume: Resume = {} as Resume; // Initialize resume to avoid undefined errors
  profileForm!: FormGroup;
  langsFormGroup!: FormGroup;
  intsFormGroup!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private resumeService: ResumeService,
    private route: ActivatedRoute
  ) {
    this.userId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.handleGetResume(this.userId);

    this.langsFormGroup = this.formBuilder.group({
      keyword: this.formBuilder.control(null),
    });
    this.intsFormGroup = this.formBuilder.group({
      keyword: this.formBuilder.control(null),
    });
  }

  updateResume(changes: any): void {
    // Use Object.assign to avoid direct mutation
    this.resume = { ...this.resume, ...changes };
  }

  handleEditResume() {
    // console.log(this.resume.education?.endDate);  // Safely access properties with optional chaining
    this.resumeService.updateResume(this.userId, this.resume).subscribe({
      next: (resp: Resume) => {
        console.log(resp);
        // this.resume = resp;  // Optional: Use if you want to update the resume object with the response
        Swal.fire({
          title: 'Success',
          text: 'Resume has been updated',
          icon: 'success',
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Oops...',
          text: error.message,
          icon: 'error',
        });
      },
    });
  }

  // Manage languages and interests
  onAddLangToResume() {
    if (this.langsFormGroup.value.keyword) {
      this.resume.languages.push(this.langsFormGroup.value.keyword);
    }
    this.langsFormGroup.reset();
  }

  onRemoveLangFromResume(key: string) {
    this.resume.languages = this.resume.languages.filter(
      (item) => item !== key
    );
  }

  onAddIntersToResume() {
    if (this.intsFormGroup.value.keyword) {
      this.resume.interests.push(this.intsFormGroup.value.keyword);
    }
    this.intsFormGroup.reset();
  }

  onRemoveIntersFromResume(key: string) {
    this.resume.interests = this.resume.interests.filter(
      (item) => item !== key
    );
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
    } else {
      console.error('Resume element not found');
    }
  }

  handleGetResume(id: string) {
    this.isLoading = true;
    return this.resumeService.getResumeById(id).subscribe({
      next: (resp: Resume) => {
        console.log(resp);
        this.resume = resp;
        this.isLoading = false;
        this.profileForm = this.formBuilder.group({
          id: [this.resume.id],
          fname: [this.resume.fname],
          lname: [this.resume.lname],
          contact: this.formBuilder.group({
            email: [this.resume.contact?.email], // Use optional chaining
            phone: [this.resume.contact?.phone],
            address: [this.resume.contact?.location],
          }),
          profile: this.formBuilder.group({
            title: [this.resume.profile?.title],
            description: [this.resume.profile?.description],
          }),
          experience: this.formBuilder.group({
            title: [this.resume.experience?.[0]?.title], // Accessing the first experience's title
            company: [this.resume.experience?.[0]?.company],
            location: [this.resume.experience?.[0]?.location],
            startDate: [this.resume.experience?.[0]?.startDate],
            endDate: [this.resume.experience?.[0]?.endDate],
            description: [this.resume.experience?.[0]?.description],
            skills: [this.resume.experience?.[0]?.skills],
          }),
          education: this.formBuilder.group({
            degree: [this.resume.education[0]?.degree],
            major: [this.resume.education[0]?.major],
            university: [this.resume.education[0]?.university],
            location: [this.resume.education[0]?.location],
            startDate: [this.resume.education[0]?.startDate],
            endDate: [this.resume.education[0]?.endDate],
            relevantCourses: [this.resume.education[0]?.relevantCourses],
          }),

          projects: this.formBuilder.group({
            title: [this.resume.projects[0]?.title],
            description: [this.resume.projects[0]?.description],
            technologies: [this.resume.projects[0]?.technologies],
          }),
        });

        this.profileForm.valueChanges.subscribe((changes) => {
          this.updateResume(changes);
        });
      },
      error: (error) => {
        console.log(error.message);
        this.isLoading = false;
      },
    });
  }
}
