import { Component } from '@angular/core';
import { Resume, ResumeRequest } from '../../models/resume.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumeService } from '../../services/resume.service';
import Swal from 'sweetalert2';
import { Constants } from '../../../constants';

@Component({
  selector: 'app-create-resume',
  templateUrl: './create-resume.component.html',
  styleUrl: './create-resume.component.css',
})
export class CreateResumeComponent {
  userId!: string;
  resumeList!: Resume[];
  langsList: string[] = [];
  intersList: string[] = [];
  profileForm!: FormGroup;
  langsFormGroup!: FormGroup;
  intsFormGroup!: FormGroup;
  userName: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private resumeService: ResumeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      fname: [''], // Ensure initialization
      lname: [''],
      contact: this.formBuilder.group({
        email: [''],
        phone: [''],
        address: [''],
        linkedin: [''],
        github: [''],
      }),
      profile: this.formBuilder.group({
        title: [''],
        description: [''],
      }),
      experience: this.formBuilder.group({
        xtitle: [''],
        company: [''],
        location: [''],
        startDate: [''],
        endDate: [''],
        xdescription: [''],
        skills: [''],
      }),
      education: this.formBuilder.group({
        degree: [''],
        major: [''],
        university: [''],
        location: [''],
        startDate: [''],
        endDate: [''],
        relevantCourses: [
          'Object-Oriented Design',
          'Design Patterns',
          'Unit and Integration Testing',
          'Database Knowledge',
          'Cloud Architectures',
          'Troubleshooting',
        ], // For arrays, initialize as []
      }),
      projects: this.formBuilder.group({
        ptitle: [''],
        pdescription: [''],
        technologies: [[]],
      }),
    });

    this.langsFormGroup = this.formBuilder.group({
      keyword: [],
    });
    this.intsFormGroup = this.formBuilder.group({
      keyword: [],
    });
    this.userName = localStorage.getItem(Constants.userName);
  }

  // manage languages and intersests
  onAddLangToResume() {
    this.langsFormGroup.value.keyword !== null
      ? this.langsList.push(this.langsFormGroup.value.keyword)
      : null;
    this.langsFormGroup.reset();
  }
  onRemoveLangFromResume(key: string) {
    this.langsList = this.langsList.filter((item) => item !== key);
  }
  onAddIntersToResume() {
    this.intsFormGroup.value.keyword !== null
      ? this.intersList.push(this.intsFormGroup.value.keyword)
      : null;
    this.intsFormGroup.reset();
  }
  onRemoveIntersFromResume(key: string) {
    this.intersList = this.intersList.filter((item) => item !== key);
  }
  // manage languages and intersests
  handlEditResume() {
    let resumRequest: ResumeRequest = {
      userId: this.userId,
      fname: this.profileForm.value.fname,
      lname: this.profileForm.value.lname,
      contact: {
        email: this.profileForm.value.contact.email,
        phone: this.profileForm.value.contact.phone,
        location: this.profileForm.value.contact.address,
        linkedin: this.profileForm.value.contact.linkedin,
        github: this.profileForm.value.contact.github,
      },
      profile: this.profileForm.value.profile,
      education: [this.profileForm.value.education],
      experience: [
        {
          title: this.profileForm.value.experience.xtitle,
          company: this.profileForm.value.experience.company,
          location: this.profileForm.value.experience.location,
          startDate: this.profileForm.value.experience.startDate,
          endDate: this.profileForm.value.experience.endDate,
          description: this.profileForm.value.experience.xdescription,
          skills: [
            'Java 8+',
            'JEE 7+',
            'Spring Framework',
            'Microservices Architecture',
            'CI/CD Environment',
            'Apache Kafka',
          ],
        },
      ],
      projects: [
        {
          title: this.profileForm.value.projects.ptitle,
          description: this.profileForm.value.projects.pdescription,
          technologies: [
            'Java 8+',
            'JEE 7+',
            'Spring Framework',
            'Microservices Architecture',
            'CI/CD Environment',
            'Apache Kafka',
          ],
        },
      ],
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
      languages: this.langsList,
      interests: this.intersList,
      request: '',
      portfolio: true,
    };

    return this.resumeService.createUserPortfolio(resumRequest).subscribe({
      next: (resp: Resume) => {
        console.log(resp);
        Swal.fire({
          title: 'Success',
          text: 'Portifolio has been updated',
          icon: 'success',
        });
        this.router.navigateByUrl('/main/home');
      },
      error: (error) => {
        console.log(error.message);
        Swal.fire({
          title: 'Oops...',
          text: error.message,
          icon: 'error',
        });
      },
    });
  }
}
